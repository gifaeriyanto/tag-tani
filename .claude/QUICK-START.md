# Claude Code Quick Start

## What Just Happened?

You've set up Claude Code to automatically help you build Tag Tani with consistency and clarity.

---

## How to Use (Next Time You Start Claude Code)

### 1. Start a New Conversation
Just begin a new Claude Code session in your terminal

### 2. See the Magic ✨
The SessionStart hook will automatically display:
- Project overview (tech stack, focus)
- Git status (branch, recent commits)
- 5 clarifying questions

### 3. Answer the Questions
Provide clear answers to:
```
1️⃣  WHAT ARE YOU BUILDING?
2️⃣  DATA & STRUCTURE
3️⃣  UI/UX PATTERNS
4️⃣  SCOPE & APPROACH
5️⃣  CONSISTENCY CHECK
```

### 4. Claude Builds It
I will:
- ✅ Reference CLAUDE.md for context
- ✅ Follow existing code patterns
- ✅ Use the design system
- ✅ Maintain consistency
- ✅ Build with best practices

---

## Files You Need to Know

| File | Purpose |
|------|---------|
| `CLAUDE.md` | Full project context (auto-read) |
| `CLAUDE-SETUP.md` | Detailed setup explanation |
| `.claude/settings.json` | Hook configuration |
| `.claude/hooks/session-start.js` | Clarifying questions hook |
| `.claude/README.md` | Configuration guide |

---

## Example: Starting a New Feature

### You type:
> Build a new Penyuluh (Agricultural Advisors) page with list and create functionality

### SessionStart hook shows:
```
═══════════════════════════════════════════════════════════════
TAG TANI PROJECT - SESSION START

📋 Project Type: Agricultural Management System (Next.js + React)
...
1️⃣  WHAT ARE YOU BUILDING?
2️⃣  DATA & STRUCTURE
...
```

### You answer:
```
1️⃣  Building the Penyuluh (Agricultural Advisors) feature:
   - List all advisors with search
   - Create new advisor form
   - Edit advisor details

2️⃣  Data structure:
   - id, name, phone, email, specialization, phone
   - Relationship to Kelompok Tani
   - Mock data needed

3️⃣  UI patterns:
   - Follow Kelompok Tani pattern (card-based list)
   - Form similar to KelompokTaniForm
   - Mobile responsive

4️⃣  Full CRUD page implementation:
   - List view with cards
   - Create form
   - Edit form

5️⃣  Checked CLAUDE.md - understand patterns
```

### Claude builds it ✅
- Uses existing patterns from Kelompok Tani
- Creates consistent forms
- Follows design system
- Adds mock data to constants
- Follows file structure
- Result: Consistent, high-quality code

---

## Key Commands

```bash
# Start Claude Code
claude

# Test the hook manually
echo '{}' | node .claude/hooks/session-start.js

# View project documentation
cat CLAUDE.md

# View setup details
cat CLAUDE-SETUP.md
```

---

## Golden Rules (For You & Claude)

✅ **Always** answer the 5 clarifying questions
✅ **Always** reference existing patterns
✅ **Always** keep consistency with current code
✅ **Always** use mock data first (ready for API swap)
✅ **Always** follow the design system
✅ **Commit** CLAUDE*.md and .claude/ to git

---

## Common Scenarios

### Building a New Page
1. Answer clarifying questions about the feature
2. Reference existing pages (Kelompok Tani, Petani, Lahan)
3. Use same component patterns
4. Add mock data to /constants/
5. Follow design system

### Fixing a Bug
1. Describe the issue clearly
2. Share file path if known
3. Include expected vs. actual behavior
4. Claude uses CLAUDE.md to understand context

### Updating Existing Code
1. Explain what you want to change
2. Reference the file/component
3. Clarify if it affects other pages
4. Claude ensures consistency

### Refactoring
1. Clarify the goal (performance, readability, etc.)
2. Specify which files/components
3. Claude keeps patterns consistent

---

## Pro Tips

💡 **Read CLAUDE.md first** - Understand the project structure before asking
💡 **Check existing pages** - Kelompok Tani, Petani, Lahan are great examples
💡 **Use component patterns** - Forms, cards, maps have established patterns
💡 **Reference file paths** - Makes requests more precise
💡 **Test locally** - Build and test before committing
💡 **Update CLAUDE.md** - Document new patterns as you add features

---

## Support

For questions about Claude Code:
- Check `.claude/README.md` for configuration details
- Read CLAUDE-SETUP.md for full explanation
- See official docs at https://docs.claude.com/en/docs/claude-code/

For project questions:
- Review CLAUDE.md (full documentation)
- Check existing pages and components
- Look at /constants/ for data patterns

---

## Ready?

You're all set! 🚀

Next time you start Claude Code, you'll see the SessionStart hook automatically guide you through clarifying questions, and I'll be ready to build consistently with your existing patterns.

**Let's build Tag Tani! 🌾**
