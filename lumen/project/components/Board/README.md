Board lays out task columns; cards animate to their new column when their status changes.

**Consumer provides:** `columns` (`{ id, title, tasks, limit? }[]`) and optional `onOpenTask`.

- Set `limit` for a WIP limit. The count turns `danger` when the column is over its limit.
- Keep the task `id` stable. The move animation uses it.
- The board scrolls sideways below 4 × 232px.
