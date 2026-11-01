import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { match } from 'ts-pattern';
import { Loader } from 'lucide-react';
import { cx } from '../lib/cx';
import { MotionPreset } from '../lib/motion';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  leading?: ReactNode;
  trailing?: ReactNode;
  loading?: boolean;
}

const sizeClass = (size: ButtonSize) =>
  match(size)
    .with('sm', () => 'lm-btn--sm')
    .with('md', () => 'lm-btn--md')
    .with('lg', () => 'lm-btn--lg')
    .with('icon', () => 'lm-btn--icon')
    .exhaustive();

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'secondary', size = 'md', leading, trailing, loading = false, disabled, className, children, ...rest },
  ref,
) {
  const inert = disabled || loading;
  return (
    <motion.button
      ref={ref}
      type="button"
      {...rest}
      disabled={inert}
      aria-busy={loading || undefined}
      whileTap={inert ? undefined : MotionPreset.press}
      transition={MotionPreset.snappy}
      className={cx('lm-btn', `lm-btn--${variant}`, sizeClass(size), className)}
    >
      {loading ? <Loader className="lm-spin" size={16} aria-hidden /> : leading}
      {children != null && <span className="lm-btn__label">{children}</span>}
      {trailing}
    </motion.button>
  );
});
