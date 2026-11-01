Button starts one action; use `primary` for the one main action in a view.

**Consumer provides:** `children` (a verb: "Start run"), `onClick`, and optional `variant`, `size`, `leading`, `trailing`, `loading`.

- Use one `primary` button in each view region. Use `secondary` for the others.
- Use `danger` only for an action that stops or deletes: "Stop agent", "Delete run".
- Use `size="icon"` with an `aria-label`. The icon button is a circle.
- Set `loading` while the action runs. The button keeps its width and blocks a second click.
- Do not add hover lift or scale. Hover changes the fill only. Press scales to 0.97.
