export const SERIES_LIMIT = 5;

export const seriesColor = (index: number): string => `var(--chart-${(index % SERIES_LIMIT) + 1})`;
