AgentMessage shows one turn in a conversation with an agent: user, agent or system.

**Consumer provides:** `role`, `children`, and optional `author`, `time`, `streaming`.

- The user bubble is `accent-soft` on the right. The agent bubble is `surface` on the left with the agent avatar.
- Put `ToolCall` items inside the agent bubble, after the text that explains them.
- Use `role="system"` for run events: "Run paused: waiting for approval".
- Set `streaming` while tokens arrive. A caret blinks at the end.
