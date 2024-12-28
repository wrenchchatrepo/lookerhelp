## 1. Set up GitBook Spaces

```bash
# Ensure config.py exists and contains the necessary GitBook API token
if [ ! -f config.py ]; then
    echo "Error: config.py file not found. Please create it with the necessary configuration."
    exit 1
fi

# Read GitBook API token from config.py
GITBOOK_API_TOKEN=$(python -c "import config; print(config.GITBOOK_API_TOKEN)")

# Function to create a GitBook space
create_gitbook_space() {
    local name=$1
    local visibility=$2
    
    response=$(curl -X POST "https://api.gitbook.com/v1/spaces" \
      -H "Authorization: Bearer $GITBOOK_API_TOKEN" \
      -H "Content-Type: application/json" \
      -d '{
        "name": "'"$name"'",
        "visibility": "'"$visibility"'"
      }')
    
    echo $response | jq -r '.id'
}

# Create main LookerHelp space
MAIN_SPACE_ID=$(create_gitbook_space "LookerHelp" "public")
echo "Main Space ID: $MAIN_SPACE_ID"

# Create docs subdomain space
DOCS_SPACE_ID=$(create_gitbook_space "LookerHelp Docs" "public")
echo "Docs Space ID: $DOCS_SPACE_ID"

# Create scripts subdomain space
SCRIPTS_SPACE_ID=$(create_gitbook_space "LookerHelp Scripts" "public")
echo "Scripts Space ID: $SCRIPTS_SPACE_ID"

# Note: Custom domain setup must be done manually in the GitBook UI
echo "Remember to set up custom domains for each space in the GitBook UI"
```
### This script uses the GitBook API to create the necessary spaces for LookerHelp. After running this script:

**1. You'll have three GitBook spaces created: main site, docs, and scripts.**

**2. The space IDs will be printed, which you should save for future use.**

**3. Custom domain setup still needs to be done manually in the GitBook UI.**

### Next steps:

**1. Replace your_gitbook_api_token with your actual GitBook API token.**

**2. Run this script to create the spaces.**

**3. Save the returned space IDs for use in future API calls.**

**4. Manually set up custom domains in the GitBook UI for each space.**

### Set up Initial Content Structure in GitBook

```bash
# Function to create a page in a GitBook space
create_page() {
    local space_id=$1
    local title=$2
    local content=$3
    
    curl -X POST "https://api.gitbook.com/v1/spaces/$space_id/content" \
      -H "Authorization: Bearer $GITBOOK_API_TOKEN" \
      -H "Content-Type: application/json" \
      -d "{
        \"title\": \"$title\",
        \"type\": \"page\",
        \"content\": \"$content\"
      }"
}

# Set up main LookerHelp space content
echo "Setting up main LookerHelp space content..."

create_page $MAIN_SPACE_ID "Welcome to LookerHelp" "# Welcome to LookerHelp\n\nYour comprehensive resource for Looker expertise."
create_page $MAIN_SPACE_ID "About" "# About LookerHelp\n\nLearn about our mission and team."
create_page $MAIN_SPACE_ID "Pricing" "# Pricing\n\nExplore our subscription options."
create_page $MAIN_SPACE_ID "Contact" "# Contact Us\n\nGet in touch with our team."

# Set up Docs space content
echo "Setting up Docs space content..."

create_page $DOCS_SPACE_ID "Looker Documentation" "# Looker Documentation\n\nComprehensive guides and tutorials for Looker."
create_page $DOCS_SPACE_ID "Getting Started" "# Getting Started with Looker\n\nYour first steps in the Looker ecosystem."
create_page $DOCS_SPACE_ID "Advanced Topics" "# Advanced Looker Topics\n\nDeep dives into complex Looker concepts."

# Set up Scripts space content
echo "Setting up Scripts space content..."

create_page $SCRIPTS_SPACE_ID "Looker Scripts" "# Looker Scripts\n\nA collection of useful scripts for Looker professionals."
create_page $SCRIPTS_SPACE_ID "LookML Scripts" "# LookML Scripts\n\nScripts for working with LookML."
create_page $SCRIPTS_SPACE_ID "Data Analysis Scripts" "# Data Analysis Scripts\n\nScripts for advanced data analysis in Looker."

# Update space metadata
update_space_metadata() {
    local space_id=$1
    local description=$2
    
    curl -X PATCH "https://api.gitbook.com/v1/spaces/$space_id" \
      -H "Authorization: Bearer $GITBOOK_API_TOKEN" \
      -H "Content-Type: application/json" \
      -d "{
        \"description\": \"$description\"
      }"
}

update_space_metadata $MAIN_SPACE_ID "Your comprehensive resource for Looker expertise"
update_space_metadata $DOCS_SPACE_ID "In-depth Looker documentation and tutorials"
update_space_metadata $SCRIPTS_SPACE_ID "A curated collection of useful Looker scripts"
```
### This script sets up the basic content structure for your GitBook spaces. After running this script:

**1. The main LookerHelp space will have Welcome, About, Pricing, and Contact pages.**

**2. The Docs space will have a main documentation page, Getting Started, and Advanced Topics pages.**

**3. The Scripts space will have a main scripts page, LookML Scripts, and Data Analysis Scripts pages.**

**4. Each space will have an updated description.**

### Next steps:

**1. Review the created content in the GitBook web interface.**

**2. Customize and expand the content for each page as needed.**

**3. Set up the navigation structure for each space in the GitBook web interface.**

**4. Consider adding more pages and structure as your content grows.**
