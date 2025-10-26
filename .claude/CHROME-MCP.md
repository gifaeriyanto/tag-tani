# Chrome MCP Quick Reference

**Quick reference for using Chrome MCP in Claude Code conversations**

---

## What is Chrome MCP?

Allows Claude Code to **see and interact with your running development server** in Chrome.

### What it can do:
- 📸 Take screenshots of pages
- 🔍 Inspect DOM and elements
- ⌨️ Fill forms and click buttons
- 📱 Test responsive design
- 🐛 Debug styling and layout issues

---

## Setup (One-time)

```bash
# Install Chrome MCP
claude mcp add --transport stdio chrome-devtools -- npx -y @modelcontextprotocol/server-chrome-devtools

# Restart Claude Code
# That's it! ✅
```

## Verify it's working

In a Claude Code session, type:
```bash
/mcp
```

You should see: ✓ chrome-devtools - Connected

---

## How to Use in Conversations

### Take a Screenshot
```
You: Take a screenshot of http://localhost:3000/kelompok-tani
Claude Code: Opens the page in Chrome and shows you a screenshot
```

### Test a Form
```
You: Test the farmer creation form - fill in all fields and submit
Claude Code:
  1. Navigates to the form
  2. Fills in each field
  3. Submits the form
  4. Shows result
```

### Check Styling
```
You: Does the dashboard look correct? Check if the cards are properly spaced
Claude Code:
  1. Takes screenshot
  2. Inspects CSS classes
  3. Verifies spacing matches design system
  4. Shows any issues
```

### Verify After Building
```
You: Build the Penyuluh list page and verify it looks correct

Claude Code:
  1. Creates page.tsx, loading.tsx, *Client.tsx
  2. Dev server renders it
  3. Takes screenshot
  4. Verifies styling
  5. Confirms it matches requirements ✅
```

---

## Common Requests

| Request | What it does |
|---------|-------------|
| `Take a screenshot of [URL]` | Shows visual output |
| `Check if [URL] is responsive` | Tests different viewports |
| `Does the form submit work?` | Tests form functionality |
| `Verify the styling looks correct` | Inspects CSS and layout |
| `Check the table data rendering` | Analyzes data display |
| `Test the search filter` | Interacts with search |

---

## Pro Tips

✨ **Always run dev server first**
```bash
pnpm dev
# Chrome MCP needs your app running
```

✨ **Use Chrome MCP to verify after building**
```
You: Build [feature] and verify it looks correct

Claude Code:
  → Builds feature
  → Takes screenshots
  → Confirms it works ✅
```

✨ **For responsive testing**
```
You: Check if the dashboard is mobile responsive (320px viewport)

Claude Code:
  → Sets viewport to 320px
  → Takes screenshot
  → Shows mobile layout
```

✨ **For debugging styling**
```
You: The cards look misaligned. Check the Tailwind classes

Claude Code:
  → Inspects DOM
  → Shows applied classes
  → Identifies issues
  → Fixes CSS
  → Verifies with screenshot ✅
```

---

## Important Notes

⚠️ **Dev server must be running**
```bash
# In one terminal:
pnpm dev

# In another terminal:
claude  # Start Claude Code
```

⚠️ **Chrome must be installed**
Chrome MCP requires Google Chrome (not Edge or Firefox)

⚠️ **Local development only**
Chrome MCP works with localhost URLs (like http://localhost:3000)

---

## If it's not working

### Check MCP is connected
```bash
/mcp
```

### Verify dev server is running
```bash
pnpm dev
# Should show: Local: http://localhost:3000
```

### Restart Claude Code
```bash
# Exit and restart Claude Code session
```

### Manually enable Chrome debugging
```bash
# macOS
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --remote-debugging-port=9222

# Then try Chrome MCP commands again
```

---

## Example Workflow

```
1. You ask for a feature:
   "Build the Komoditi (Commodity) list page"

2. Claude Code builds it:
   - page.tsx (server, fetches data)
   - loading.tsx (skeleton UI)
   - KomoditiListClient.tsx (interactive)
   - KomoditiCard component

3. You ask to verify:
   "Verify it looks correct"

4. Claude Code (with Chrome MCP):
   - Dev server renders page
   - Takes screenshot
   - Inspects DOM
   - Checks styling
   - Verifies layout ✅
   - Reports "Looks great!"

5. You see the screenshot
   - Confirms it matches requirements
   - Ready to commit! 🎉
```

---

## Commands You Can Give

### Visual Verification
- "Take a screenshot of [URL]"
- "Does [page] look correct?"
- "Verify the styling matches the design system"

### Interaction Testing
- "Test the search filter"
- "Does the form submit work?"
- "Try the create button and fill in the form"

### Responsive Testing
- "Check mobile layout (320px)"
- "Test tablet responsive design"
- "Verify desktop layout (1920px)"

### Debugging
- "Check why the cards look misaligned"
- "Inspect the DOM for [element]"
- "Verify the classes are applied correctly"

### Combination
- "Build [feature], then verify it looks correct and test the interactions"

---

## That's it! 🚀

Chrome MCP is now ready to use. In your next conversation:

1. Ask to build a page
2. Ask to verify it looks correct
3. I'll take screenshots and show you the result

Enjoy real-time visual feedback! 📸✨
