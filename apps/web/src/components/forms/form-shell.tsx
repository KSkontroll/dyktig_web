import Link from 'next/link';
import type { ReactNode } from 'react';

import { SiteNav } from '@/components/site/site-nav';
import { SiteFooter } from '@/components/site/site-footer';
import { sx } from '@/lib/site/sx';

type FormPageShellProps = {
  eyebrow: string;
  title: string;
  description: ReactNode;
  children: ReactNode;
  navVariant?: 'home' | 'simple';
};

export function FormPageShell({
  eyebrow,
  title,
  description,
  children,
  navVariant = 'simple',
}: FormPageShellProps) {
  return (
    <div style={sx("font-family:'Barlow',sans-serif;color:#1E2522")}>
      <SiteNav variant={navVariant} />
      <div
        style={sx(
          'background:linear-gradient(150deg,var(--c-pl) 0%,var(--c-p) 100%)',
        )}
      >
        <div style={sx('max-width:1100px;margin:0 auto;padding:64px 32px 72px')}>
          <p
            style={sx(
              'margin:0 0 14px;font-size:12.5px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--c-a)',
            )}
          >
            {eyebrow}
          </p>
          <h1
            style={sx(
              "margin:0 0 16px;font-family:'Inter Tight',sans-serif;font-weight:800;font-size:44px;line-height:1.08;letter-spacing:-.02em;color:#fff;max-width:760px",
            )}
          >
            {title}
          </h1>
          <p
            style={sx(
              'margin:0;font-size:17px;line-height:1.6;color:rgba(255,255,255,.82);max-width:640px',
            )}
          >
            {description}
          </p>
        </div>
      </div>
      <div style={sx('max-width:1100px;margin:0 auto;padding:56px 32px 96px')}>
        {children}
      </div>
      <SiteFooter />
    </div>
  );
}

export function FormSection({
  step,
  title,
  hint,
  children,
}: {
  step: number;
  title: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div
      style={sx(
        'background:#fff;border:1px solid rgba(11,36,64,.1);border-radius:18px;padding:32px;box-shadow:0 20px 44px -32px rgba(11,36,64,.3)',
      )}
    >
      <div
        style={sx(
          `display:flex;align-items:center;gap:12px;margin-bottom:${hint ? '8px' : '22px'}`,
        )}
      >
        <span
          style={sx(
            "width:34px;height:34px;border-radius:9999px;background:var(--c-p);color:#fff;display:flex;align-items:center;justify-content:center;font-family:'JetBrains Mono',monospace;font-weight:700;font-size:15px",
          )}
        >
          {step}
        </span>
        <h2
          style={sx(
            "margin:0;font-family:'Inter Tight',sans-serif;font-weight:800;font-size:22px;color:var(--c-p)",
          )}
        >
          {title}
        </h2>
      </div>
      {hint ? (
        <p
          style={sx(
            'margin:0 0 22px;font-size:13.5px;line-height:1.5;color:rgba(30,37,34,.6)',
          )}
        >
          {hint}
        </p>
      ) : null}
      {children}
    </div>
  );
}

export function FormGrid({ children }: { children: ReactNode }) {
  return (
    <div
      style={sx(
        'display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:16px',
      )}
    >
      {children}
    </div>
  );
}

export function FormSuccessCard({ title, body }: { title: string; body: string }) {
  return (
    <div
      style={sx(
        'max-width:640px;margin:40px auto;text-align:center;background:#fff;border:1.5px solid var(--c-a);border-radius:18px;padding:48px 40px;box-shadow:0 30px 60px -30px rgba(0,0,0,.25)',
      )}
    >
      <div
        style={sx(
          'width:64px;height:64px;margin:0 auto 20px;border-radius:9999px;background:color-mix(in oklab, var(--c-a) 20%, #fff);display:flex;align-items:center;justify-content:center;font-size:30px;color:var(--c-ad)',
        )}
      >
        ✓
      </div>
      <h2
        style={sx(
          "margin:0 0 12px;font-family:'Inter Tight',sans-serif;font-weight:800;font-size:28px;color:var(--c-p)",
        )}
      >
        {title}
      </h2>
      <p style={sx('margin:0;font-size:16px;line-height:1.6;color:rgba(30,37,34,.75)')}>
        {body}
      </p>
    </div>
  );
}

export function FormSubmitButton({
  children,
  disabled,
}: {
  children: ReactNode;
  disabled?: boolean;
}) {
  return (
    <div style={sx('display:flex;justify-content:flex-end')}>
      <button
        type="submit"
        disabled={disabled}
        style={sx(
          "background:var(--c-a);color:var(--c-p);font-family:'Barlow',sans-serif;font-size:16.5px;font-weight:700;padding:16px 34px;border:none;border-radius:9999px;cursor:pointer;box-shadow:0 14px 30px -14px rgba(0,0,0,.4);opacity:" +
            (disabled ? '0.7' : '1'),
        )}
      >
        {children}
      </button>
    </div>
  );
}

export function PrivacyLink() {
  return (
    <Link href="/personvern" style={sx('color:var(--c-ad);font-weight:600')}>
      personvernerklæringen
    </Link>
  );
}
