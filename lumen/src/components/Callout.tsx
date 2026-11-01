import type { ReactNode } from 'react';
import { match } from 'ts-pattern';
import { Info, Lightbulb, TriangleAlert } from 'lucide-react';
import { cx } from '../lib/cx';

export type CalloutKind = 'in-short' | 'good-to-know' | 'watch-out';

export interface CalloutProps {
  kind: CalloutKind;
  title?: string;
  children: ReactNode;
}

const meta = (kind: CalloutKind) =>
  match(kind)
    .with('in-short', () => ({ title: 'In short', Icon: Info }))
    .with('good-to-know', () => ({ title: 'Good to know', Icon: Lightbulb }))
    .with('watch-out', () => ({ title: 'Watch out', Icon: TriangleAlert }))
    .exhaustive();

export function Callout({ kind, title, children }: CalloutProps) {
  const { title: fallback, Icon } = meta(kind);
  return (
    <aside className={cx('lm-callout', `lm-callout--${kind}`)}>
      <span className="lm-callout__icon"><Icon size={16} aria-hidden /></span>
      <div className="lm-callout__body">
        <p className="lm-callout__title">{title ?? fallback}</p>
        <div className="lm-callout__text">{children}</div>
      </div>
    </aside>
  );
}
