from flask import Blueprint, request, jsonify, current_app
from google.oauth2.credentials import Credentials
from google.oauth2 import id_token
from google.auth.transport import requests
from googleapiclient.discovery import build
from datetime import datetime, timedelta
from src.models.user import User
from functools import wraps
import json

calendar_bp = Blueprint('calendar', __name__)

def get_calendar_service(credentials_dict):
    """Create and return a Google Calendar service object"""
    credentials = Credentials(
        token=credentials_dict.get('token'),
        refresh_token=credentials_dict.get('refresh_token'),
        token_uri="https://oauth2.googleapis.com/token",
        client_id=current_app.config['GOOGLE_CLIENT_ID'],
        client_secret=current_app.config['GOOGLE_CLIENT_SECRET']
    )
    return build('calendar', 'v3', credentials=credentials)

@calendar_bp.route('/availability', methods=['GET'])
def get_availability():
    """Get available time slots for booking"""
    try:
        # Get the next 7 days
        start_date = datetime.utcnow().date()
        end_date = start_date + timedelta(days=7)
        
        # Convert to RFC3339 timestamp
        start_timestamp = datetime.combine(start_date, datetime.min.time()).isoformat() + 'Z'
        end_timestamp = datetime.combine(end_date, datetime.max.time()).isoformat() + 'Z'
        
        # Use service account for checking calendar
        service = get_calendar_service(current_app.config['CALENDAR_CREDENTIALS'])
        
        # Get busy periods
        body = {
            "timeMin": start_timestamp,
            "timeMax": end_timestamp,
            "items": [{"id": current_app.config['CALENDAR_ID']}]
        }
        
        events_result = service.freebusy().query(body=body).execute()
        busy_periods = events_result['calendars'][current_app.config['CALENDAR_ID']]['busy']
        
        # Generate available slots (9 AM to 5 PM, 1-hour slots)
        available_slots = []
        current_date = start_date
        
        while current_date <= end_date:
            for hour in range(9, 17):  # 9 AM to 5 PM
                slot_start = datetime.combine(current_date, datetime.min.time().replace(hour=hour))
                slot_end = slot_start + timedelta(hours=1)
                
                # Check if slot overlaps with any busy period
                is_available = True
                for busy in busy_periods:
                    busy_start = datetime.fromisoformat(busy['start'].replace('Z', '+00:00'))
                    busy_end = datetime.fromisoformat(busy['end'].replace('Z', '+00:00'))
                    
                    if (slot_start < busy_end and slot_end > busy_start):
                        is_available = False
                        break
                
                if is_available:
                    available_slots.append({
                        'start': slot_start.isoformat(),
                        'end': slot_end.isoformat()
                    })
            
            current_date += timedelta(days=1)
        
        return jsonify({'available_slots': available_slots})
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@calendar_bp.route('/book', methods=['POST'])
def book_meeting():
    """Book a meeting slot"""
    try:
        data = request.json
        start_time = data.get('start_time')
        end_time = data.get('end_time')
        email = data.get('email')
        description = data.get('description', '')
        
        if not all([start_time, end_time, email]):
            return jsonify({'error': 'Missing required fields'}), 400
        
        # Verify user has active subscription
        user = User.find_by_email(email)
        if not user or not user.subscription_status:
            return jsonify({'error': 'Active subscription required'}), 403
        
        service = get_calendar_service(current_app.config['CALENDAR_CREDENTIALS'])
        
        event = {
            'summary': f'LookerHelp Consultation - {email}',
            'description': description,
            'start': {
                'dateTime': start_time,
                'timeZone': 'UTC',
            },
            'end': {
                'dateTime': end_time,
                'timeZone': 'UTC',
            },
            'attendees': [
                {'email': email},
            ],
            'conferenceData': {
                'createRequest': {
                    'requestId': f"lookerhelp-{datetime.now().strftime('%Y%m%d%H%M%S')}",
                    'conferenceSolutionKey': {'type': 'hangoutsMeet'}
                }
            }
        }
        
        event = service.events().insert(
            calendarId=current_app.config['CALENDAR_ID'],
            body=event,
            conferenceDataVersion=1
        ).execute()
        
        return jsonify({
            'meeting_id': event['id'],
            'meet_link': event.get('hangoutLink', ''),
            'start_time': event['start']['dateTime'],
            'end_time': event['end']['dateTime']
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@calendar_bp.route('/cancel', methods=['POST'])
def cancel_meeting():
    """Cancel a booked meeting"""
    try:
        data = request.json
        meeting_id = data.get('meeting_id')
        email = data.get('email')
        
        if not all([meeting_id, email]):
            return jsonify({'error': 'Missing required fields'}), 400
        
        # Verify user has permission to cancel
        user = User.find_by_email(email)
        if not user:
            return jsonify({'error': 'User not found'}), 404
        
        service = get_calendar_service(current_app.config['CALENDAR_CREDENTIALS'])
        
        # Get event to verify ownership
        event = service.events().get(
            calendarId=current_app.config['CALENDAR_ID'],
            eventId=meeting_id
        ).execute()
        
        # Check if user is an attendee
        attendees = event.get('attendees', [])
        if not any(attendee['email'] == email for attendee in attendees):
            return jsonify({'error': 'Not authorized to cancel this meeting'}), 403
        
        # Delete the event
        service.events().delete(
            calendarId=current_app.config['CALENDAR_ID'],
            eventId=meeting_id
        ).execute()
        
        return jsonify({'message': 'Meeting cancelled successfully'})
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500
