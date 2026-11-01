import { motion } from 'framer-motion';
import { cx } from '../lib/cx';
import { MotionPreset } from '../lib/motion';
import type { Tone } from '../lib/status';

export interface ProgressProps {
  value: number;
  label?: string;
  showValue?: boolean;
  tone?: Extract<Tone, 'accent' | 'success' | 'warning' | 'danger'>;
  size?: 'sm' | 'md';
}

export function Progress({ value, label, showValue = true, tone = 'accent', size = 'md' }: ProgressProps) {
  const pct = Math.min(100, Math.max(0, value));
  return (
    <div className={cx('lm-progress', `lm-progress--${size}`)}>
      {(label || showValue) && (
        <div className="lm-progress__meta">
          {label && <span>{label}</span>}
          {showValue && <span className="lm-num">{Math.round(pct)}%</span>}
        </div>
      )}
      <div className="lm-progress__track" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label={label}>
        <motion.div
          className={cx('lm-progress__fill', `lm-fill--${tone}`)}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={MotionPreset.gentle}
        />
      </div>
    </div>
  );
}
