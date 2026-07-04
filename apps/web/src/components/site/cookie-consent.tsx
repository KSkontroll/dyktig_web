'use client';

import { useEffect, useState } from 'react';

import { COOKIE_STORAGE_KEY } from '@/lib/site/constants';
import { sx } from '@/lib/site/sx';

type ConsentValue = 'nodvendige' | 'alle';

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(COOKIE_STORAGE_KEY);
    if (!stored) {
      setVisible(true);
    }
  }, []);

  function save(value: ConsentValue) {
    localStorage.setItem(COOKIE_STORAGE_KEY, value);
    setVisible(false);
  }

  if (!visible) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Informasjonskapsler"
      style={sx(
        'position:fixed;right:24px;bottom:24px;z-index:100;max-width:420px;background:#fff;border:1.5px solid rgba(11,36,64,.12);border-radius:16px;padding:22px;box-shadow:0 24px 60px -28px rgba(0,0,0,.35)',
      )}
    >
      <p
        style={sx(
          "margin:0 0 8px;font-family:'Inter Tight',sans-serif;font-weight:800;font-size:18px;color:var(--c-p)",
        )}
      >
        Informasjonskapsler
      </p>
      <p
        style={sx(
          'margin:0 0 18px;font-size:14px;line-height:1.55;color:rgba(30,37,34,.78)',
        )}
      >
        Vi bruker kun nødvendige informasjonskapsler for grunnleggende
        funksjonalitet. Vi samler ikke inn analysedata i dag.
      </p>
      <div style={sx('display:flex;gap:10px;flex-wrap:wrap')}>
        <button
          type="button"
          onClick={() => save('nodvendige')}
          style={sx(
            "flex:1;min-width:140px;background:#fff;color:var(--c-p);border:1.5px solid rgba(11,36,64,.18);border-radius:9999px;padding:12px 16px;font-family:'Barlow',sans-serif;font-size:14px;font-weight:700;cursor:pointer",
          )}
        >
          Kun nødvendige
        </button>
        <button
          type="button"
          onClick={() => save('alle')}
          style={sx(
            "flex:1;min-width:140px;background:var(--c-a);color:var(--c-p);border:none;border-radius:9999px;padding:12px 16px;font-family:'Barlow',sans-serif;font-size:14px;font-weight:700;cursor:pointer",
          )}
        >
          Godta alle
        </button>
      </div>
    </div>
  );
}

export function resetCookieConsent() {
  localStorage.removeItem(COOKIE_STORAGE_KEY);
  window.location.reload();
}
