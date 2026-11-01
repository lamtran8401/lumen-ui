RunTimeline shows the ordered steps of one agent run and the state of each step.

**Consumer provides:** `steps` (`{ id, label, status, detail?, duration? }[]`) and optional `title`.

- One step at a time is `running`. It gets a soft accent halo.
- Steps are validated with zod. An invalid step is dropped with a console warning.
