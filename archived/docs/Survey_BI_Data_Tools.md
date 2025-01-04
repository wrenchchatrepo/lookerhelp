# A Comprehensive Survey of Data Tools in the Business Intelligence Landscape
### Author: Dion Edge
### Created: 17 December 2024

## Table of Contents

###  I. Introduction 

* 1.1. The Evolving Landscape of Business Intelligence 
* 1.2. The Need for a Holistic View
* 1.3. Scope of the Survey

### II. Data Tool Paradigms: Foundations for BI

* 2.1. Declarative vs. Imperative Programming
* 2.2. The Role of Declarative Tools in BI
* 2.3. The Importance of Multi-Paradigm Tools

### III. Key Data Tools: A Comprehensive Overview

* 3.1. Data Querying and Manipulation
    * 3.1.1. SQL (Structured Query Language)
    * 3.1.2. Python (with Pandas, NumPy, SciPy) 
    * 3.1.3. R
    * 3.1.4. Malloy
* 3.2. Data Modeling and Transformation 
    * 3.2.1. LookML (Looker Modeling Language)
    * 3.2.2. DAX (Data Analysis Expressions)
    * 3.2.3. dbt (Data Build Tool)
* 3.3. Data Analysis and Visualization
    * 3.3.1. MDX (Multidimensional Expressions)
    * 3.3.2. Cube.js
    * 3.3.3. Superset
    * 3.3.4. Other Tools
        * 3.3.4.1. Tableau
        * 3.3.4.2. Power BI
* 3.4. Data Optimization and Advanced Analytics
    * 3.4.1. Mathematical Optimization Languages (AMPL, GAMS)
    * 3.4.2. Scala (with Apache Spark)
    * 3.4.3. Visualizing Data in Unreal Engine

### IV. Popular Data Visualization Libraries and Frameworks

* 4.1. Javascript Libraries
    * 4.1.1. D3.js
    * 4.1.2. Three.js 
    * 4.1.3. Chart.js 
    * 4.1.4. Plotly.js
* 4.2. Python Libraries
    * 4.2.1. Bokeh
    * 4.2.2. Altair
    * 4.2.3. Mayavi
    * 4.2.4. Plotly (Python)

### V.  Comparing dbt and Cube.js: Two Prominent Tools in the BI Landscape

* 5.1. Key Features and Use Cases
* 5.2. Synergies and Potential Integration

### VI.  Opportunities and Future Trends

* 6.1. The Rise of Data-Driven Decision-Making
* 6.2. The Need for Enhanced Data Governance and Security
* 6.3. Emergence of New Languages and Paradigms 
* 6.4. Focus on User Experience and Accessibility
* 6.5. Integration with Machine Learning and AI

### VII.  Conclusion

* 7.1. A Call for Collaboration 
* 7.2. The Power of a Connected Data Ecosystem

### Appendix

* Glossary of Terms
* References 

# A Comprehensive Survey of Data Tools in the Business Intelligence Landscape

## I. Introduction

*  **1.1. The Evolving Landscape of Business Intelligence:**  We're living in a data-driven world, and everyone's trying to make sense of it. Business Intelligence (BI) tools are the heroes of this story – they help us extract meaning from all this data, so we can make smarter decisions.[1] But the data landscape is getting complex – we've got tons of different sources, formats, and needs. This makes picking the right tools even more important. 

* **1.2. The Need for a Holistic View:** You can't just pick one BI tool and expect it to solve all your problems.  You need to understand the different tools and how they work together to build a complete analytics workflow.[2] That's where this survey comes in – we're going to explore the different data tools and their roles in the BI landscape.

* **1.3. Scope of the Survey:**  We'll be focusing on tools that are directly involved in building and consuming analytics.  We'll  *not* be diving into specialized machine learning or data science tools.  We're also not going to cover statistical languages like SAS or Stata, or general scientific computing tools like MATLAB or Wolfram Mathematica.  We're sticking to the BI world.

## II. Data Tool Paradigms: Foundations for BI

* **2.1. Declarative vs. Imperative Programming:**  Two big ideas shape how data tools work: declarative and imperative programming.[3] In declarative programming, you tell the tool *what* you want, not *how* to get it. It's like giving a recipe – you list the ingredients and steps, but the computer figures out the details.  Imperative programming is more hands-on – you tell the tool *exactly* what to do, step by step. It's like writing a detailed set of assembly instructions.

