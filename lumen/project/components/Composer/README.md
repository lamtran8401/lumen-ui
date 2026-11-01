Composer is the glass prompt box for an agent; Enter sends and Shift+Enter adds a line.

**Consumer provides:** `onSubmit`, and optional `placeholder`, `busy`, `onStop`, `context`, `maxRows`.

- Put context chips (repo, model, files) in `context`.
- Set `busy` while the agent runs. The send button becomes a stop button.
- The composer is the one glass layer in a chat view.
