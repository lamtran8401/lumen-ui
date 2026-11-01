import * as api from './index';

const host = window as unknown as { Lumen?: Record<string, unknown> };
host.Lumen = Object.assign(host.Lumen ?? {}, api);
