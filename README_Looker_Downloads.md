# Looker Downloads Activity Reporter

## Objective
This tool analyzes and reports download activity from a Looker instance by querying the system activity logs. It provides detailed insights into download patterns, user behavior, and file type preferences over a specified time period.

## Components

### Files
- `looker_downloads.py`: Main script that queries Looker and generates the download activity report
- `looker.ini`: Configuration file containing Looker API credentials
- `downloads_[timestamp].txt`: Generated report file with timestamp in filename

### Dependencies
- Python 3.x
- looker-sdk

## Setup Instructions

1. **Environment Setup**
   ```bash
   # Create a virtual environment
   python -m venv looker_env
   
   # Activate the virtual environment
   # On Unix/macOS:
   source looker_env/bin/activate
   # On Windows:
   .\looker_env\Scripts\activate
   
   # Install required package
   pip install looker-sdk
   ```

2. **Configuration**
   Create a `looker.ini` file with your Looker API credentials:
   ```ini
   [Looker]
   base_url=your_looker_instance_url
   client_id=your_client_id
   client_secret=your_client_secret
   verify_ssl=true
   ```

## Usage
```bash
python looker_downloads.py
```

The script will:
1. Connect to your Looker instance
2. Query the last 30 days of download activity
3. Generate a detailed report including:
   - Query period and actual download date range
   - Average downloads per day
   - Download details by user
   - Summary statistics with file type breakdown

## Output Format

The generated report includes:

### Header Section
- Report generation timestamp
- Query period
- Actual download date range
- Average downloads per day

### User Details Section
For each user:
- User ID
- Number of downloads by file type
- First and last download timestamps

### Summary Section
- Total number of downloads
- Breakdown by file type with percentages

### Example Output
```
Download Activity Report
Generated on: 2024-12-21 00:00:00
Query Period: 2024-11-21 to 2024-12-21 (30 days)
==================================================

Actual Download Date Range:
First Download: 2024-11-21 20:12:00
Last Download:  2024-12-19 23:58:22
Date Range: 28 days
Average Downloads per Day: 16.2

Download Details by User:
==================================================

User ID: 7
  JSON: 808 downloads
    First: 2024-11-22 06:23:00
    Last:  2024-12-15 08:17:00

User ID: 11
  CSV: 1 downloads
    First: 2024-12-19 10:16:45
    Last:  2024-12-19 10:16:45

User ID: 666
  TXT: 1 downloads
    First: 2024-12-08 15:23:30
    Last:  2024-12-08 15:23:30
------------------------------
------------------------------
------------------------------
------------------------------
------------------------------

Summary
==================================================
Total Downloads: 813

Downloads by File Type:
  CSV: 1 (0.1%)
  JSON: 811 (99.8%)
  TXT: 1 (0.1%)
```

## File Descriptions

### looker_downloads.py
Main script that:
- Initializes connection to Looker using the SDK
- Queries system activity for download information
- Processes the results
- Generates detailed reports

### looker.ini
Configuration file containing:
- Looker instance URL
- API credentials
- SSL verification settings

### downloads_[timestamp].txt
Generated report file containing:
- Detailed download activity analysis
- User-specific download patterns
- Summary statistics
- The timestamp in the filename reflects when the report was generated

## Error Handling
The script includes comprehensive error handling for:
- Missing configuration file
- SDK initialization issues
- API query failures
- Data processing errors

## Notes
- The script queries the last 30 days of activity by default
- Download types tracked include: CSV, JSON, TXT, Excel, PNG
- Frontend-related formats (json_fe, json_detail) are excluded from the counts
- The report is both displayed in the console and saved to a file
