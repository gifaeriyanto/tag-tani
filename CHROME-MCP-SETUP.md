# Chrome MCP Setup for Tag Tani

**Model Context Protocol Integration for Chrome DevTools**

Enable Claude Code to access and verify your live development server in Chrome.

---

## Overview

By adding Chrome MCP (Model Context Protocol) to Claude Code, I can:

- ✅ **Visit your development server** (`http://localhost:3000`)
- ✅ **Take screenshots** of pages you're building
- ✅ **Inspect the DOM** and check HTML structure
- ✅ **Execute JavaScript** to verify functionality
- ✅ **Debug issues** by analyzing rendered output
- ✅ **Verify styling** (CSS, layout, colors)
- ✅ **Test interactions** and form submissions
- ✅ **Check responsive design** across different viewports

**Result**: I can immediately see what you're working on and fix issues in real-time! 🎯

---

## What is Chrome MCP?

**Model Context Protocol (MCP)** is an open standard that lets Claude Code connect to external tools and services. The **Chrome DevTools MCP** server specifically gives Claude Code access to a Chrome browser instance for:

- Rendering and inspecting web pages
- Executing JavaScript
- Taking screenshots
- Analyzing DOM structure
- Testing user interactions

---

## Prerequisites

### Required
- Node.js >= 18 (for npx commands)
- Google Chrome browser installed
- Claude Code CLI installed

### Good to have
- Development server running (`pnpm dev`)
- Basic understanding of Chrome DevTools

---

## Setup Methods

### Method 1: Using CLI (Recommended for Simplicity)

**Step 1**: Run the CLI command
```bash
claude mcp add --transport stdio chrome-devtools -- npx -y @modelcontextprotocol/server-chrome-devtools
```

**Step 2**: Restart Claude Code
```bash
# Exit current Claude Code session
# Start new session
claude
```

**Step 3**: Verify it's working
Inside a Claude Code session, type:
```bash
/mcp
```

You should see `chrome-devtools` listed with status "Connected"

---

### Method 2: Manual Configuration (More Control)

**Step 1**: Find your config file location

**macOS:**
```bash
~/.config/claude/claude_desktop_config.json
```

**Windows:**
```bash
%APPDATA%\Claude\claude_desktop_config.json
```

**Linux:**
```bash
~/.config/claude/claude_desktop_config.json
```

**Step 2**: Add Chrome DevTools MCP to config

Open the config file and add to `mcpServers` section:

```json
{
  "mcpServers": {
    "chrome-devtools": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-chrome-devtools"]
    }
  }
}
```

**Step 3**: Save and restart Claude Code

---

### Method 3: Enable Chrome Remote Debugging (Manual Control)

If you want more control over the Chrome instance:

**macOS:**
```bash
open -a "Google Chrome" --args --remote-debugging-port=9222 --user-data-dir="/tmp/chrome-debug"
```

**Windows (PowerShell):**
```powershell
& "C:\Program Files\Google\Chrome\Application\chrome.exe" --remote-debugging-port=9222 --user-data-dir="C:\tmp\chrome-debug"
```

**Linux:**
```bash
google-chrome --remote-debugging-port=9222 --user-data-dir="/tmp/chrome-debug"
```

Then configure Claude Code to connect to port 9222.

---

## Verification

### Check if Chrome MCP is Connected

In a Claude Code session:

```bash
/mcp
```

Expected output:
```
Connected MCP Servers:
✓ chrome-devtools - Connected
```

### Test Chrome MCP Access

Ask Claude Code:
> Take a screenshot of http://localhost:3000

If successful, you'll get a screenshot of your development server! 📸

---

## How to Use in Development Workflow

### Example 1: Verify a Page You Built

```
You: Build the Penyuluh list page with cards showing advisor details

Claude Code:
  1. Creates page.tsx (server component)
  2. Creates loading.tsx (skeleton)
  3. Creates PenyuluhListClient.tsx (interactive client)
  4. Builds components

You: Can you verify it looks correct?

Claude Code (with Chrome MCP):
  1. Opens http://localhost:3000/penyuluh in Chrome
  2. Takes screenshot
  3. Analyzes the rendered output
  4. Checks if it matches your requirements
  5. Suggests improvements if needed
```

### Example 2: Debug a Styling Issue

```
You: The cards don't look right, the spacing seems off

Claude Code (with Chrome MCP):
  1. Inspects the DOM
  2. Analyzes applied CSS classes
  3. Takes screenshot to compare with design system
  4. Identifies the issue
  5. Fixes the Tailwind classes
  6. Verifies fix with new screenshot
```

### Example 3: Test Form Submission

```
You: Does the farmer creation form work correctly?

Claude Code (with Chrome MCP):
  1. Navigates to form page
  2. Fills in form fields
  3. Submits the form
  4. Checks result
  5. Verifies success message or error handling
```

---

## Chrome MCP Tools Available

Once connected, Chrome MCP provides these capabilities:

### Navigation
- `navigate` - Go to URL
- `screenshot` - Take screenshot of current page
- `go_back` / `go_forward` - Navigate history

### DOM Inspection
- `find_element` - Search for elements by selector
- `get_element_properties` - Inspect element properties
- `get_accessibility_tree` - Check accessibility structure

### JavaScript Execution
- `execute` - Run JavaScript code
- `evaluate_expression` - Evaluate JavaScript expression

### Form Interaction
- `type` - Type text in input fields
- `click` - Click elements
- `focus` - Focus elements

### Viewport Control
- `set_viewport` - Change window size for responsive testing

---

## Configuration for Tag Tani Project

