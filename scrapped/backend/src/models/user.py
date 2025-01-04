from google.cloud import bigquery
from datetime import datetime
import os

client = bigquery.Client()
dataset_id = os.getenv('GCP_BIGQUERY_DS', 'miguelai.lookerhelp')

class User:
    def __init__(self, email, name=None, picture=None, refresh_token=None, token_expiry=None):
        self.email = email
        self.name = name
        self.picture = picture
        self.created_at = datetime.utcnow()
        self.subscription_status = None
        self.subscription_end_date = None
        self.subscription_plan = None
        self.stripe_customer_id = None
        self.last_payment_status = None
        self.last_payment_date = None
        self.refresh_token = refresh_token
        self.token_expiry = token_expiry

    @staticmethod
    def create_table_if_not_exists():
        schema = [
            bigquery.SchemaField("email", "STRING", mode="REQUIRED"),
            bigquery.SchemaField("name", "STRING"),
            bigquery.SchemaField("picture", "STRING"),
            bigquery.SchemaField("created_at", "TIMESTAMP"),
            bigquery.SchemaField("subscription_status", "STRING"),
            bigquery.SchemaField("subscription_end_date", "TIMESTAMP"),
            bigquery.SchemaField("subscription_plan", "STRING"),
            bigquery.SchemaField("stripe_customer_id", "STRING"),
            bigquery.SchemaField("last_payment_status", "STRING"),
            bigquery.SchemaField("last_payment_date", "TIMESTAMP"),
            bigquery.SchemaField("refresh_token", "STRING"),
            bigquery.SchemaField("token_expiry", "TIMESTAMP"),
        ]

        table_id = f"{dataset_id}.users"
        table = bigquery.Table(table_id, schema=schema)
        try:
            client.get_table(table)
        except Exception:
            table = client.create_table(table)

    def save(self):
        table_id = f"{dataset_id}.users"
        rows_to_insert = [{
            'email': self.email,
            'name': self.name,
            'picture': self.picture,
            'created_at': self.created_at,
            'subscription_status': self.subscription_status,
            'subscription_end_date': self.subscription_end_date,
            'subscription_plan': self.subscription_plan,
            'stripe_customer_id': self.stripe_customer_id,
            'last_payment_status': self.last_payment_status,
            'last_payment_date': self.last_payment_date,
            'refresh_token': self.refresh_token,
            'token_expiry': self.token_expiry
        }]
        
        errors = client.insert_rows_json(table_id, rows_to_insert)
        if errors:
            raise Exception(f"Error inserting rows: {errors}")

    @staticmethod
    def find_by_email(email):
        query = f"""
        SELECT *
        FROM `{dataset_id}.users`
        WHERE email = @email
        LIMIT 1
        """
        
        job_config = bigquery.QueryJobConfig(
            query_parameters=[
                bigquery.ScalarQueryParameter("email", "STRING", email)
            ]
        )
        
        query_job = client.query(query, job_config=job_config)
        results = query_job.result()
        
        for row in results:
            user = User(
                email=row.email,
                name=row.name,
                picture=row.picture,
                refresh_token=row.refresh_token,
                token_expiry=row.token_expiry
            )
            user.subscription_status = row.subscription_status
            user.subscription_end_date = row.subscription_end_date
            user.subscription_plan = row.subscription_plan
            user.stripe_customer_id = row.stripe_customer_id
            user.last_payment_status = row.last_payment_status
            user.last_payment_date = row.last_payment_date
            return user
            
        return None

    def update_subscription(self, status, end_date=None, plan=None, payment_status=None):
        query = f"""
        UPDATE `{dataset_id}.users`
        SET subscription_status = @status,
            subscription_end_date = @end_date,
            subscription_plan = @plan,
            last_payment_status = @payment_status,
            last_payment_date = CURRENT_TIMESTAMP()
        WHERE email = @email
        """
        
        job_config = bigquery.QueryJobConfig(
            query_parameters=[
                bigquery.ScalarQueryParameter("status", "STRING", status),
                bigquery.ScalarQueryParameter("end_date", "TIMESTAMP", end_date),
                bigquery.ScalarQueryParameter("plan", "STRING", plan),
                bigquery.ScalarQueryParameter("payment_status", "STRING", payment_status),
                bigquery.ScalarQueryParameter("email", "STRING", self.email)
            ]
        )
        
        query_job = client.query(query, job_config=job_config)
        query_job.result()  # Wait for the query to complete

    def update_oauth_credentials(self, refresh_token, token_expiry):
        """Update user's OAuth credentials"""
        query = f"""
        UPDATE `{dataset_id}.users`
        SET refresh_token = @refresh_token,
            token_expiry = @token_expiry
        WHERE email = @email
        """
        
        job_config = bigquery.QueryJobConfig(
            query_parameters=[
                bigquery.ScalarQueryParameter("refresh_token", "STRING", refresh_token),
                bigquery.ScalarQueryParameter("token_expiry", "TIMESTAMP", token_expiry),
                bigquery.ScalarQueryParameter("email", "STRING", self.email)
            ]
        )
        
        query_job = client.query(query, job_config=job_config)
        query_job.result()  # Wait for the query to complete
        
        # Update local instance
        self.refresh_token = refresh_token
        self.token_expiry = token_expiry
