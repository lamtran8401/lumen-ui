import type { HTMLAttributes, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cx } from '../lib/cx';
import { MotionPreset } from '../lib/motion';

export type CardVariant = 'solid' | 'glass' | 'inset';

export interface CardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title' | 'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart'> {
  variant?: CardVariant;
  title?: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  animateIn?: boolean;
}

export function Card({ variant = 'solid', title, description, actions, padding = 'md', animateIn = false, className, children, ...rest }: CardProps) {
  const hasHeader = title != null || description != null || actions != null;
  return (
    <motion.section
      {...(animateIn ? MotionPreset.enter() : {})}
      {...rest}
      className={cx('lm-card', `lm-card--${variant}`, `lm-pad--${padding}`, className)}
    >
      {hasHeader && (
        <header className="lm-card__header">
          <div className="lm-card__titles">
            {title != null && <h3 className="lm-card__title">{title}</h3>}
            {description != null && <p className="lm-card__desc">{description}</p>}
          </div>
          {actions != null && <div className="lm-card__actions">{actions}</div>}
        </header>
      )}
      {children}
    </motion.section>
  );
}