Create `.claude/mcp.json` for project-specific MCP configuration:

```json
{
  "mcpServers": {
    "chrome-devtools": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-chrome-devtools"],
      "env": {
        "CHROME_DEBUG_PORT": "9222"
      }
    }
  }
}
```

This file can be committed to git so all team members get the same setup.

---

## Workflow Integration with RSC Pattern

### When Building New Pages

```typescript
// page.tsx (server component) - fetches data
export default async function PenyuluhPage() {
  const penyuluhList = PENYULUH_LIST;
  return <PenyuluhListClient initialData={penyuluhList} />;
}
```

**With Chrome MCP**:

```
You: Check if the page renders correctly

Claude Code (with Chrome MCP):
  1. Dev server runs: pnpm dev
  2. Chrome opens to http://localhost:3000/penyuluh
  3. Screenshots the rendered page
  4. Analyzes the DOM
  5. Verifies RSC pattern (server data + client interactivity)
  6. Checks if loading.tsx was shown during load
  7. Verifies styling matches design system
  8. Suggests improvements
```

---

## Tips & Best Practices

### ✅ DO

- ✅ Keep Chrome DevTools MCP enabled for development
- ✅ Ask Claude to verify pages after building
- ✅ Use screenshots to compare with design requirements
- ✅ Test responsive design with different viewports
- ✅ Verify forms work before moving to next feature

### ❌ DON'T

- ❌ Disable Chrome MCP in production (it's dev-only)
- ❌ Expect Chrome MCP to work without dev server running
- ❌ Use MCP for E2E testing (use Playwright instead)
- ❌ Rely solely on MCP screenshots (manual testing still needed)

---

## Common Issues & Solutions

### Issue: "Chrome not found" or "Cannot connect to Chrome"

**Solution**: Manually launch Chrome with debugging enabled:

**macOS:**
```bash
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --remote-debugging-port=9222
```

**Windows:**
```powershell
& "C:\Program Files\Google\Chrome\Application\chrome.exe" --remote-debugging-port=9222
```

**Linux:**
```bash
google-chrome --remote-debugging-port=9222 &
```

Then start Claude Code in another terminal.

### Issue: "MCP server not available"

**Solution**: Restart Claude Code after configuration:
```bash
# Exit current session (Ctrl+C)
# Start new session
claude
```

### Issue: Dev server not accessible

**Make sure your dev server is running:**
```bash
pnpm dev
# Should show: Local: http://localhost:3000
```

---

## Integration with Claude Code Setup

### Updated Workflow for Tag Tani

When you ask me to build a new page:

```
1. You provide clarifying answers:
   ✓ Feature/page name
   ✓ Data structure
   ✓ UI patterns
   ✓ Scope (CRUD)
   ✓ RSC architecture

2. I build the pages:
   ✓ page.tsx (server, fetches data)
   ✓ loading.tsx (skeleton)
   ✓ *Client.tsx (interactive)

3. (NEW WITH CHROME MCP) I verify visually:
   ✓ Take screenshots
   ✓ Check DOM structure
   ✓ Verify styling
   ✓ Test interactions
   ✓ Confirm matches requirements

4. You get:
   ✓ Working code
   ✓ Visual verification
   ✓ Screenshots of result
   ✓ Confidence it works ✨
```

---

## Next Steps

### 1. Install Chrome MCP Now

**Option A (CLI - Easiest):**
```bash
claude mcp add --transport stdio chrome-devtools -- npx -y @modelcontextprotocol/server-chrome-devtools
```

**Option B (Manual Config):**
Edit your config file and add Chrome DevTools MCP to `mcpServers`

### 2. Restart Claude Code

```bash
# Exit current session
# Start new session to load MCP
claude
```

### 3. Verify Installation

In Claude Code:
```bash
/mcp
```

Should show `chrome-devtools` as Connected.

### 4. Test It

Ask me to take a screenshot:
> Take a screenshot of http://localhost:3000

### 5. Update Documentation

Commit this file to git:
```bash
git add CHROME-MCP-SETUP.md
git commit -m "docs: Add Chrome MCP setup guide"
```

---

## Why Chrome MCP Matters for Tag Tani

Without Chrome MCP:
- I build code blindly
- No visual verification
- Styling issues discovered late
- Time wasted debugging

With Chrome MCP:
- ✅ Real-time visual feedback
- ✅ Immediate issue detection
- ✅ Confident implementation
- ✅ Better user experience
- ✅ Faster iteration

---

## Resources

### Official Documentation
- [Claude Code MCP Documentation](https://docs.claude.com/en/docs/claude-code/mcp)
- [Chrome DevTools MCP GitHub](https://github.com/ChromeDevTools/chrome-devtools-mcp)
- [Model Context Protocol](https://modelcontextprotocol.io/)

### Related
- [Chrome DevTools Protocol Documentation](https://chromedevtools.github.io/devtools-protocol/)
- [Claude Code Documentation](https://docs.claude.com/en/docs/claude-code/)

---

## Summary

**Chrome MCP enables**:
- Real-time visual feedback
- DOM inspection
- JavaScript execution
- Screenshot verification
- Interactive testing

**For Tag Tani development**, this means:
- Build pages with confidence
- Verify styling immediately
- Test interactions in real browser
- Catch issues early
- Deliver quality features faster

**Setup is simple**:
```bash
# One command to enable Chrome MCP
claude mcp add --transport stdio chrome-devtools -- npx -y @modelcontextprotocol/server-chrome-devtools

# Restart Claude Code
# Done! ✨
```

Ready to build Tag Tani with visual feedback! 🚀
