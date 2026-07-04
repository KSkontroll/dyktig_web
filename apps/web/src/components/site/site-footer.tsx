'use client';

import Link from 'next/link';

import { LogoMark } from '@/components/site/logo';
import { resetCookieConsent } from '@/components/site/cookie-consent';
import { CONTACT_EMAIL, KS_KONTROLL_URL } from '@/lib/site/constants';
import { sx } from '@/lib/site/sx';

type SiteFooterProps = {
  variant?: 'home' | 'simple';
};

export function SiteFooter({ variant = 'home' }: SiteFooterProps) {
  if (variant === 'simple') {
    return (
      <div
        style={sx(
          'background:color-mix(in oklab, var(--c-p) 82%, black);border-top:1px solid rgba(255,255,255,.1)',
        )}
      >
        <div
          style={sx(
            'max-width:1200px;margin:0 auto;padding:30px 32px;display:flex;align-items:center;justify-content:space-between;gap:20px;flex-wrap:wrap',
          )}
        >
          <div style={sx('display:flex;align-items:center;gap:10px')}>
            <LogoMark size={32} fontSize={14} radius={8} />
            <span style={sx('color:#fff;font-weight:600;font-size:15px')}>
              Dyktig Regnskapsfører AS
            </span>
          </div>
          <p style={sx('margin:0;font-size:13.5px;color:rgba(255,255,255,.45)')}>
            © 2026 Dyktig Regnskapsfører AS ·{' '}
            <Link href="/" style={sx('color:rgba(255,255,255,.45)')}>
              Tilbake til forsiden
            </Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      style={sx(
        'background:color-mix(in oklab, var(--c-p) 82%, black);border-top:1px solid rgba(255,255,255,.1)',
      )}
    >
      <div
        style={sx(
          'max-width:1200px;margin:0 auto;padding:52px 32px 44px;display:grid;grid-template-columns:1.2fr 1fr 1fr;gap:44px',
        )}
      >
        <div>
          <div style={sx('display:flex;align-items:center;gap:10px;margin-bottom:12px')}>
            <LogoMark size={32} fontSize={14} radius={8} />
            <span style={sx('color:#fff;font-weight:600;font-size:16px')}>
              Dyktig Regnskapsfører AS
            </span>
          </div>
          <p style={sx('margin:0;font-size:14px;line-height:1.55;color:rgba(255,255,255,.55)')}>
            Autorisert regnskapsforetak · Tripletex-spesialister. Pay As You Go
            eller fastpris — du bestemmer.
          </p>
        </div>
        <div>
          <p
            style={sx(
              'margin:0 0 12px;font-size:13px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:rgba(255,255,255,.5)',
            )}
          >
            Kontakt oss
          </p>
          <p style={sx('margin:0 0 6px;font-size:14.5px;color:rgba(255,255,255,.75)')}>
            Møllergata 8, Oslo
          </p>
          <p style={sx('margin:0 0 6px;font-size:14.5px;color:rgba(255,255,255,.75)')}>
            <a href={`mailto:${CONTACT_EMAIL}`} style={sx('color:rgba(255,255,255,.75)')}>
              {CONTACT_EMAIL}
            </a>
          </p>
          <p style={sx('margin:0;font-size:14.5px;color:rgba(255,255,255,.75)')}>
            Autorisert regnskapsforetak under tilsyn av Finanstilsynet
          </p>
        </div>
        <div>
          <p
            style={sx(
              'margin:0 0 12px;font-size:13px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:rgba(255,255,255,.5)',
            )}
          >
            Plattform
          </p>
          <p style={sx('margin:0 0 6px')}>
            <a
              href={KS_KONTROLL_URL}
              style={sx('font-size:14.5px;color:var(--c-a);text-decoration:none;font-weight:600')}
            >
              Drevet av KS Kontroll →
            </a>
          </p>
          <p style={sx('margin:18px 0 0;font-size:13.5px;color:rgba(255,255,255,.45)')}>
            © 2026 Dyktig Regnskapsfører AS ·{' '}
            <Link href="/personvern" style={sx('color:rgba(255,255,255,.45)')}>
              Personvernerklæring
            </Link>
            {' · '}
            <button
              type="button"
              onClick={resetCookieConsent}
              style={sx(
                'background:none;border:none;padding:0;color:rgba(255,255,255,.45);text-decoration:underline;cursor:pointer;font-size:13.5px',
              )}
            >
              Administrer samtykke
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
