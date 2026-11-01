import { match, P } from 'ts-pattern';
import { ArrowDownRight, ArrowUpRight, Minus } from 'lucide-react';
import { cx } from '../lib/cx';
import { LinearScale, PointScale } from '../lib/scale';

export interface StatTileProps {
  label: string;
  value: string;
  delta?: number;
  deltaLabel?: string;
  goodWhen?: 'up' | 'down';
  trend?: number[];
}

const SPARK_W = 96;
const SPARK_H = 32;

function Sparkline({ values }: { values: number[] }) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const y = new LinearScale([min, max === min ? min + 1 : max], [SPARK_H - 3, 3]);
  const x = new PointScale(values.length, [2, SPARK_W - 4]);
  const d = values.map((v, i) => `${i ? 'L' : 'M'}${x.map(i)},${y.map(v)}`).join(' ');
  const last = values.length - 1;
  return (
    <svg className="lm-spark" width={SPARK_W} height={SPARK_H} aria-hidden>
      <path d={d} />
      <circle cx={x.map(last)} cy={y.map(values[last]!)} r={3} />
    </svg>
  );
}

export function StatTile({ label, value, delta, deltaLabel, goodWhen = 'up', trend }: StatTileProps) {
  const direction = match(delta)
    .with(P.nullish, () => null)
    .with(P.number.positive(), () => 'up' as const)
    .with(P.number.negative(), () => 'down' as const)
    .otherwise(() => 'flat' as const);
  const tone = direction == null || direction === 'flat' ? 'neutral' : direction === goodWhen ? 'success' : 'danger';
  const Icon = match(direction).with('up', () => ArrowUpRight).with('down', () => ArrowDownRight).otherwise(() => Minus);

  return (
    <div className="lm-stat">
      <p className="lm-stat__label">{label}</p>
      <div className="lm-stat__row">
        <p className="lm-stat__value lm-num">{value}</p>
        {trend && trend.length > 1 && <Sparkline values={trend} />}
      </div>
      {delta != null && (
        <p className={cx('lm-stat__delta', `lm-text--${tone}`)}>
          <Icon size={14} aria-hidden />
          <span className="lm-num">{delta > 0 ? '+' : ''}{delta}%</span>
          {deltaLabel && <span className="lm-stat__vs">{deltaLabel}</span>}
        </p>
      )}
    </div>
  );
}
