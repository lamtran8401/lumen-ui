TaskCard shows one work item: ID, title, priority, status, owner and optional progress.

**Consumer provides:** `task` (`{ id, title, status?, priority?, assignee?, tags?, due?, progress? }`), optional `onOpen` and `compact`.

- The card validates `task` with zod. An invalid task renders an error line, not a blank card.
- Set `assignee.kind` to `agent` for agent-owned work.
- Hover raises the shadow from `shadow-ring` to `shadow-raised`. It does not move the card.
