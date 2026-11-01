import { motion } from 'framer-motion';
import { match } from 'ts-pattern';
import { Bot, Database, ShieldCheck, User, Wrench } from 'lucide-react';
import { cx } from '../lib/cx';
import { FlowEdgeSchema, FlowNodeSchema, parseList, type FlowEdge, type FlowNode } from '../lib/schemas';

export interface FlowDiagramProps {
  nodes: FlowNode[];
  edges: FlowEdge[];
  title?: string;
  nodeWidth?: number;
}

const NODE_H = 56;
const MARGIN = 16;

const iconFor = (kind: string) =>
  match(kind)
    .with('human', () => User)
    .with('tool', () => Wrench)
    .with('store', () => Database)
    .with('gate', () => ShieldCheck)
    .otherwise(() => Bot);

class FlowLayout {
  constructor(private readonly nodeWidth: number) {}

  bounds(nodes: { x: number; y: number }[]) {
    const maxX = Math.max(...nodes.map((n) => n.x)) + this.nodeWidth + MARGIN;
    const maxY = Math.max(...nodes.map((n) => n.y)) + NODE_H + MARGIN;
    return { width: maxX, height: maxY };
  }

  // leave from the side that faces the target; bend with a horizontal or vertical cubic
  edgePath(a: { x: number; y: number }, b: { x: number; y: number }): string {
    const w = this.nodeWidth;
    const horizontal = Math.abs(b.x - a.x) >= Math.abs(b.y - a.y);
    if (horizontal) {
      const forward = b.x >= a.x;
      const sx = forward ? a.x + w : a.x;
      const tx = forward ? b.x : b.x + w;
      const sy = a.y + NODE_H / 2;
      const ty = b.y + NODE_H / 2;
      const mid = (sx + tx) / 2;
      return `M${sx},${sy} C${mid},${sy} ${mid},${ty} ${tx},${ty}`;
    }
    const down = b.y >= a.y;
    const sx = a.x + w / 2;
    const tx = b.x + w / 2;
    const sy = down ? a.y + NODE_H : a.y;
    const ty = down ? b.y : b.y + NODE_H;
    const mid = (sy + ty) / 2;
    return `M${sx},${sy} C${sx},${mid} ${tx},${mid} ${tx},${ty}`;
  }
}

export function FlowDiagram({ nodes: nodeInput, edges: edgeInput, title, nodeWidth = 168 }: FlowDiagramProps) {
  const nodes = parseList(FlowNodeSchema, nodeInput, 'FlowDiagram.nodes');
  const edges = parseList(FlowEdgeSchema, edgeInput, 'FlowDiagram.edges');
  const layout = new FlowLayout(nodeWidth);
  const byId = new Map(nodes.map((n) => [n.id, n]));
  const { width, height } = layout.bounds(nodes);

  return (
    <figure className="lm-flow">
      {title && <figcaption className="lm-chart__title">{title}</figcaption>}
      <div className="lm-flow__canvas">
        <svg viewBox={`0 0 ${width} ${height}`} width="100%" style={{ maxWidth: width }} role="img" aria-label={title ?? 'Flow diagram'}>
          <defs>
            <marker id="lm-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M1,1.5 L9,5 L1,8.5" className="lm-flow__arrow" />
            </marker>
          </defs>
          {edges.map((edge) => {
            const a = byId.get(edge.from);
            const b = byId.get(edge.to);
            if (!a || !b) return null;
            const d = layout.edgePath(a, b);
            return (
              <g key={`${edge.from}-${edge.to}`}>
                <path d={d} className={cx('lm-flow__edge', edge.active && 'is-active')} markerEnd="url(#lm-arrow)" />
                {edge.active && (
                  <motion.path d={d} className="lm-flow__pulse" initial={{ strokeDashoffset: 24 }} animate={{ strokeDashoffset: 0 }} transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }} />
                )}
                {edge.label && (
                  <text className="lm-flow__edge-label" x={(a.x + b.x + nodeWidth) / 2} y={(a.y + b.y + NODE_H) / 2 - 8} textAnchor="middle">{edge.label}</text>
                )}
              </g>
            );
          })}
          {nodes.map((node, index) => {
            const Icon = iconFor(node.kind);
            return (
              <motion.g key={node.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05, type: 'spring', stiffness: 260, damping: 30 }}>
                <rect x={node.x} y={node.y} width={nodeWidth} height={NODE_H} className={cx('lm-flow__node', `lm-flow__node--${node.kind}`)} />
                <rect x={node.x + 12} y={node.y + 14} width={28} height={28} className={cx('lm-flow__chip', `lm-flow__chip--${node.kind}`)} />
                <foreignObject x={node.x + 18} y={node.y + 20} width={16} height={16}><Icon size={16} className="lm-flow__icon" aria-hidden /></foreignObject>
                <text x={node.x + 50} y={node.y + (node.caption ? 24 : 32)} className="lm-flow__label">{node.label}</text>
                {node.caption && <text x={node.x + 50} y={node.y + 41} className="lm-flow__caption">{node.caption}</text>}
              </motion.g>
            );
          })}
        </svg>
      </div>
    </figure>
  );
}
