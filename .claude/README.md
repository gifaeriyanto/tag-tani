# Claude Code Configuration for Tag Tani

This directory contains Claude Code configuration files for the Tag Tani project.

## Files

### `.claude/settings.json`
Configures hooks that run at specific points in Claude Code's lifecycle.

**Current Hooks:**
- `SessionStart`: Runs when a new Claude Code session begins
  - Displays project context
  - Shows clarifying questions
  - Lists key file locations
  - Checks git status

### `.claude/hooks/session-start.js`
JavaScript hook that executes on session start.

**What it does:**
- Displays project overview (tech stack, focus)
- Shows current git branch and recent commits
- Asks clarifying questions before you start work
- Provides quick action links and file paths
- Ensures consistency with existing code patterns

## How Hooks Work

Hooks are user-defined shell commands that execute at various points in Claude Code's lifecycle. The SessionStart hook:

1. Automatically runs when you start a new Claude Code session
2. Reads project context (git status, commits)
3. Outputs helpful information and questions
4. Guides you to answer clarifying questions before implementing

## Supported Hook Events

- **SessionStart**: When session starts or resumes (currently configured)
- **SessionEnd**: When session ends
- **PreToolUse**: Before tool execution (can block)
- **PostToolUse**: After tool completes
- **UserPromptSubmit**: Before prompt processing (can ask clarifying questions)
- **Notification**: On system events
- **Stop**: When agent finishes
- **SubagentStop**: When subagent finishes

## Configuration Format

```json
{
  "hooks": [
    {
      "hookName": "EventName",
      "matcher": "*",
      "command": "executable or script"
    }
  ]
}
```

## Adding New Hooks

To add a new hook:

1. Create a script in `.claude/hooks/` (e.g., `my-hook.js`)
2. Make it executable
3. Add entry to `.claude/settings.json`:

```json
{
  "hookName": "EventName",
  "matcher": "*",
  "command": "node .claude/hooks/my-hook.js"
}
```

## Hook Input/Output

### Input (stdin)
Hooks receive JSON on stdin with event-specific data:
```json
{
  "session_id": "string",
  "cwd": "working/directory",
  "hook_event_name": "SessionStart"
}
```

### Output (stdout/exit code)
- **Exit 0**: Hook succeeds, stdout added to context
- **Exit 2**: Hook blocks action (event-specific behavior)
- **Other**: Non-blocking error

## Testing Hooks

To test a hook manually:
```bash
# Test session-start hook
echo '{}' | node .claude/hooks/session-start.js
```

## Related Files

- **CLAUDE.md**: Main project documentation for Claude Code
- **package.json**: Project dependencies and scripts
- **.gitignore**: Files to exclude from version control

## More Information

- [Claude Code Documentation](https://docs.claude.com/en/docs/claude-code/)
- [Hooks Guide](https://docs.claude.com/en/docs/claude-code/hooks-guide/)
- [Settings Guide](https://docs.claude.com/en/docs/claude-code/settings.md)
