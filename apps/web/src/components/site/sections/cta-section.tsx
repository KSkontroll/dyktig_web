import type { ReactNode } from 'react';

import { sx } from '@/lib/site/sx';

type CtaSectionProps = {
  children: ReactNode;
};

export function CtaSection({ children }: CtaSectionProps) {
  return (
    <div
      id="tilbud"
      style={sx(
        'background:linear-gradient(150deg,var(--c-pl) 0%,var(--c-p) 100%)',
      )}
    >
      <div style={sx('max-width:900px;margin:0 auto;padding:92px 32px')}>
        <h2
          style={sx(
            "margin:0 0 16px;text-align:center;font-family:'Inter Tight',sans-serif;font-weight:800;font-size:38px;line-height:1.1;letter-spacing:-.015em;color:var(--c-a)",
          )}
        >
          Klar for en enklere økonomihverdag?
        </h2>
        <p
          style={sx(
            'margin:0 auto 40px;text-align:center;font-size:17px;line-height:1.6;color:rgba(255,255,255,.85);max-width:620px',
          )}
        >
          Svar på fire raske spørsmål, så anbefaler vi prismodellen som passer din bedrift — og
          gir deg et uforpliktende tilbud tilpasset behovene dine.
        </p>
        {children}
      </div>
    </div>
  );
}