* **2.2.  The Role of Declarative Tools in BI:** Declarative tools are a big deal in BI. They make data modeling and query building easier, because they abstract away the complexities of the underlying code.  Think of it like having a magic wand for data – you wave it, and the results appear.  This makes them great for a wide range of users, not just expert developers. 

* **2.3. The Importance of Multi-Paradigm Tools:** But sometimes, you need a tool that can do it all.  Multi-paradigm tools like Python, R, and Scala combine declarative and imperative elements. This makes them flexible – you can use them for simple tasks and complex ones, and even build your own custom tools. 

## III. Key Data Tools: A Comprehensive Overview

* **3.1. Data Querying and Manipulation:** 

    * **3.1.1. SQL (Structured Query Language):**  SQL is like the king of databases – everyone uses it.[4]  It's a declarative language, so you describe what data you want without writing out the exact steps to get it. It's great for getting data from databases and doing basic transformations. Think of it like building a solid foundation for your analytics project.

    * **3.1.2. Python (with Pandas, NumPy, SciPy):** Python is a versatile language with powerful libraries like Pandas, NumPy, and SciPy. These libraries let you wrangle data, perform statistical analysis, and even build machine learning models.  Think of Python as the electrician, plumber, and structural engineer – it handles all the essential plumbing and wiring for your analytics project.

    * **3.1.3. R:**  R is a language specifically designed for statistical analysis and data visualization. It's got lots of libraries for deep statistical analysis, especially useful for exploratory data analysis. Think of R as the interior designer – it helps make your insights look good and helps you explore the "inside" of your data.

    * **3.1.4. Malloy:**  Malloy is a newer language that's trying to simplify data modeling and querying. It aims to make working with multiple tables and complex data easier.  It's still under development, but it could become a big player in the BI world.  Think of Malloy as a new kind of building technology, using cutting-edge methods to create complex structures. 

* **3.2. Data Modeling and Transformation:**

    * **3.2.1. LookML (Looker Modeling Language):**  LookML lets you define how data should be structured in Looker, a BI tool built on top of SQL.  You can create relationships between tables, define metrics, and build reusable query components. Think of it like building the blueprint for your project – it lays out the design and ensures everything fits together.

    * **3.2.2. DAX (Data Analysis Expressions):**  DAX is a formula language that's used in Microsoft Power BI, Excel, and Analysis Services. It lets you build custom calculations, measures, and time intelligence – all the details that make your data meaningful. Think of DAX as the finishing carpenter, adding those final touches that make your project polished and ready for use.

    * **3.2.3. dbt (Data Build Tool):**  dbt helps you automate the process of transforming raw data into clean, analytics-ready tables within your data warehouse.[5] It's like a construction manager – it orchestrates the process of building your project, ensuring everything is done in the right order and to the right standards.

* **3.3. Data Analysis and Visualization:** 

    * **3.3.1. MDX (Multidimensional Expressions):** MDX is used for querying OLAP cubes, which are multidimensional datasets designed for efficient analysis. It's great for working with hierarchical data.  Think of MDX as the surveyor – it ensures you can efficiently analyze data that has multiple layers, like sales across different regions and time periods.

    * **3.3.2. Cube.js:** Cube.js is a headless BI platform that lets you build APIs for analytics applications. This means you can fetch data in real time and visualize it in custom dashboards.  Think of Cube.js as the system integrator – it connects everything, making sure all your analytics are accessible in real time. 

    * **3.3.3. Superset:** Superset is an open-source visualization platform that lets you build interactive dashboards. You can connect to various data sources and explore data with interactive visualizations. Think of Superset as the interactive showcase – it presents your data in a way that's engaging and easy to explore.

    * **3.3.4. Other Tools:**

        * **3.3.4.1. Tableau:**  Tableau is a commercial visualization tool that's known for its user-friendly drag-and-drop interface. It's powerful and flexible, and it lets you create beautiful and insightful visualizations.[6] Think of it like a professional data visualization studio. 

        * **3.3.4.2. Power BI:**  Power BI is Microsoft's commercial visualization tool,  integrated with the Microsoft ecosystem. It's great for creating data stories and presenting insights to a broader audience.[7] Think of it as a complete business intelligence suite – it has everything you need to tell a compelling data-driven story.

