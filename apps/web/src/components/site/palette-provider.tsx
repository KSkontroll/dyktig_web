'use client';

import { useEffect } from 'react';

import { applyPaletteToBody } from '@/lib/site/palette';

export function PaletteProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    applyPaletteToBody();
    const interval = window.setInterval(() => applyPaletteToBody(), 15_000);
    return () => window.clearInterval(interval);
  }, []);

  return children;
}
