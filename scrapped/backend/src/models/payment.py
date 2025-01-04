from google.cloud import bigquery
from datetime import datetime
import os

client = bigquery.Client()
dataset_id = os.getenv('GCP_BIGQUERY_DS', 'miguelai.lookerhelp')

class PaymentHistory:
    def __init__(self, user_email, stripe_event_id, event_type, amount=None, currency=None):
        self.user_email = user_email
        self.stripe_event_id = stripe_event_id
        self.event_type = event_type
        self.amount = amount
        self.currency = currency
        self.created_at = datetime.utcnow()
        self.status = 'pending'

    @staticmethod
    def create_table_if_not_exists():
        schema = [
            bigquery.SchemaField("user_email", "STRING", mode="REQUIRED"),
            bigquery.SchemaField("stripe_event_id", "STRING", mode="REQUIRED"),
            bigquery.SchemaField("event_type", "STRING", mode="REQUIRED"),
            bigquery.SchemaField("amount", "FLOAT64"),
            bigquery.SchemaField("currency", "STRING"),
            bigquery.SchemaField("created_at", "TIMESTAMP", mode="REQUIRED"),
            bigquery.SchemaField("status", "STRING", mode="REQUIRED"),
        ]

        table_id = f"{dataset_id}.payment_history"
        table = bigquery.Table(table_id, schema=schema)
        try:
            client.get_table(table)
        except Exception:
            table = client.create_table(table)

    def save(self):
        table_id = f"{dataset_id}.payment_history"
        rows_to_insert = [{
            'user_email': self.user_email,
            'stripe_event_id': self.stripe_event_id,
            'event_type': self.event_type,
            'amount': self.amount,
            'currency': self.currency,
            'created_at': self.created_at,
            'status': self.status
        }]
        
        errors = client.insert_rows_json(table_id, rows_to_insert)
        if errors:
            raise Exception(f"Error inserting payment history: {errors}")

    @staticmethod
    def get_user_payments(user_email, limit=10):
        query = f"""
        SELECT *
        FROM `{dataset_id}.payment_history`
        WHERE user_email = @email
        ORDER BY created_at DESC
        LIMIT @limit
        """
        
        job_config = bigquery.QueryJobConfig(
            query_parameters=[
                bigquery.ScalarQueryParameter("email", "STRING", user_email),
                bigquery.ScalarQueryParameter("limit", "INT64", limit)
            ]
        )
        
        query_job = client.query(query, job_config=job_config)
        return list(query_job.result())

    @staticmethod
    def update_status(stripe_event_id, status):
        query = f"""
        UPDATE `{dataset_id}.payment_history`
        SET status = @status
        WHERE stripe_event_id = @event_id
        """
        
        job_config = bigquery.QueryJobConfig(
            query_parameters=[
                bigquery.ScalarQueryParameter("status", "STRING", status),
                bigquery.ScalarQueryParameter("event_id", "STRING", stripe_event_id)
            ]
        )
        
        query_job = client.query(query, job_config=job_config)
        query_job.result()  # Wait for the query to complete
