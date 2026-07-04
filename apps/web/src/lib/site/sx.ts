import type { CSSProperties } from 'react';

export function sx(style: string): CSSProperties {
  const obj: Record<string, string> = {};

  for (const decl of style.split(';')) {
    const index = decl.indexOf(':');
    if (index < 0) continue;

    const prop = decl.slice(0, index).trim();
    const value = decl.slice(index + 1).trim();
    if (!prop || !value) continue;

    if (prop.startsWith('--')) {
      obj[prop] = value;
      continue;
    }

    const camel = prop.replace(/-([a-z])/g, (_, char: string) =>
      char.toUpperCase(),
    );
    obj[camel] = value;
  }

  return obj as CSSProperties;
}
