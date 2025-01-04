# 1. Lookernomicon Parameters
+ Company Name: Austin Creators Local LLC
+ EIN: 99-0499000
+ Address: 10705 Pinehurst Drive, Austin, TX 78747
+ Owner: Isabella Edge
## 1.1 Hardware
+ Mac Studio
+ Apple M2 Max
+ Memory 32 GB
+ macOS Sequoia
+ Storage: 1TB
+ Displays: LG Ultrawide 34.5", Samsung 27" vertical
+ Keyboard: Advantage 360 + Trackpad
+ Internet: 7092d, 8115u ($150/month)
## 1.2 GCP:
+ Organization: wrench.chat
+ Organization ID: 26556118309
+ Project name: miguelai
+ Project number: 510916338777
+ Project ID: miguelai	
+ Billing Account name: looker_agent
+ Billing ID: 011B66-0BAC6F-8B619F
+ User: dion@wrench.chat
+ Service Account: lono-svc-acct@miguelai.iam.gserviceaccount.com
+ Google Analytics:
	+ Account ID: 318481437
	+ Property ID: 446440745
+ Secrets Manager: instructions on how to populate with keys and tokens
### 1.2.1 Cloud Storage:
+ gs://agent_miguel_looker_bucketket
### 1.2.2 Vertex AI Agent Builder:
+ Name: Agent_Looker
+ ID: d27f2462-5527-4091-9362-8b8455f9a753
+ Playbook:
	+ Default Generative Agent
		+ OpenAPI
		+ code-interpreter
	+ Looker Studio Assistant
		+ OpenAPI
		+ code-interpreter
		+ Looker_Studio_Pro_Data_Store
			+ gs://agent_miguel_looker_bucket/looker_studio/
	+ BigQuery Assistant
		+ OpenAPI
		+ code-interpreter
		+ BigQuery Data Store
			+ gs://agent_miguel_looker_bucket/bigquery/
	+ Looker Assistant
		+ OpenAPI
		+ code-interpreter
		+ Looker Data Store
			+ gs://agent_miguel_looker_bucket/repo_docs/
			+ gs://agent_miguel_looker_bucket/help_docs/
+ Integrations
	+ Slack
		+ Webhook URL: https://dialogflow.cloud.google.com/v1/cx/locations/us-central1/integrations/slack/webhook/projects/miguelai/agents/d27f2462-5527-4091-9362-8b8455f9a753/integrations/9b7c8882-a552-4ab4-9f0d-d98872a82f41
## 1.3 lookerhelp.com 
+ Single Page React
+ purpose: Central hub for documentation and SEO
	+ implementation:
		+ technical_seo:
        	+ Implement mobile-friendly design
        	+ Optimize page load speed
        	+ Implement HTTPS
        	+ Create XML sitemap
        	+ Use schema markup
		+ on_page_seo:
			+ Optimize meta titles and descriptions
        	+ Use header tags effectively
      		+ Create unique, high-quality content
   	    	+ Optimize URL structures
    	    + Implement internal linking
		+ content_strategy:
        	+ Develop comprehensive knowledge base
        	+ Create in-depth guides and tutorials
        	+ Produce complementary video content
        	+ Maintain regular blog updates
		+ user_experience:
        	+ Implement intuitive site structure
    	    + Incorporate search function
  	    	+ Ensure accessibility
  	    + monitoring:
        	+ Set up Google Analytics and Search Console
        	+ Monitor keyword rankings
        	+ Analyze user behavior
+ Logo: https://storage.cloud.google.com/agent_miguel_looker_bucket/Lono_Logo.png
+ Free:
	+ https://lookerhelp.com/lookernomicon description of the agent and its architecture, docs and scripts sites
	+ https://lookerhelp.com/about section about me the creator
	+ https://lookerhelp.com/pricing section about pricing with the stripe subscription portal
	+ https://lookerhelp.com/contact email form, linkedin, must be auth'd to work: slack, docs, scripts; must be paid to work: slack link.
	+ https://lookerhelp.com/privacy privacy policy
	+ https://lookerhelp.com/terms terms of service
	+ https://lookerhelp.com/slack section about how to access lookernomicon in slack, service level agreement
