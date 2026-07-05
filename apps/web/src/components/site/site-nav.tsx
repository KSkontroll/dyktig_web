'use client';

import Link from 'next/link';

import { LogoMark } from '@/components/site/logo';
import { sx } from '@/lib/site/sx';

type SiteNavProps = {
  variant?: 'home' | 'simple';
};

export function SiteNav({ variant = 'home' }: SiteNavProps) {
  return (
    <div
      style={sx(
        'position:sticky;top:0;z-index:50;background:var(--c-p);box-shadow:0 1px 0 rgba(255,255,255,.08)',
      )}
    >
      <div
        style={sx(
          'max-width:1200px;margin:0 auto;padding:0 32px;height:70px;display:flex;align-items:center;justify-content:space-between;gap:24px',
        )}
      >
        <Link
          href="/"
          style={sx(
            'display:flex;align-items:center;gap:11px;text-decoration:none',
          )}
        >
          <LogoMark />
          <span
            style={sx(
              'color:#fff;font-weight:600;font-size:17px;letter-spacing:-.01em',
            )}
          >
            Dyktig Regnskapsfører
          </span>
        </Link>

        {variant === 'home' ? (
          <>
            <div style={sx('display:flex;align-items:center;gap:30px')}>
              {[
                ['Tjenester', '#tjenester'],
                ['Priser', '#priser'],
                ['Kundeportal', '#portal'],
                ['FAQ', '#faq'],
              ].map(([label, href]) => (
                <a
                  key={href}
                  href={href}
                  style={sx(
                    'color:rgba(255,255,255,.85);font-size:15px;font-weight:500;text-decoration:none',
                  )}
                >
                  {label}
                </a>
              ))}
            </div>
            <a
              href="/onboarding/login"
              style={sx(
                'color:rgba(255,255,255,.7);font-size:14px;font-weight:500;text-decoration:none',
              )}
            >
              Logg inn
            </a>
            <a
              href="#tilbud"
              style={sx(
                'background:var(--c-a);color:var(--c-p);font-size:15px;font-weight:700;text-decoration:none;padding:10px 20px;border-radius:9999px',
              )}
            >
              Få uforpliktende tilbud
            </a>
          </>
        ) : (
          <Link
            href="/"
            style={sx(
              'color:rgba(255,255,255,.85);font-size:15px;font-weight:500;text-decoration:none',
            )}
          >
            ← Tilbake til forsiden
          </Link>
        )}
      </div>
    </div>
  );
}