* **3.4. Data Optimization and Advanced Analytics:** 

    * **3.4.1. Mathematical Optimization Languages (AMPL, GAMS):**  These languages are designed for solving optimization problems. They help you figure out the best way to do something, given a set of constraints.  Think of them as structural engineers – they ensure your analytics are optimized for efficiency and performance. 

    * **3.4.2. Scala (with Apache Spark):**  Scala is a language for big data processing, especially when working with distributed datasets. Apache Spark is a framework that makes Scala powerful for large-scale data analysis. Think of Scala and Spark as the cranes and heavy machinery – they handle the big lifting and complex tasks in your analytics project.

    * **3.4.3. Visualizing Data in Unreal Engine:**   Unreal Engine is traditionally used for creating games, but it's increasingly being used for data visualization.[8]  Its 3D capabilities allow for immersive data stories.  Think of it as a new kind of visualization platform – it lets you create breathtaking 3D experiences to showcase your insights.  

## IV. Popular Data Visualization Libraries and Frameworks

* **4.1. Javascript Libraries:**

    * **4.1.1. D3.js:** D3.js is a powerful and flexible JavaScript library that lets you create custom, interactive data visualizations. Think of it as the foundation – you can build almost anything you can imagine with it.

    * **4.1.2. Three.js:**  Three.js is a JavaScript library for creating 3D graphics and visualizations. It's commonly used with WebGL to make complex 3D visualizations. Think of Three.js as your 3D world building tool.

    * **4.1.3. Chart.js:**  Chart.js is a user-friendly JavaScript library for creating various charts like bar charts, line charts, and pie charts.  It's a great starting point for basic visualizations. Think of it as a template library – it provides easy-to-use options for common chart types.

    * **4.1.4. Plotly.js:**  Plotly.js is an interactive graphing library with a focus on scientific and statistical data visualization. It's got a wide range of features and is excellent for making professional-looking visualizations. Think of it as a sophisticated tool for creating detailed and interactive graphs. 

* **4.2. Python Libraries:**

    * **4.2.1. Bokeh:**  Bokeh is a Python library that lets you create interactive web-based plots and dashboards. It's great for making visualizations that are easy to share online. Think of it as a tool for building interactive data exploration tools.

    * **4.2.2. Altair:**  Altair is a Python library that focuses on creating concise and expressive visualizations. It has a declarative style, making it easy to write elegant code that generates great-looking visualizations. Think of it as a tool for creating beautiful and efficient visualizations.

    * **4.2.3. Mayavi:**  Mayavi is a Python library for creating 3D visualizations, particularly useful for scientific data analysis. It lets you create complex 3D plots to explore scientific data. Think of it as a tool for visualizing complex 3D data in scientific fields. 

    * **4.2.4. Plotly (Python):**  Plotly is a Python library for creating interactive visualizations, including 3D plots, maps, and dashboards. It's a very versatile library that can handle many different types of visualizations. Think of it as a powerful and versatile visualization tool. 

## V.  Comparing dbt and Cube.js: Two Prominent Tools in the BI Landscape

* **5.1. Key Features and Use Cases:**  dbt and Cube.js are two popular BI tools that are often mentioned in the same breath.  dbt is great for transforming data within a data warehouse.[9]  Cube.js is more focused on building APIs for frontend analytics applications.[10] We'll break down their key features, strengths, weaknesses, and target users. 

* **5.2. Synergies and Potential Integration:**  dbt and Cube.js can actually work together pretty well – think of it as a powerful one-two punch. dbt prepares the data, and Cube.js serves it up to the front-end application, making for a smooth and efficient BI workflow. 

## VI.  Opportunities and Future Trends

* **6.1.  The Rise of Data-Driven Decision-Making:**  The world is becoming more data-driven by the day.  Companies that can use data effectively to make decisions have a huge advantage.[11]  BI tools are playing a crucial role in this shift – they're helping companies make sense of their data and use it to gain a competitive edge.

* **6.2. The Need for Enhanced Data Governance and Security:** As we rely more on data, it's essential to have strong data governance and security measures in place.[12]  BI tools are evolving to meet these challenges, integrating with security frameworks and offering better data management capabilities.

* **6.3.  Emergence of New Languages and Paradigms:**  We're seeing new languages and paradigms emerge in the BI world, like Malloy. These new tools are designed to make data work easier, whether by simplifying data modeling, query writing, or visualization.  This evolution is exciting – it means BI tools are becoming more accessible and powerful for everyone. 

* **6.4.  Focus on User Experience and Accessibility:**  BI tools are moving beyond complex coding and technical jargon.  The emphasis is on user-friendly interfaces and intuitive workflows that empower everyone, regardless of their technical background.[13]  This means BI can be used by a wider range of people, making data-driven decisions more accessible.

