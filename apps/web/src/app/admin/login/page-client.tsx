'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { FormEvent, useState } from 'react';

import { FormPageShell } from '@/components/forms/form-shell';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';
import { sx } from '@/lib/site/sx';

export default function AdminLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get('next') ?? '/admin';
  const [email, setEmail] = useState('johansen@dyktigregnskapsforer.no');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const supabase = createSupabaseBrowserClient();
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (authError) throw authError;
      if (!authData.user) throw new Error('Innlogging feilet.');

      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', authData.user.id)
        .maybeSingle();

      if (profile?.role !== 'superadmin') {
        await supabase.auth.signOut();
        throw new Error('Du har ikke tilgang til admin-panelet.');
      }

      router.push(next);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Innlogging feilet.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <FormPageShell
      eyebrow="Admin"
      title="Logg inn i admin-panelet"
      description="For ansatte i Dyktig Regnskapsfører AS."
    >
      <div
        style={sx(
          'max-width:520px;margin:0 auto;background:#fff;border:1px solid rgba(11,36,64,.1);border-radius:18px;padding:32px;box-shadow:0 20px 44px -32px rgba(11,36,64,.3)',
        )}
      >
        <form onSubmit={handleSubmit} style={sx('display:flex;flex-direction:column;gap:16px')}>
          <label className="lbl">
            E-post
            <input
              className="fld"
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </label>
          <label className="lbl">
            Passord
            <input
              className="fld"
              type="password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
          {error ? <p style={sx('margin:0;color:#8b1c1c;font-size:14px')}>{error}</p> : null}
          <button
            type="submit"
            disabled={loading}
            style={sx(
              "background:var(--c-a);color:var(--c-p);font-family:'Barlow',sans-serif;font-size:16px;font-weight:700;padding:14px 24px;border:none;border-radius:9999px;cursor:pointer",
            )}
          >
            {loading ? 'Logger inn …' : 'Logg inn'}
          </button>
        </form>
      </div>
    </FormPageShell>
  );
}
