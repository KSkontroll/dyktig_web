'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { FormPageShell } from '@/components/forms/form-shell';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';
import { sx } from '@/lib/site/sx';

type Lead = {
  id: string;
  created_at: string;
  navn: string;
  epost: string;
  telefon: string;
  estimat: string;
};

type Invite = {
  id: string;
  email: string;
  sent_at: string;
  status: string;
  lead_id: string | null;
};

type OnboardingSvar = {
  id: string;
  created_at: string;
  foretaksnavn: string;
  kontakt_epost: string;
  org_nr: string;
  firmaattest_url: string | null;
};

export function AdminDashboard() {
  const router = useRouter();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [invites, setInvites] = useState<Invite[]>([]);
  const [svar, setSvar] = useState<OnboardingSvar[]>([]);
  const [loading, setLoading] = useState(true);
  const [sendingId, setSendingId] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    void loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    const supabase = createSupabaseBrowserClient();

    const [leadsRes, invitesRes, svarRes] = await Promise.all([
      supabase.from('leads').select('id,created_at,navn,epost,telefon,estimat').order('created_at', { ascending: false }),
      supabase.from('onboarding_invites').select('id,email,sent_at,status,lead_id').order('sent_at', { ascending: false }),
      supabase.from('onboarding_svar').select('id,created_at,foretaksnavn,kontakt_epost,org_nr,firmaattest_url').order('created_at', { ascending: false }),
    ]);

    setLeads(leadsRes.data ?? []);
    setInvites(invitesRes.data ?? []);
    setSvar(svarRes.data ?? []);
    setLoading(false);
  }

  async function sendInvite(lead: Lead) {
    setSendingId(lead.id);
    setMessage(null);
    try {
      const response = await fetch('/api/admin/invite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ leadId: lead.id, email: lead.epost }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error ?? 'Kunne ikke sende skjema.');
      setMessage(`Onboarding-lenke sendt til ${lead.epost}.`);
      await loadData();
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Sending feilet.');
    } finally {
      setSendingId(null);
    }
  }

  async function logout() {
    const supabase = createSupabaseBrowserClient();
    await supabase.auth.signOut();
    router.push('/admin/login');
    router.refresh();
  }

  const inviteByLead = new Map(invites.filter((i) => i.lead_id).map((i) => [i.lead_id!, i]));

  return (
    <FormPageShell
      eyebrow="Admin"
      title="Leads og onboarding"
      description="Se innkomne forespørsler, send oppstartsskjema til kunder og følg opp innsendte svar."
    >
      <div style={sx('display:flex;justify-content:flex-end;margin-bottom:20px')}>
        <button
          type="button"
          onClick={() => void logout()}
          style={sx(
            "background:transparent;border:1.5px solid rgba(11,36,64,.2);color:var(--c-p);font-family:'Barlow',sans-serif;font-size:14px;font-weight:600;padding:10px 18px;border-radius:9999px;cursor:pointer",
          )}
        >
          Logg ut
        </button>
      </div>

      {message ? (
        <p style={sx('margin:0 0 20px;padding:14px;border-radius:10px;background:color-mix(in oklab, var(--c-a) 18%, #fff);color:var(--c-p)')}>
          {message}
        </p>
      ) : null}

      {loading ? <p>Laster …</p> : null}

      <section style={sx('display:flex;flex-direction:column;gap:28px')}>
        <div style={sx('background:#fff;border:1px solid rgba(11,36,64,.1);border-radius:18px;padding:28px')}>
          <h2 style={sx("margin:0 0 18px;font-family:'Inter Tight',sans-serif;font-size:24px;color:var(--c-p)")}>
            Leads fra kalkulator
          </h2>
          {leads.length === 0 ? (
            <p style={sx('margin:0;color:rgba(30,37,34,.6)')}>Ingen leads ennå.</p>
          ) : (
            <div style={sx('display:flex;flex-direction:column;gap:12px')}>
              {leads.map((lead) => {
                const invite = inviteByLead.get(lead.id);
                return (
                  <div
                    key={lead.id}
                    style={sx(
                      'display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:12px;padding:16px;border:1px solid rgba(11,36,64,.08);border-radius:12px',
                    )}
                  >
                    <div>
                      <p style={sx('margin:0 0 4px;font-weight:700;color:var(--c-p)')}>{lead.navn}</p>
                      <p style={sx('margin:0;font-size:14px;color:rgba(30,37,34,.7)')}>
                        {lead.epost} · {lead.telefon}
                      </p>
                      <p style={sx('margin:4px 0 0;font-size:13px;color:rgba(30,37,34,.55)')}>
                        {new Date(lead.created_at).toLocaleString('nb-NO')} · {lead.estimat}
                      </p>
                      {invite ? (
                        <p style={sx('margin:6px 0 0;font-size:13px;color:var(--c-ad)')}>
                          Skjema sendt {new Date(invite.sent_at).toLocaleString('nb-NO')} ({invite.status})
                        </p>
                      ) : null}
                    </div>
                    <button
                      type="button"
                      disabled={sendingId === lead.id}
                      onClick={() => void sendInvite(lead)}
                      style={sx(
                        "background:var(--c-a);color:var(--c-p);font-family:'Barlow',sans-serif;font-size:14px;font-weight:700;padding:10px 18px;border:none;border-radius:9999px;cursor:pointer",
                      )}
                    >
                      {sendingId === lead.id ? 'Sender …' : invite ? 'Send på nytt' : 'Send skjema'}
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div style={sx('background:#fff;border:1px solid rgba(11,36,64,.1);border-radius:18px;padding:28px')}>
          <h2 style={sx("margin:0 0 18px;font-family:'Inter Tight',sans-serif;font-size:24px;color:var(--c-p)")}>
            Innsendte skjema
          </h2>
          {svar.length === 0 ? (
            <p style={sx('margin:0;color:rgba(30,37,34,.6)')}>Ingen skjema er sendt inn ennå.</p>
          ) : (
            <div style={sx('display:flex;flex-direction:column;gap:12px')}>
              {svar.map((item) => (
                <div
                  key={item.id}
                  style={sx('padding:16px;border:1px solid rgba(11,36,64,.08);border-radius:12px')}
                >
                  <p style={sx('margin:0 0 4px;font-weight:700;color:var(--c-p)')}>
                    {item.foretaksnavn} ({item.org_nr})
                  </p>
                  <p style={sx('margin:0;font-size:14px;color:rgba(30,37,34,.7)')}>
                    {item.kontakt_epost} · {new Date(item.created_at).toLocaleString('nb-NO')}
                  </p>
                  {item.firmaattest_url ? (
                    <p style={sx('margin:6px 0 0;font-size:13px;color:var(--c-ad)')}>
                      Firmaattest lastet opp
                    </p>
                  ) : null}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </FormPageShell>
  );
}