* **6.5.  Integration with Machine Learning and AI:**  The integration of BI tools with machine learning and AI is one of the most exciting trends in the BI world.[14] These integrations are opening up new possibilities for automating insights, discovering patterns, and making more accurate predictions.

## VII.  Conclusion

* **7.1.  A Call for Collaboration:**  The BI landscape is dynamic – new tools and technologies are constantly emerging. We need ongoing research and development to ensure BI tools are constantly improving and evolving to meet the changing needs of the data world.  Collaboration between developers, researchers, and users is key to making this happen. 

* **7.2.  The Power of a Connected Data Ecosystem:**  The future of BI lies in a connected data ecosystem – where tools can seamlessly integrate and share data. This means having a single, unified platform for data exploration, analysis, and visualization.  This interconnectedness will unlock new opportunities for insights and empower organizations to make smarter, data-driven decisions.

## Appendix

* **Glossary of Terms:** 

    * **Business Intelligence (BI):**  The process of collecting, analyzing, and interpreting data to gain insights and support better business decisions. [Source: https://www.sas.com/en_us/insights/analytics/business-intelligence.html]
    * **Data Warehouse:** A central repository for storing and managing data from multiple sources, often used for analytical purposes. [Source: https://www.ibm.com/cloud/learn/data-warehouse]
    * **Declarative Programming:** A programming paradigm where you specify *what* you want the program to achieve, rather than the specific steps to take. [Source: https://en.wikipedia.org/wiki/Declarative_programming]
    * **Imperative Programming:** A programming paradigm where you provide step-by-step instructions to tell the computer exactly what to do. [Source: https://en.wikipedia.org/wiki/Imperative_programming]
    * **OLAP Cube:** A multidimensional data structure designed for efficient analysis of data with multiple dimensions (e.g., sales by region, product, and time period). [Source: https://en.wikipedia.org/wiki/OLAP_cube]
    * **API (Application Programming Interface):** A set of rules and specifications that allow different software programs to communicate with each other. [Source: https://en.wikipedia.org/wiki/API]
    * **Headless BI:** A BI platform that focuses on providing data through APIs, rather than a traditional user interface. [Source: https://cube.js/blog/headless-bi]
    * **Data Modeling:** The process of designing and creating a logical representation of data that captures its structure, relationships, and constraints. [Source: Ibid]
    * **Data Transformation:**  The process of converting data from one format or structure to another, often done to prepare it for analysis. [Source: Ibid]
    * **Data Wrangling:**  The process of cleaning, transforming, and preparing data for analysis. This can involve tasks like handling missing values, converting data types, and removing duplicates. [Source: Ibid]
    * **Data Lineage:** The history of how data has been created, transformed, and moved throughout its lifecycle. [Source: Ibid]
    * **Data Governance:**  The policies and processes that define how data is managed, used, and protected within an organization. [Source: Ibid]
    * **Data Security:** The measures taken to protect data from unauthorized access, use, disclosure, disruption, modification, or destruction. [Source: Ibid]
    * **Data Visualization:** The process of representing data graphically, often using charts, graphs, and maps, to communicate insights and trends. [Source: Ibid]
    * **Dashboard:** A visual display that presents key data points and metrics in a concise and informative way. [Source: Ibid]
    * **Interactive Dashboard:** A dashboard that allows users to interact with the data, such as filtering, drilling down, and exploring different perspectives. [Source: Ibid]
    * **Data Storytelling:**  The process of using data to create narratives that are engaging, persuasive, and informative. [Source: Ibid]
    * **Data Exploration:** The process of investigating data to uncover patterns, trends, and insights. [Source: Ibid]
    * **Exploratory Data Analysis (EDA):**  A statistical technique used to analyze and summarize data to gain a better understanding of its characteristics. [Source: Ibid]
    * **Data Analytics:** The process of examining raw data to extract meaningful insights and make informed decisions. [Source: Ibid]
    * **Predictive Analytics:**  A type of data analysis that uses historical data to predict future outcomes or trends. [Source: Ibid]
    * **Machine Learning (ML):** A type of artificial intelligence that enables computers to learn from data without explicit programming. [Source: Ibid]
    * **Artificial Intelligence (AI):** The simulation of human intelligence processes by computer systems. [Source: Ibid] 
    * **Big Data:**  Extremely large datasets that are difficult to process using traditional data management tools. [Source: Ibid]
    * **Cloud Computing:** The delivery of computing services – such as servers, storage, databases, networking, software, analytics, and intelligence – over the Internet ("the cloud"). [Source: Ibid]
    * **Data Lake:** A central repository for storing raw, unprocessed data from various sources in its native format. [Source: Ibid]
    * **Data Pipeline:** A series of automated processes that move data from source systems to target systems, often involving transformation steps. [Source: Ibid]
    * **Data Integration:** The process of combining data from multiple sources into a single, consistent view. [Source: Ibid]
    * **Data Quality:**  The accuracy, completeness, consistency, and timeliness of data. [Source: Ibid]
    * **Data Cleansing:**  The process of identifying and correcting errors in data. [Source: Ibid]
    * **Data Enrichment:**  The process of adding information to existing data to make it more valuable for analysis. [Source: Ibid]
    * **Data Catalog:** A centralized repository that provides metadata (information about data) for all data assets within an organization. [Source: Ibid]
    * **Data Governance Framework:** A set of policies, procedures, and standards that guide how data is managed and used within an organization. [Source: Ibid]
    * **Data Privacy:**  The legal and ethical principles that govern the collection, use, and disclosure of personal information. [Source: Ibid]
    * **Data Security Best Practices:**  Recommended guidelines and procedures for protecting data from unauthorized access, use, disclosure, disruption, modification, or destruction. [Source: Ibid]
    * **Data-Driven Decision-Making:**  The process of using data to inform business decisions, rather than intuition or guesswork. [Source: Ibid]
    * **Data-as-a-Service (DaaS):** A model where data is provided as a service over the internet. [Source: Ibid]
    * **Data Science:**  A multidisciplinary field that uses scientific methods, processes, algorithms, and systems to extract knowledge and insights from structured and unstructured data. [Source: Ibid]
    * **Data Engineering:** The process of building and maintaining the infrastructure that supports data pipelines, data warehouses, and other data systems. [Source: Ibid]
    * **Data Analyst:**  A professional who analyzes data to identify patterns, trends, and insights. [Source: Ibid]
    * **Data Scientist:**  A professional who uses data science methods to extract knowledge and insights from data. [Source: Ibid] 
    * **Business Analyst:** A professional who helps organizations improve their business processes and systems. [Source: Ibid]

* **References:**  

    1.  [https://www.sas.com/en_us/insights/analytics/business-intelligence.html](https://www.sas.com/en_us/insights/analytics/business-intelligence.html)
    2.  [https://www.ibm.com/cloud/learn/data-warehouse](https://www.ibm.com/cloud/learn/data-warehouse)
    3.  [https://en.wikipedia.org/wiki/Declarative_programming](https://en.wikipedia.org/wiki/Declarative_programming)
    4.  [https://en.wikipedia.org/wiki/SQL](https://en.wikipedia.org/wiki/SQL)
    5.  [https://www.dbtlabs.com/](https://www.dbtlabs.com/)
    6.  [https://www.tableau.com/](https://www.tableau.com/)
    7.  [https://powerbi.microsoft.com/en-us/](https://powerbi.microsoft.com/en-us/)
    8.  [https://www.unrealengine.com/en-US/](https://www.unrealengine.com/en-US/)
    9.  [https://www.dbtlabs.com/](https://www.dbtlabs.com/)
    10. [https://cube.js/](https://cube.js/)
    11. [https://www.gartner.com/en/newsroom/press-releases/2023-02-13-gartner-predicts-data-and-analytics-to-be-a-key-factor-in-business-strategy-through-2026](https://www.gartner.com/en/newsroom/press-releases/2023-02-13-gartner-predicts-data-and-analytics-to-be-a-key-factor-in-business-strategy-through-2026) 
    12. [https://www.gartner.com/en/newsroom/press-releases/2022-10-25-gartner-predicts-that-by-2025-more-than-50-percent-of-organizations-will-have-a-dedicated-chief-data-officer](https://www.gartner.com/en/newsroom/press-releases/2022-10-25-gartner-predicts-that-by-2025-more-than-50-percent-of-organizations-will-have-a-dedicated-chief-data-officer)
    13. [https://www.forbes.com/sites/bernardmarr/2022/02/16/the-future-of-business-intelligence-is-about-democratization/](https://www.forbes.com/sites/bernardmarr/2022/02/16/the-future-of-business-intelligence-is-about-democratization/)
    14. [https://www.forbes.com/sites/bernardmarr/2023/03/15/ai-and-machine-learning-are-transforming-business-intelligence/](https://www.forbes.com/sites/bernardmarr/2023/03/15/ai-and-machine-learning-are-transforming-business-intelligence/)