+ Auth'd:
	+ https://docs.lookerhelp.com/ all technical content (GitBook doc site)
	+ https://scripts.lookerhelp.com/ all scripts and readmes (GitBook doc site)
+ Paid:
	+ https://lookerhelp.com/slack section about how to access lookernomicon in slack, service level agreement, with subscription status
		+ use Google Drive to submit files for Data Stores
		+ use Google Calendar to book some time with Dion Edge
		+ use Slack to send a message to Dion Edge
### 1.3.1 Iframely
+ Google Drive: <div style="left: 0; width: 100%; height: 400px; position: relative;"><iframe src="https://drive.google.com/embeddedfolderview?id=1p2G0qVOByRYizwEb5HqyUM1qwgyjEzrf#list" style="top: 0; left: 0; width: 100%; height: 100%; position: absolute; border: 0;" allowfullscreen></iframe></div>
+ Google Calender: <div style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: 75%;"><iframe src="https://calendar.google.com/calendar/embed?src=dion%40wrench.chat&ctz=America%2FChicago" style="top: 0; left: 0; width: 100%; height: 100%; position: absolute; border: 0;" allowfullscreen></iframe></div>
### 1.3.2 Color Palette
	+ primary: "#2D2926" # legacy black
	+ secondary: "#B026FF" # neon purple
	+ accent: "#FF13F0" # neon hot pink
	+ background: "#F0E8F3" # anti-flash white
	+ text: "#333333" # dark gray
	+ heading: "#19171A" # eerie black
	+ link: "#00FEFC" neon cyan
	+ success: "#39FF14" # neon green
	+ warning: "#CFFF04" neon yellow
	+ error: "#FF3131" # neon red
	+ neutral light: "#E0E0E0" alto gray
	+ neutral medium: "#9E9E9E" gray62
	+ neutral dark: "#616161" gray700
## 1.4 GitHub:
+ Personal: https://github.com/wrenchchat
+ Organization: https://github.com/wrenchchatrepo
+ Repo: https://github.com/wrenchchatrepo/lookerhelp
	+ https://github.com/wrenchchatrepo/lookerhelp/tree/main/docs
	+ https://github.com/wrenchchatrepo/lookerhelp/tree/main/scripts/
+ Organization_Secret
	+ Name: LOOKERHELP_SECRET
	+ Value: PAT
## 1.5 GitBook:
LookerHelp Docs: https://docs.lookerhelp.com/
LookerHelp Scripts:  https://scripts.lookerhelp.com/
## 1.6 Slack:
+ App ID: A0860L8F87R
+ Channels
	+ Lookernomicon (app channel)
	+ support
	+ feature-requests
	+ data-store-submissions
	+ community
	+ docs
	+ dion (direct message)
## 1.7 Stripe:
+ Dashboard: https://dashboard.stripe.com/
+ Payment Link: https://buy.stripe.com/5kAaG9gw99e47Cw8ww
## 1.8 LinkedIn:
+ Personal: https://www.linkedin.com/in/dionedge
+ Lookernomicon: https://www.linkedin.com/company/lookernomicon/
## 1.9 about:
+ name: Dion Edge
+ description: 
	+ Looker expert and creator of Lookernomicon, an AI-powered resource for Looker professionals. 
    With deep expertise in LookML, data modeling, and BI strategy, I bring extensive experience as a data engineer and AI/ML solution architect. 
    I'm a nuts-and-bolts engineer with a rich script inventory, rooted in applied mathematics and computational methods. 
    My background spans from BI to advanced analytics, focusing on problems with non-obvious solutions. 
    I'm dedicated to empowering data teams through innovative, efficient approaches to complex challenges.
