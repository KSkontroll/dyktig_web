'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';

import { FormPageShell } from '@/components/forms/form-shell';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';
import { sx } from '@/lib/site/sx';

export default function OnboardingLoginPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const supabase = createSupabaseBrowserClient();
      const redirectTo = `${window.location.origin}/onboarding`;
      const { error: authError } = await supabase.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: redirectTo },
      });
      if (authError) throw authError;
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Kunne ikke sende innloggingslenke.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <FormPageShell
      eyebrow="Kundeinnlogging"
      title="Logg inn for å fylle ut oppstartsskjemaet"
      description="Vi sender en engangslenke til e-posten din. Ingen passord å huske."
    >
      <div
        style={sx(
          'max-width:520px;margin:0 auto;background:#fff;border:1px solid rgba(11,36,64,.1);border-radius:18px;padding:32px;box-shadow:0 20px 44px -32px rgba(11,36,64,.3)',
        )}
      >
        {sent ? (
          <p style={sx('margin:0;font-size:16px;line-height:1.6;color:rgba(30,37,34,.8)')}>
            Sjekk innboksen din — vi har sendt en innloggingslenke til <strong>{email}</strong>.
          </p>
        ) : (
          <form onSubmit={handleSubmit} style={sx('display:flex;flex-direction:column;gap:16px')}>
            <label className="lbl">
              E-postadresse
              <input
                className="fld"
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="navn@bedriften.no"
              />
            </label>
            {error ? (
              <p style={sx('margin:0;color:#8b1c1c;font-size:14px')}>{error}</p>
            ) : null}
            <button
              type="submit"
              disabled={loading}
              style={sx(
                "background:var(--c-a);color:var(--c-p);font-family:'Barlow',sans-serif;font-size:16px;font-weight:700;padding:14px 24px;border:none;border-radius:9999px;cursor:pointer",
              )}
            >
              {loading ? 'Sender …' : 'Send innloggingslenke'}
            </button>
          </form>
        )}
        <p style={sx('margin:18px 0 0;font-size:14px;color:rgba(30,37,34,.6)')}>
          Er du ansatt i byrået?{' '}
          <Link href="/admin/login" style={sx('color:var(--c-ad);font-weight:600')}>
            Admin-innlogging
          </Link>
        </p>
      </div>
    </FormPageShell>
  );
}
