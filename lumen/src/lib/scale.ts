export interface Scale<TDomain> {
  map(value: TDomain): number;
}

export class LinearScale implements Scale<number> {
  constructor(
    private readonly domain: readonly [number, number],
    private readonly range: readonly [number, number],
    private readonly step?: number,
  ) {}

  // round the raw step up to 1, 2, 2.5 or 5 × 10^n so ticks read as 0, 100, 200…
  static niceStep(raw: number): number {
    if (raw <= 0) return 1;
    const magnitude = 10 ** Math.floor(Math.log10(raw));
    return ([1, 2, 2.5, 5, 10].find((m) => m * magnitude >= raw) ?? 10) * magnitude;
  }

  static fromMax(max: number, range: readonly [number, number], tickCount = 4): LinearScale {
    const step = LinearScale.niceStep(max / tickCount);
    return new LinearScale([0, Math.max(step, Math.ceil(max / step) * step)], range, step);
  }

  map(value: number): number {
    const [d0, d1] = this.domain;
    const [r0, r1] = this.range;
    return r0 + ((value - d0) / (d1 - d0 || 1)) * (r1 - r0);
  }

  ticks(count = 4): number[] {
    const [d0, d1] = this.domain;
    const step = this.step ?? (d1 - d0) / count;
    return Array.from({ length: Math.round((d1 - d0) / step) + 1 }, (_, i) => d0 + step * i);
  }
}

export class BandScale implements Scale<number> {
  constructor(
    private readonly count: number,
    private readonly range: readonly [number, number],
    private readonly padding = 0.3,
  ) {}

  get step(): number {
    return (this.range[1] - this.range[0]) / Math.max(this.count, 1);
  }

  get bandwidth(): number {
    return this.step * (1 - this.padding);
  }

  map(index: number): number {
    return this.range[0] + this.step * index + (this.step - this.bandwidth) / 2;
  }

  center(index: number): number {
    return this.map(index) + this.bandwidth / 2;
  }
}

export class PointScale implements Scale<number> {
  constructor(
    private readonly count: number,
    private readonly range: readonly [number, number],
  ) {}

  map(index: number): number {
    const [r0, r1] = this.range;
    return this.count <= 1 ? (r0 + r1) / 2 : r0 + ((r1 - r0) * index) / (this.count - 1);
  }

  nearest(x: number): number {
    const [r0, r1] = this.range;
    const raw = ((x - r0) / (r1 - r0)) * (this.count - 1);
    return Math.min(this.count - 1, Math.max(0, Math.round(raw)));
  }
}

export const formatNumber = (value: number): string =>
  new Intl.NumberFormat('en-US', { maximumFractionDigits: 1 }).format(value);
