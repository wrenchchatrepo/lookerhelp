import os
import sys
import json
from datetime import datetime, timedelta
from collections import defaultdict

# Force immediate output flushing
sys.stdout = os.fdopen(sys.stdout.fileno(), 'w', 1)
sys.stderr = os.fdopen(sys.stderr.fileno(), 'w', 1)

print("Script starting...", flush=True)

try:
    print("Current working directory:", os.getcwd(), flush=True)
    print("Python executable:", sys.executable, flush=True)
    print("Python version:", sys.version, flush=True)
    
    print("\nChecking looker.ini exists...", flush=True)
    if not os.path.exists('looker.ini'):
        raise FileNotFoundError("looker.ini not found in current directory")
    print("looker.ini found", flush=True)
    
    print("\nImporting looker_sdk...", flush=True)
    try:
        import looker_sdk
    except ImportError as e:
        print("Failed to import looker_sdk. Is it installed?", flush=True)
        print("Try running: pip install looker-sdk", flush=True)
        raise

    print("Looker SDK imported successfully", flush=True)

    # Initialize the SDK (it will automatically read from looker.ini)
    print("\nInitializing Looker SDK...", flush=True)
    try:
        sdk = looker_sdk.init40()
    except Exception as e:
        print("Failed to initialize Looker SDK", flush=True)
        print("Error:", str(e), flush=True)
        raise

    print("SDK initialized successfully", flush=True)

    # Set the time range for the query (last 30 days)
    current_date = datetime(2024, 12, 4)  # Using the current date
    start_date = current_date - timedelta(days=30)
    
    # Format dates for the query
    end_date_str = current_date.strftime('%Y-%m-%d')
    start_date_str = start_date.strftime('%Y-%m-%d')

    # Create timestamp for filename
    timestamp = current_date.strftime('%Y%m%d_%H%M%S')
    output_file = f'downloads_{timestamp}.txt'

    print(f"\nQuerying data from {start_date_str} to {end_date_str}...", flush=True)
    
    # Run the query with updated fields and result_format filter
    query_body = {
        "model": "system__activity",
        "view": "history",
        "fields": [
            "history.created_time",
            "user.id",
            "history.status",
            "history.result_format",
            "history.source"
        ],
        "filters": {
            "history.created_date": f"{start_date_str} to {end_date_str}",
            "history.status": "complete"
        },
        "limit": "5000"
    }
    print("Query body:", json.dumps(query_body, indent=2), flush=True)
    
    try:
        result = sdk.run_inline_query(
            result_format="json",
            body=query_body
        )
        # Parse the JSON string if needed
        if isinstance(result, str):
            result = json.loads(result)
    except Exception as e:
        print("Failed to run query", flush=True)
        print("Error:", str(e), flush=True)
        raise

    print(f"\nQuery returned {len(result)} results", flush=True)

    print("Processing results...", flush=True)
    
    # Process the results
    downloads = defaultdict(lambda: defaultdict(list))  # Changed to store lists of timestamps
    all_timestamps = []  # Track all download timestamps for date range analysis

    for item in result:
        result_format = str(item.get('history.result_format', '')).lower()
        # Skip frontend-related formats
        if result_format in ['json_fe', 'json_detail']:
            continue
            
        if result_format in ['csv', 'txt', 'json', 'xlsx', 'png']:
            user_id = item.get('user.id', 'unknown')
            created_time = item.get('history.created_time', '')
            
            # Map the result format to our file type categories
            file_type = result_format.upper()
            if result_format == 'xlsx':
                file_type = 'Excel'
            
            # Store timestamp with the download
            downloads[user_id][file_type].append(created_time)
            all_timestamps.append(created_time)

    # Function to write and print output
    def output(text, file):
        print(text, flush=True)
        file.write(text + '\n')
        file.flush()

    print(f"\nWriting results to {output_file}...", flush=True)
    
    # Open file and write results
    with open(output_file, 'w') as f:
        output(f"Download Activity Report", f)
        output(f"Generated on: {current_date.strftime('%Y-%m-%d %H:%M:%S')}", f)
        output(f"Query Period: {start_date_str} to {end_date_str} (30 days)", f)
        output("=" * 50, f)
        
        # Calculate actual date range of downloads
        if all_timestamps:
            first_download = min(all_timestamps)
            last_download = max(all_timestamps)
            first_date = datetime.strptime(first_download, '%Y-%m-%d %H:%M:%S')
            last_date = datetime.strptime(last_download, '%Y-%m-%d %H:%M:%S')
            date_range = (last_date - first_date).days + 1
            total_downloads = sum(len(timestamps) for user_downloads in downloads.values() 
                                for timestamps in user_downloads.values())
            avg_downloads = total_downloads / date_range if date_range > 0 else 0
            
            output(f"\nActual Download Date Range:", f)
            output(f"First Download: {first_download}", f)
            output(f"Last Download:  {last_download}", f)
            output(f"Date Range: {date_range} days", f)
            output(f"Average Downloads per Day: {avg_downloads:.1f}", f)
        
        output("\nDownload Details by User:", f)
        output("=" * 50, f)
        
        # Sort users by ID
        for user_id in sorted(downloads.keys(), key=lambda x: int(x) if str(x).isdigit() else float('inf')):
            output(f"\nUser ID: {user_id}", f)
            # Sort file types alphabetically
            for file_type in sorted(downloads[user_id].keys()):
                timestamps = downloads[user_id][file_type]
                output(f"  {file_type}: {len(timestamps)} downloads", f)
                # Show the first and last download times if there are any
                if timestamps:
                    first_download = min(timestamps)
                    last_download = max(timestamps)
                    output(f"    First: {first_download}", f)
                    output(f"    Last:  {last_download}", f)

        output("\nSummary", f)
        output("=" * 50, f)
        
        # Calculate and print totals
        output(f"Total Downloads: {total_downloads}", f)

        file_type_totals = defaultdict(int)
        for user_downloads in downloads.values():
            for file_type, timestamps in user_downloads.items():
                file_type_totals[file_type] += len(timestamps)

        output("\nDownloads by File Type:", f)
        # Sort file types alphabetically in the totals
        for file_type in sorted(file_type_totals.keys()):
            count = file_type_totals[file_type]
            percentage = (count / total_downloads * 100) if total_downloads > 0 else 0
            output(f"  {file_type}: {count} ({percentage:.1f}%)", f)

    print("\nScript completed successfully!", flush=True)

except FileNotFoundError as e:
    print(f"File error: {str(e)}", file=sys.stderr, flush=True)
    sys.exit(1)
except ImportError as e:
    print(f"Import error: {str(e)}", file=sys.stderr, flush=True)
    sys.exit(1)
except looker_sdk.error.SDKError as e:
    print(f"Looker SDK error: {str(e)}", file=sys.stderr, flush=True)
    print("Please check your looker.ini configuration", file=sys.stderr, flush=True)
    sys.exit(1)
except Exception as e:
    print(f"Unexpected error: {str(e)}", file=sys.stderr, flush=True)
    print("Error type:", type(e).__name__, file=sys.stderr, flush=True)
    import traceback
    traceback.print_exc(file=sys.stderr)
    sys.exit(1)
