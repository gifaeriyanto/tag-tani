#!/usr/bin/env node

/**
 * SessionStart Hook for Tag Tani Project
 * Provides context and asks clarifying questions at the start of each session
 *
 * This hook runs automatically when a new Claude Code session starts
 * It provides project context and guides the user with clarifying questions
 */

const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

/**
 * Get git status
 */
function getGitStatus() {
  try {
    const output = execSync('git status --short', {
      encoding: 'utf-8',
      timeout: 5000,
    }).trim();
    return output || 'No uncommitted changes';
  } catch (error) {
    return 'Unable to get git status';
  }
}

/**
 * Get recent commit history
 */
function getRecentCommits() {
  try {
    const output = execSync('git log --oneline -5', {
      encoding: 'utf-8',
      timeout: 5000,
    }).trim();
    return output || 'No commits found';
  } catch (error) {
    return 'Unable to get commit history';
  }
}

/**
 * Get current git branch
 */
function getCurrentBranch() {
  try {
    const output = execSync('git rev-parse --abbrev-ref HEAD', {
      encoding: 'utf-8',
      timeout: 5000,
    }).trim();
    return output || 'unknown';
  } catch (error) {
    return 'unknown';
  }
}

/**
 * Main function to run the hook
 */
function main() {
  // Read hook input from stdin
  let hookInput = {};
  try {
    const stdinData = fs.readFileSync(0, 'utf-8');
    if (stdinData) {
      hookInput = JSON.parse(stdinData);
    }
  } catch (error) {
    // If no input or invalid JSON, continue with empty object
  }

  // Gather project context
  const gitBranch = getCurrentBranch();
  const gitStatus = getGitStatus();
  const recentCommits = getRecentCommits();

  // Build context message with clarifying questions
  const context = `
═══════════════════════════════════════════════════════════════
TAG TANI PROJECT - SESSION START
═══════════════════════════════════════════════════════════════

📋 Project Type: Agricultural Management System (Next.js + React)
🌾 Focus: Farmer Groups (Kelompok Tani), Farmers, Lands, Commodities
📍 Language: Indonesian
⚙️ Tech: Next.js 15, React 19, TypeScript, Tailwind CSS v4, Radix UI

─────────────────────────────────────────────────────────────

GIT STATUS:
Branch: ${gitBranch}
Status: ${gitStatus}

Recent Commits:
${recentCommits}

─────────────────────────────────────────────────────────────

BEFORE YOU START - CLARIFY YOUR TASK:

1️⃣  WHAT ARE YOU BUILDING?
   • Which page/feature? (Penyuluh, Komoditi, Bantuan Petani, or new?)
   • New CRUD pages, form updates, or UI refinement?
   • What's the business requirement?

2️⃣  DATA & STRUCTURE
   • What fields/properties for the new entity?
   • Any relationships to existing data? (Kelompok Tani, Petani, Lahan?)
   • Mock data structure needed?
   • Do you have the interface/type definition?

3️⃣  UI/UX PATTERNS
   • Follow existing patterns? (cards, forms, maps, etc.?)
   • Any specific visualizations or charts?
   • Mobile responsive required?
   • Copy from existing pages (Kelompok Tani, Petani, Lahan)?

4️⃣  SCOPE & APPROACH
   • Full page implementation or just components?
   • Create, Read, Update, Delete (CRUD) operations?
   • Any special features? (uploads, filtering, export, maps?)

5️⃣  CONSISTENCY CHECK
   • Read /CLAUDE.md for:
     - Code patterns and conventions
     - Design system and colors
     - Existing component examples
     - Data structures
     - File locations

─────────────────────────────────────────────────────────────

⚡ QUICK ACTIONS:
• Review CLAUDE.md for full project context
• Check existing pages: /app/kelompok-tani, /app/lahan
• Reference components in /components/
• Use mock data patterns from /constants/

📚 KEY FILE PATHS:
• Main layout: /app/layout.tsx (Sidebar, Header included)
• Farmer form: /components/KelompokTaniForm/KelompokTaniForm.tsx
• Land map: /components/LahanMap/LahanMapClient.tsx
• Mock data: /constants/kelompokTani.ts, /constants/petani.ts

═══════════════════════════════════════════════════════════════

Ready to help! Just answer the questions above, and I'll:
✅ Understand your requirements
✅ Follow existing code patterns
✅ Keep consistency with current UI/UX
✅ Build with best practices

Let's build something great! 🚀
`;

  // Output with exit code 0 to add to context
  console.log(context);
  process.exit(0);
}

// Run the hook
main();
