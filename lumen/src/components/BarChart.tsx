import { useState } from 'react';
import { motion } from 'framer-motion';
import { DatumSchema, parseList, type Datum } from '../lib/schemas';
import { BandScale, LinearScale, formatNumber } from '../lib/scale';
import { MotionPreset } from '../lib/motion';
import { useWidth } from '../lib/useWidth';
import { ChartTooltip } from './ChartTooltip';

export interface BarChartProps {
  data: Datum[];
  title?: string;
  unit?: string;
  height?: number;
}

const PAD = { top: 12, right: 8, bottom: 28, left: 40 };
const END_RADIUS = 4;

// a bar anchored to the baseline: round the data end only
const barPath = (x: number, y: number, w: number, h: number) => {
  const r = Math.min(END_RADIUS, w / 2, h);
  return `M${x},${y + h} V${y + r} Q${x},${y} ${x + r},${y} H${x + w - r} Q${x + w},${y} ${x + w},${y + r} V${y + h} Z`;
};

export function BarChart({ data: input, title, unit = '', height = 220 }: BarChartProps) {
  const data = parseList(DatumSchema, input, 'BarChart.data');
  const [ref, width] = useWidth<HTMLDivElement>();
  const [hover, setHover] = useState<number | null>(null);

  const y = LinearScale.fromMax(Math.max(...data.map((d) => d.value), 0), [height - PAD.bottom, PAD.top]);
  const x = new BandScale(data.length, [PAD.left, width - PAD.right], 0.36);
  const active = hover != null ? data[hover] : undefined;

  return (
    <figure className="lm-chart" ref={ref}>
      {title && <figcaption className="lm-chart__title">{title}</figcaption>}
      <svg width={width} height={height} role="img" aria-label={title ?? 'Bar chart'} onMouseLeave={() => setHover(null)}>
        {y.ticks(4).map((tick) => (
          <g key={tick}>
            <line className="lm-chart__grid" x1={PAD.left} x2={width - PAD.right} y1={y.map(tick)} y2={y.map(tick)} />
            <text className="lm-chart__axis" x={PAD.left - 8} y={y.map(tick)} dy="0.32em" textAnchor="end">{formatNumber(tick)}</text>
          </g>
        ))}
        {data.map((d, i) => {
          const top = y.map(d.value);
          return (
            <g key={d.label} onMouseEnter={() => setHover(i)}>
              <rect x={x.map(i) - x.step * 0.18} y={PAD.top} width={x.step} height={height - PAD.top - PAD.bottom} fill="transparent" />
              <motion.path
                d={barPath(x.map(i), top, x.bandwidth, height - PAD.bottom - top)}
                className="lm-chart__bar"
                initial={{ opacity: 0 }}
                animate={{ opacity: hover == null || hover === i ? 1 : 0.55 }}
                transition={MotionPreset.fade}
              />
              <text className="lm-chart__axis" x={x.center(i)} y={height - PAD.bottom + 18} textAnchor="middle">{d.label}</text>
            </g>
          );
        })}
      </svg>
      <ChartTooltip
        visible={active != null}
        x={hover != null ? x.center(hover) : 0}
        y={active ? y.map(active.value) : 0}
        title={active?.label ?? ''}
        rows={active ? [{ name: title ?? 'Value', value: `${formatNumber(active.value)}${unit}`, color: 'var(--chart-1)' }] : []}
        containerWidth={width}
      />
      <table className="lm-sr-only">
        <caption>{title}</caption>
        <tbody>{data.map((d) => <tr key={d.label}><th>{d.label}</th><td>{d.value}{unit}</td></tr>)}</tbody>
      </table>
    </figure>
  );
}
