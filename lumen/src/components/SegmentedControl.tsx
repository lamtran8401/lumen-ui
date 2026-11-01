import { useId, useState } from 'react';
import { motion } from 'framer-motion';
import { cx } from '../lib/cx';
import { MotionPreset } from '../lib/motion';

export interface SegmentOption {
  value: string;
  label: string;
}

export interface SegmentedControlProps {
  options: SegmentOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  size?: 'sm' | 'md';
  'aria-label'?: string;
}

export function SegmentedControl({ options, value, defaultValue, onChange, size = 'md', ...aria }: SegmentedControlProps) {
  const [inner, setInner] = useState(defaultValue ?? options[0]?.value);
  const current = value ?? inner;
  const layoutId = useId();

  const select = (next: string) => {
    setInner(next);
    onChange?.(next);
  };

  return (
    <div role="tablist" aria-label={aria['aria-label']} className={cx('lm-seg', `lm-seg--${size}`)}>
      {options.map((option) => {
        const selected = option.value === current;
        return (
          <button
            key={option.value}
            type="button"
            role="tab"
            aria-selected={selected}
            className={cx('lm-seg__item', selected && 'is-selected')}
            onClick={() => select(option.value)}
          >
            {selected && <motion.span layoutId={layoutId} className="lm-seg__thumb" transition={MotionPreset.snappy} />}
            <span className="lm-seg__label">{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}
