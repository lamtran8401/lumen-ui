/** Lumen — props reference. Load React 18, then bundle.js; components live on window.Lumen. */
import type { ReactNode, ButtonHTMLAttributes, HTMLAttributes, InputHTMLAttributes } from 'react';

export type Tone = 'neutral' | 'accent' | 'success' | 'warning' | 'danger';
export type TaskStatus = 'todo' | 'doing' | 'review' | 'done' | 'blocked';
export type StepStatus = 'pending' | 'running' | 'success' | 'error' | 'skipped';

export interface Task {
  id: string;
  title: string;
  status?: TaskStatus;
  priority?: 'p0' | 'p1' | 'p2' | 'p3';
  assignee?: { name: string; kind?: 'human' | 'agent' };
  tags?: string[];
  due?: string;
  progress?: number;
}
export type ParsedTask = Required<Omit<Task, 'assignee' | 'due' | 'progress'>> & Pick<Task, 'assignee' | 'due' | 'progress'>;
export interface RunStep { id: string; label: string; status: StepStatus; detail?: string; duration?: string }
export interface Datum { label: string; value: number }
export interface Series { name: string; values: number[] }
export interface FlowNode { id: string; label: string; caption?: string; kind?: 'human' | 'agent' | 'tool' | 'store' | 'gate'; x: number; y: number }
export interface FlowEdge { from: string; to: string; label?: string; active?: boolean }

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';
export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart'> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    leading?: ReactNode;
    trailing?: ReactNode;
    loading?: boolean;
}
export declare const Button: import("react").ForwardRefExoticComponent<ButtonProps & import("react").RefAttributes<HTMLButtonElement>>;

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
export declare function SegmentedControl({ options, value, defaultValue, onChange, size, ...aria }: SegmentedControlProps): import("react/jsx-runtime").JSX.Element;

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    hint?: string;
    error?: string;
    leading?: ReactNode;
    trailing?: ReactNode;
}
export declare const Input: import("react").ForwardRefExoticComponent<InputProps & import("react").RefAttributes<HTMLInputElement>>;

export interface SwitchProps {
    checked?: boolean;
    defaultChecked?: boolean;
    onChange?: (checked: boolean) => void;
    label?: string;
    description?: string;
    disabled?: boolean;
}
export declare function Switch({ checked, defaultChecked, onChange, label, description, disabled }: SwitchProps): import("react/jsx-runtime").JSX.Element;

export type CardVariant = 'solid' | 'glass' | 'inset';
export interface CardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title' | 'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart'> {
    variant?: CardVariant;
    title?: ReactNode;
    description?: ReactNode;
    actions?: ReactNode;
    padding?: 'none' | 'sm' | 'md' | 'lg';
    animateIn?: boolean;
}
export declare function Card({ variant, title, description, actions, padding, animateIn, className, children, ...rest }: CardProps): import("react/jsx-runtime").JSX.Element;

export interface BadgeProps {
    tone?: Tone;
    dot?: boolean;
    icon?: ReactNode;
    children: ReactNode;
}
export declare function Badge({ tone, dot, icon, children }: BadgeProps): import("react/jsx-runtime").JSX.Element;

export interface AvatarProps {
    name: string;
    kind?: 'human' | 'agent';
    size?: 'sm' | 'md';
}
export declare function Avatar({ name, kind, size }: AvatarProps): import("react/jsx-runtime").JSX.Element;

export type CalloutKind = 'in-short' | 'good-to-know' | 'watch-out';
export interface CalloutProps {
    kind: CalloutKind;
    title?: string;
    children: ReactNode;
}
export declare function Callout({ kind, title, children }: CalloutProps): import("react/jsx-runtime").JSX.Element;

export interface ProgressProps {
    value: number;
    label?: string;
    showValue?: boolean;
    tone?: Extract<Tone, 'accent' | 'success' | 'warning' | 'danger'>;
    size?: 'sm' | 'md';
}
export declare function Progress({ value, label, showValue, tone, size }: ProgressProps): import("react/jsx-runtime").JSX.Element;

export interface TaskCardProps {
    task: Task;
    onOpen?: (task: ParsedTask) => void;
    compact?: boolean;
}
export declare function TaskCard({ task: input, onOpen, compact }: TaskCardProps): import("react/jsx-runtime").JSX.Element;

export interface BoardColumn {
    id: string;
    title: string;
    tasks: Task[];
    limit?: number;
}
export interface BoardProps {
    columns: BoardColumn[];
    onOpenTask?: (task: ParsedTask) => void;
}
export declare function Board({ columns, onOpenTask }: BoardProps): import("react/jsx-runtime").JSX.Element;

export interface StatTileProps {
    label: string;
    value: string;
    delta?: number;
    deltaLabel?: string;
    goodWhen?: 'up' | 'down';
    trend?: number[];
}
export declare function StatTile({ label, value, delta, deltaLabel, goodWhen, trend }: StatTileProps): import("react/jsx-runtime").JSX.Element;

export type MessageRole = 'user' | 'agent' | 'system';
export interface AgentMessageProps {
    role: MessageRole;
    author?: string;
    time?: string;
    streaming?: boolean;
    children: ReactNode;
}
export declare function AgentMessage({ role, author, time, streaming, children }: AgentMessageProps): import("react/jsx-runtime").JSX.Element;

export interface ToolCallProps {
    name: string;
    status: StepStatus;
    summary?: string;
    input?: string;
    output?: ReactNode;
    duration?: string;
    defaultOpen?: boolean;
}
export declare function ToolCall({ name, status, summary, input, output, duration, defaultOpen }: ToolCallProps): import("react/jsx-runtime").JSX.Element;

export interface RunTimelineProps {
    steps: RunStep[];
    title?: string;
}
export declare function RunTimeline({ steps: input, title }: RunTimelineProps): import("react/jsx-runtime").JSX.Element;

export interface ComposerProps {
    placeholder?: string;
    defaultValue?: string;
    busy?: boolean;
    context?: ReactNode;
    onSubmit?: (text: string) => void;
    onStop?: () => void;
    maxRows?: number;
}
export declare function Composer({ placeholder, defaultValue, busy, context, onSubmit, onStop, maxRows }: ComposerProps): import("react/jsx-runtime").JSX.Element;

export interface CodeBlockProps {
    code: string;
    language?: string;
    filename?: string;
}
export declare function CodeBlock({ code, language, filename }: CodeBlockProps): import("react/jsx-runtime").JSX.Element;

export interface BarChartProps {
    data: Datum[];
    title?: string;
    unit?: string;
    height?: number;
}
export declare function BarChart({ data: input, title, unit, height }: BarChartProps): import("react/jsx-runtime").JSX.Element;

export interface LineChartProps {
    labels: string[];
    series: Series[];
    title?: string;
    unit?: string;
    height?: number;
}
export declare function LineChart({ labels, series: input, title, unit, height }: LineChartProps): import("react/jsx-runtime").JSX.Element;

export interface FlowDiagramProps {
    nodes: FlowNode[];
    edges: FlowEdge[];
    title?: string;
    nodeWidth?: number;
}
export declare function FlowDiagram({ nodes: nodeInput, edges: edgeInput, title, nodeWidth }: FlowDiagramProps): import("react/jsx-runtime").JSX.Element;