+ technical_expertise:
	+ Subject Matter Expert in:
    	+ LookML and Looker platform
    	+ Git version control
    	+ BigQuery and GCP Architecture
    	+ Data modeling and engineering across multiple SQL dialects
    	+ AI/ML solution design and development
    	+ Optimizing BI ecosystems for performance and scalability
## 1.10 lookernomicon
+ description:
  	+ Lookernomicon is an AI-powered comprehensive resource for Looker professionals, combining cutting-edge technology with expert knowledge. It offers in-depth LookML guides, advanced data modeling techniques, and BI strategy insights. Featuring a rich repository of scripts, tutorials, and best practices, Lookernomicon caters to both novice and experienced Looker users. With its integrated platform spanning documentation, community forums, and personalized learning paths, it accelerates mastery of Looker's capabilities. Lookernomicon is the go-to solution for elevating Looker implementations and driving data-driven decision-making across organizations.
+ tagline: "The AI-Grimoire for Looker Nerds"
## 1.11 linkedin_strategy:
+ company_page:
	+ url: https://www.linkedin.com/company/lookernomicon/
	+tagline: "The AI+Grimoire for Looker Nerds"
+ convert_lookers_to_contacts:
	+ Use Lookers.csv file: /Users/dionedge/dev/Lookernomicon/docs/Lookers.csv
+ Identify new Lookers on LinkedIn
	+ Create personal message template (TO DO)
	+ Initiate direct contact
+ promote_lookernomicon:
	+ Create broad message for posts (TO DO)
	+ Regular updates on Lookernomicon features and content
+ thought_leadership:
	+ Share industry insights and trends
	+ Engage with Looker and industry content
	+ Write and share articles on advanced topics
## 1.12 Service_level_agreement:
+ free:
	+ response_time: Best effort, no guaranteed time frame
+ paid:
	+ response_time: 24+hour guaranteed response time
	+ support_channels:
		+ Dedicated Slack channel: /support
		+ Email support: dion@lookerhelp.com
# 2. MVP Content Strategy for LookerHelp.com Launch
## 2.1 Technical SEO (Critical): 
- a. Implement HTTPS for secure connections. 
- b. Create and submit an XML sitemap to Google Search Console. 
- c. Ensure the website is mobile-friendly with responsive design.
## 2.2 On-Page SEO (Critical): 
- a. Optimize meta titles and descriptions for each main page, incorporating target keywords. 
- b. Use header tags (H1, H2, H3) effectively to structure content. 
- c. Create unique, high-quality content for key pages. 
- d. Optimize URL structures to be concise and include relevant keywords.
## 2.3 Content Strategy (Critical): 
- a. Develop core knowledge base content covering essential aspects of Looker. 
- b. Focus on high-volume keywords for initial content:
	+ Looker tutorial
	+ Looker dashboard
	+ Looker analytics
## 2.4 Looker documentation 
+ Create in-depth guides for top 3-5 common Looker issues or questions.
## 2.5 User Experience (Critical): 
- a. Implement an intuitive site structure and navigation. 
- b. Use clear, concise language and formatting for easy readability. 
- c. Incorporate a basic search function to help users find information.
## 2.6 Monitoring and Analytics (Critical): 
+ Set up Google Analytics and Google Search Console to track website performance.
## 2.7 Information Architecture (Critical): 
- a. Create a clear, hierarchical structure for your content. 
- b. Implement main categories: Tutorials, Features, Documentation.
## 2.8 Content Types (for MVP): 
- a. Quick Start Guide 
- b. Basic Troubleshooting Guide 
- c. API Documentation (if applicable) 
- d. 2-3 In-depth Tutorials on core Looker features
## 2.9 Navigation (Critical): 
- a. Implement a simple main navigation menu. 
- b. Include a search bar on every page.
## 2.10 Content Presentation: 
- a. Use a clean, modern design with adequate white space. 
- b. Break content into easily scannable sections with clear headings.
## 2.11 Visual Aids: 
+ Include relevant screenshots for tutorials.
## 2.12 Cross-linking: 
+ Add relevant internal links between main content pages.