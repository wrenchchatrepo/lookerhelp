# Export Data to Google Cloud Storage with Data Pipeline

## Automate recurring data exports from Stripe to your Google Cloud Storage bucket with Data Pipeline.

## Google Cloud Storage destination
Data pipeline can deliver copies of all your Stripe data as Parquet files into your Google Cloud Storage (GCS) bucket. It includes a directory of files for each table, delivered, and updated every 6 hours.

### Prerequisites
Before starting the integration, make sure you have access and permission:
+ Create a Google Cloud Storage bucket.
+ Create a service account enabling Stripe to create objects in the provisioned bucket.
+ Access the Stripe Dashboard as an admin.

### Select Your Google Cloud Project
+ Navigate to the Google Cloud Console.
+ Select the project that you want to send your Stripe data to.

### Create a new Service Account and generate a JSON key [DONE.]
+ On the Service Accounts page, make sure you’re in the correct Google Cloud Project. [DONE.]
+ Click + CREATE SERVICE ACCOUNT. [DONE.]
+ Enter a name for the service account, for example, “<name>-stripe-data-pipeline.” [DONE. Use existing svc-acct,]
+ Add a description—for example, “This role gives Stripe access to upload data files to our bucket.” [DONE.
+ Click CREATE AND CONTINUE. [DONE.
+ In the Select a Role dropdown, add three roles: Storage Object User, Storage Object Creator, and Storage Insights Collector Service. [DONE.]
+ Click DONE. [DONE.]
+ For your new Service Account, click Manage keys in the Actions menu. [DONE.]
+ Click ADD KEY ▾ and select Create new key. [DONE.]
+ Choose Key type JSON and click CREATE. The JSON file downloads to your device. [DONE.]

### Create a New Bucket
+ Make sure you’re in the correct Google Cloud project by navigating to Cloud Storage > Buckets in the Google Cloud console.
+ Click + CREATE.
+ In the Name field, we recommend a name including “stripe,” such as “<name>-stripe-data.”
+ For the Location type, we recommend Multi-Regional US.
+ For the Storage class, we recommend Set a default class - Standard.
+ For the Access Control, choose Prevent public access with Uniform access control.
+ For Data protection, we recommend a logical Retention Policy, for example 7 days.
+ Click CREATE button to create the bucket.
+ Select the PERMISSIONS tab for your newly created bucket.
+ Under Permissions in the VIEW BY PRINCIPAL tab, check the box next to the Service Account you created in the previous step.

### Establishing your Google Cloud Storage connection
+ Visit the Data Pipeline Dashboard.
+ Click Get started.
+ Select the Google Cloud Storage logo and click Continue ->. This step generates a bucket name.
+ Enter the bucket name generated in the previous step.
+ Upload your Service Account .json file generated earlier.
+ Select your data encryption option. If you chose to use a customer managed key, upload your public key.
+ Click the Next button. Clicking this button sends test data to the bucket you provided, but not production data.
+ When you confirm test data delivery, go to your Cloud Storage bucket.
+ Open the bucket, navigate to the penny_test directory, and open the acct_ prefixed sub-directory to locate the delivered account_validation.csv test file.
+ Click the account_validation.csv file.
+ Click DOWNLOAD.
+ Click the Upload the test value file and upload the downloaded account_validation.csv.
+ Click Confirm value.
+ When you confirm the test value, click Subscribe. This subscribes you to the product and schedules the initial full load of data for delivery to your Google Cloud Storage bucket, a process that can take 6-12 hours.