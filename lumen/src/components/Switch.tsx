import { useId, useState } from 'react';
import { motion } from 'framer-motion';
import { cx } from '../lib/cx';
import { MotionPreset } from '../lib/motion';

export interface SwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
}

export function Switch({ checked, defaultChecked = false, onChange, label, description, disabled }: SwitchProps) {
  const [inner, setInner] = useState(defaultChecked);
  const on = checked ?? inner;
  const id = useId();

  const toggle = () => {
    setInner(!on);
    onChange?.(!on);
  };

  return (
    <div className={cx('lm-switch-row', disabled && 'is-disabled')}>
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={on}
        disabled={disabled}
        onClick={toggle}
        className={cx('lm-switch', on && 'is-on')}
      >
        <motion.span className="lm-switch__knob" layout transition={MotionPreset.snappy} />
      </button>
      {(label || description) && (
        <label htmlFor={id} className="lm-switch-row__text">
          {label && <span className="lm-switch-row__label">{label}</span>}
          {description && <span className="lm-switch-row__desc">{description}</span>}
        </label>
      )}
    </div>
  );
}
