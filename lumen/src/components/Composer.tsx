import { useLayoutEffect, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import { ArrowUp, Paperclip, Square } from 'lucide-react';
import { Button } from './Button';

export interface ComposerProps {
  placeholder?: string;
  defaultValue?: string;
  busy?: boolean;
  context?: ReactNode;
  onSubmit?: (text: string) => void;
  onStop?: () => void;
  maxRows?: number;
}

const LINE_HEIGHT = 24;

export function Composer({ placeholder = 'Ask the agent…', defaultValue = '', busy = false, context, onSubmit, onStop, maxRows = 8 }: ComposerProps) {
  const [text, setText] = useState(defaultValue);
  const area = useRef<HTMLTextAreaElement>(null);

  // grow with the content up to maxRows, then scroll inside
  useLayoutEffect(() => {
    const el = area.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, LINE_HEIGHT * maxRows)}px`;
  }, [text, maxRows]);

  const submit = () => {
    const value = text.trim();
    if (!value || busy) return;
    onSubmit?.(value);
    setText('');
  };

  const onKey = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) {
      event.preventDefault();
      submit();
    }
  };

  return (
    <form className="lm-composer" onSubmit={(event) => { event.preventDefault(); submit(); }}>
      <textarea
        ref={area}
        rows={1}
        value={text}
        placeholder={placeholder}
        aria-label={placeholder}
        onChange={(event) => setText(event.target.value)}
        onKeyDown={onKey}
      />
      <div className="lm-composer__bar">
        <div className="lm-composer__context">
          <Button variant="ghost" size="icon" aria-label="Attach file"><Paperclip size={16} /></Button>
          {context}
        </div>
        {busy ? (
          <Button variant="secondary" size="icon" aria-label="Stop run" onClick={onStop}><Square size={14} fill="currentColor" /></Button>
        ) : (
          <Button type="submit" variant="primary" size="icon" aria-label="Send" disabled={!text.trim()}><ArrowUp size={16} /></Button>
        )}
      </div>
    </form>
  );
}
