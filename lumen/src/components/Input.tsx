import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from 'react';
import { cx } from '../lib/cx';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
  leading?: ReactNode;
  trailing?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, hint, error, leading, trailing, className, id, ...rest },
  ref,
) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const noteId = `${inputId}-note`;
  const note = error ?? hint;
  return (
    <div className={cx('lm-field', error && 'is-invalid', className)}>
      {label && <label htmlFor={inputId} className="lm-field__label">{label}</label>}
      <div className="lm-input">
        {leading && <span className="lm-input__adorn">{leading}</span>}
        <input ref={ref} id={inputId} aria-invalid={!!error || undefined} aria-describedby={note ? noteId : undefined} {...rest} />
        {trailing && <span className="lm-input__adorn">{trailing}</span>}
      </div>
      {note && <p id={noteId} className="lm-field__note">{note}</p>}
    </div>
  );
});
