# LookerHelp Development Environment Setup

This README outlines the setup process for the LookerHelp development environment, including Aider, its VS Code plugin, and the Claude extension.

## Prerequisites

- Python (latest version)
- Visual Studio Code
- OpenAI API key or Anthropic API key (depending on your chosen AI model)

## Installation Steps

1. Install the latest Python version

2. Install Aider:
   ```
   python3 -m pip install aider-install --break-system-packages
   aider-install
   ```

3. Install Playwright (optional):
   ```
   playwright install --with-deps chromium
   ```

4. Install VS Code Extensions:
   - [Aider for VS Code](https://marketplace.visualstudio.com/items?itemName=Apertia.vscode-aider)
   - [Claude Dev](https://marketplace.visualstudio.com/items?itemName=saoudrizwan.claude-dev)

5. Configure .env file:
   - Location: `/Users/dionedge/dev/lookerhelp/.env`
   - Add the following:
     ```
     #Aider
     AIDER_MODEL=gemini/gemini-2.0-flash-exp
     ```

6. Ensure .env is in .gitignore:
   - The .gitignore file should include `.env` to prevent committing sensitive information.

## Usage

### Aider CLI

1. Change to your project directory:
   ```
   cd /to/your/project
   ```

2. Run Aider with Claude 3.5 Sonnet:
   ```
   aider --model sonnet --anthropic-api-key your-key-goes-here
   ```

3. Run Aider with GPT-4:
   ```
   aider --model gpt-4o --openai-api-key your-key-goes-here
   ```

### Aider VS Code Extension

- Start Aider: Use the command palette (Ctrl+Shift+P) and search for "Aider: Open"
- Select AI Model: Use "Aider: Select Model" command
- Access Menu: Click the Aider status bar item or use the command palette
- Refactor/Modify Code: Select code, right-click, and use Aider options
- Manage Files: Use the explorer context menu to add or ignore files in Aider
- Generate README: Use "Aider: Generate README.md" command

## Features

- AI-Powered Coding Assistance
- Automatic File Synchronization
- Multiple AI Model Support
- Code Refactoring and Modification
- README Generation
- Custom Startup Arguments
- File Management
- Intuitive Menu System
- Error Fixing
- Default Model Selection
- Custom Model Integration

## Notes

- Run Aider inside a VS Code terminal window for best integration
- Keep your .env file secure and out of version control
- Update .env.example if you make changes to .env structure

For more detailed information on each tool, refer to their respective documentation.
