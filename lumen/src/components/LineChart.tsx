import { useState, type PointerEvent } from 'react';
import { motion } from 'framer-motion';
import { SeriesSchema, parseList, type Series } from '../lib/schemas';
import { LinearScale, PointScale, formatNumber } from '../lib/scale';
import { SERIES_LIMIT, seriesColor } from '../lib/palette';
import { useWidth } from '../lib/useWidth';
import { ChartTooltip } from './ChartTooltip';

export interface LineChartProps {
  labels: string[];
  series: Series[];
  title?: string;
  unit?: string;
  height?: number;
}

const PAD = { top: 12, bottom: 28, left: 40 };

export function LineChart({ labels, series: input, title, unit = '', height = 240 }: LineChartProps) {
  const series = parseList(SeriesSchema, input, 'LineChart.series').slice(0, SERIES_LIMIT);
  const [ref, width] = useWidth<HTMLDivElement>();
  const [hover, setHover] = useState<number | null>(null);
  const directLabels = series.length <= 4;
  const padRight = directLabels ? 84 : 12;

  const y = LinearScale.fromMax(Math.max(...series.flatMap((s) => s.values), 0), [height - PAD.bottom, PAD.top]);
  const x = new PointScale(labels.length, [PAD.left, width - padRight]);
  const path = (values: number[]) => values.map((v, i) => `${i ? 'L' : 'M'}${x.map(i)},${y.map(v)}`).join(' ');

  const onMove = (event: PointerEvent<SVGSVGElement>) => {
    const box = event.currentTarget.getBoundingClientRect();
    setHover(x.nearest(event.clientX - box.left));
  };
  const labelEvery = Math.ceil(labels.length / Math.max(1, Math.floor(width / 64)));

  return (
    <figure className="lm-chart" ref={ref}>
      {title && <figcaption className="lm-chart__title">{title}</figcaption>}
      {series.length > 1 && (
        <ul className="lm-legend">
          {series.map((s, i) => <li key={s.name}><span className="lm-legend__swatch" style={{ background: seriesColor(i) }} />{s.name}</li>)}
        </ul>
      )}
      <svg width={width} height={height} role="img" aria-label={title ?? 'Line chart'} onPointerMove={onMove} onPointerLeave={() => setHover(null)}>
        {y.ticks(4).map((tick) => (
          <g key={tick}>
            <line className="lm-chart__grid" x1={PAD.left} x2={width - padRight} y1={y.map(tick)} y2={y.map(tick)} />
            <text className="lm-chart__axis" x={PAD.left - 8} y={y.map(tick)} dy="0.32em" textAnchor="end">{formatNumber(tick)}</text>
          </g>
        ))}
        {labels.map((label, i) => i % labelEvery === 0 && (
          <text key={label} className="lm-chart__axis" x={x.map(i)} y={height - PAD.bottom + 18} textAnchor="middle">{label}</text>
        ))}
        {hover != null && <line className="lm-chart__crosshair" x1={x.map(hover)} x2={x.map(hover)} y1={PAD.top} y2={height - PAD.bottom} />}
        {series.map((s, i) => (
          <motion.path
            key={s.name}
            d={path(s.values)}
            className="lm-chart__line"
            style={{ stroke: seriesColor(i) }}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.7, ease: [0.2, 0, 0, 1] }}
          />
        ))}
        {hover != null && series.map((s, i) => s.values[hover] != null && (
          <circle key={s.name} className="lm-chart__dot" cx={x.map(hover)} cy={y.map(s.values[hover]!)} r={4.5} style={{ fill: seriesColor(i) }} />
        ))}
        {directLabels && series.map((s, i) => {
          const last = s.values.length - 1;
          return last >= 0 && (
            <text key={s.name} className="lm-chart__direct" x={x.map(last) + 8} y={y.map(s.values[last]!)} dy="0.32em">{s.name}</text>
          );
        })}
      </svg>
      <ChartTooltip
        visible={hover != null}
        x={hover != null ? x.map(hover) : 0}
        y={height / 2}
        title={hover != null ? labels[hover] ?? '' : ''}
        rows={hover != null ? series.map((s, i) => ({ name: s.name, value: `${formatNumber(s.values[hover] ?? 0)}${unit}`, color: seriesColor(i) })) : []}
        containerWidth={width}
      />
      <table className="lm-sr-only">
        <caption>{title}</caption>
        <thead><tr><th>Label</th>{series.map((s) => <th key={s.name}>{s.name}</th>)}</tr></thead>
        <tbody>{labels.map((label, i) => <tr key={label}><th>{label}</th>{series.map((s) => <td key={s.name}>{s.values[i]}</td>)}</tr>)}</tbody>
      </table>
    </figure>
  );
}
