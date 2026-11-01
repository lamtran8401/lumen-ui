Input takes one line of text with a label, a hint and an error.

**Consumer provides:** `label`, native input props, and optional `hint`, `error`, `leading`, `trailing`.

- Always give a `label`. A placeholder is an example, not a label.
- Write the error as the fix: "Budget must be 2,000 tokens or more."
- The 1px outline uses `control-border` (3:1). Focus adds a `focus` ring with an `accent-soft` halo.
