export const PALETTES = {
  'navy-gull': { p: '#0B2440', pl: '#14335A', a: '#E7A634', ad: '#A9761B' },
  'navy-korall': { p: '#0B2440', pl: '#14335A', a: '#E8714A', ad: '#B44E2E' },
} as const;

export type PaletteKey = keyof typeof PALETTES;

export function getActivePaletteKey(): PaletteKey {
  const keys = Object.keys(PALETTES) as PaletteKey[];
  return keys[Math.floor(Date.now() / 300_000) % 2];
}

export function applyPaletteToBody(key: PaletteKey = getActivePaletteKey()) {
  const c = PALETTES[key];
  const body = document.body;
  body.style.setProperty('--c-p', c.p);
  body.style.setProperty('--c-pl', c.pl);
  body.style.setProperty('--c-a', c.a);
  body.style.setProperty('--c-ad', c.ad);
}
