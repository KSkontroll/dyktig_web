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

type Aksjonaer = {
  navn: string;
  eierandel: string;
};

type OnboardingSvar = {
  id: string;
  created_at: string;
  org_nr: string;
  foretaksnavn: string;
  selskapsform: string;
  bransje: string | null;
  adresse: string;
  kommune: string;
  registrert_enhetsreg: string;
  nettside: string | null;
  firmaattest_url: string | null;
  kontakt_navn: string;
  kontakt_rolle: string;
  kontakt_epost: string;
  kontakt_telefon: string;
  signaturrett: string;
  reelle_rettighetshavere: string;
  eierandeler: string;
  aksjonaerer: Aksjonaer[] | null;
  pep: string;
  statsborgerskap: string | null;
  bank: string | null;
  dagens_system: string | null;
  har_tripletex: string;
  forrige_regnskapsforer: string | null;
  tjenester: string[];
  antall_ansatte: number;
  omsetning_ifjor: number | null;
  mva_registrert: string;
  revisorpliktig: string;
  oppstartsdato: string | null;
  tilleggsinfo: string | null;
  samtykke: boolean;
};

function parseAksjonaerer(value: unknown): Aksjonaer[] {
  if (!Array.isArray(value)) return [];
  return value.filter(
    (item): item is Aksjonaer =>
      !!item &&
      typeof item === 'object' &&
      typeof (item as Aksjonaer).navn === 'string' &&
      typeof (item as Aksjonaer).eierandel === 'string',
  );
}

function DetailRow({ label, value }: { label: string; value: string | number | null | undefined }) {
  if (value === null || value === undefined || value === '') return null;
  return (
    <div style={sx('display:grid;grid-template-columns:minmax(140px,34%) 1fr;gap:8px 16px;padding:8px 0;border-bottom:1px solid rgba(11,36,64,.06)')}>
      <span style={sx('font-size:13px;font-weight:600;color:rgba(30,37,34,.55)')}>{label}</span>
      <span style={sx('font-size:14px;color:var(--c-p);line-height:1.5')}>{value}</span>
    </div>
  );
}

function OnboardingDetail({ item }: { item: OnboardingSvar }) {
  const aksjonaerer = parseAksjonaerer(item.aksjonaerer);
  const [openingAttest, setOpeningAttest] = useState(false);

  async function openFirmaattest() {
    setOpeningAttest(true);
    try {
      const response = await fetch(`/api/admin/onboarding/firmaattest?id=${item.id}`);
      const data = await response.json();
      if (!response.ok) throw new Error(data.error ?? 'Kunne ikke åpne firmaattest.');
      window.open(data.url, '_blank', 'noopener,noreferrer');
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Kunne ikke åpne firmaattest.');
    } finally {
      setOpeningAttest(false);
    }
  }

  return (
    <div style={sx('margin-top:14px;padding-top:14px;border-top:1px solid rgba(11,36,64,.08)')}>
      <DetailRow label="Selskapsform" value={item.selskapsform} />
      <DetailRow label="Bransje" value={item.bransje} />
      <DetailRow label="Adresse" value={item.adresse} />
      <DetailRow label="Kommune" value={item.kommune} />
      <DetailRow label="Enhetsregisteret" value={item.registrert_enhetsreg} />
      <DetailRow label="Nettside" value={item.nettside} />
      <DetailRow label="Kontaktperson" value={`${item.kontakt_navn} (${item.kontakt_rolle})`} />
      <DetailRow label="Kontakt e-post" value={item.kontakt_epost} />
      <DetailRow label="Kontakt telefon" value={item.kontakt_telefon} />
      <DetailRow label="Signaturrett" value={item.signaturrett} />
      {aksjonaerer.length > 0 ? (
        <div style={sx('padding:12px 0;border-bottom:1px solid rgba(11,36,64,.06)')}>
          <p style={sx('margin:0 0 8px;font-size:13px;font-weight:600;color:rgba(30,37,34,.55)')}>
            Aksjonærer
          </p>
          {aksjonaerer.map((a, i) => (
            <p key={i} style={sx('margin:0 0 4px;font-size:14px;color:var(--c-p)')}>
              {a.navn} — {a.eierandel}
            </p>
          ))}
        </div>
      ) : (
        <>
          <DetailRow label="Reelle rettighetshavere" value={item.reelle_rettighetshavere} />
          <DetailRow label="Eierandeler" value={item.eierandeler} />
        </>
      )}
      <DetailRow label="PEP" value={item.pep} />
      <DetailRow label="Statsborgerskap" value={item.statsborgerskap} />
      <DetailRow label="Bank" value={item.bank} />
      <DetailRow label="Regnskapssystem" value={item.dagens_system} />
      <DetailRow label="Tripletex" value={item.har_tripletex} />
      <DetailRow label="Forrige regnskapsfører" value={item.forrige_regnskapsforer} />
      <DetailRow label="Tjenester" value={item.tjenester.join(', ') || 'Ingen valgt'} />
      <DetailRow label="Ansatte med lønn" value={item.antall_ansatte} />
      <DetailRow
        label="Omsetning ifjor"
        value={item.omsetning_ifjor != null ? `${item.omsetning_ifjor.toLocaleString('nb-NO')} kr` : null}
      />
      <DetailRow label="MVA-registrert" value={item.mva_registrert} />
      <DetailRow label="Revisorpliktig" value={item.revisorpliktig} />
      <DetailRow label="Ønsket oppstart" value={item.oppstartsdato} />
      <DetailRow label="Tilleggsinfo" value={item.tilleggsinfo} />
      {item.firmaattest_url ? (
        <div style={sx('padding-top:12px')}>
          <button
            type="button"
            disabled={openingAttest}
            onClick={() => void openFirmaattest()}
            style={sx(
              "background:transparent;border:1.5px solid rgba(11,36,64,.2);color:var(--c-p);font-family:'Barlow',sans-serif;font-size:13px;font-weight:600;padding:8px 16px;border-radius:9999px;cursor:pointer",
            )}
          >
            {openingAttest ? 'Åpner …' : 'Åpne firmaattest'}
          </button>
        </div>
      ) : null}
    </div>
  );
}

export function AdminDashboard() {
  const router = useRouter();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [invites, setInvites] = useState<Invite[]>([]);
  const [svar, setSvar] = useState<OnboardingSvar[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [sendingKey, setSendingKey] = useState<string | null>(null);
  const [manualEmail, setManualEmail] = useState('');
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    void loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    setLoadError(null);
    const supabase = createSupabaseBrowserClient();

    const [leadsRes, invitesRes, svarResponse] = await Promise.all([
      supabase.from('leads').select('id,created_at,navn,epost,telefon,estimat').order('created_at', { ascending: false }),
      supabase.from('onboarding_invites').select('id,email,sent_at,status,lead_id').order('sent_at', { ascending: false }),
      fetch('/api/admin/onboarding'),
    ]);

    if (leadsRes.error || invitesRes.error) {
      setLoadError('Kunne ikke laste leads eller invitasjoner. Prøv å logge inn på nytt.');
    }

    let svarItems: OnboardingSvar[] = [];
    if (svarResponse.ok) {
      const svarData = await svarResponse.json();
      svarItems = (svarData.items ?? []) as OnboardingSvar[];
    } else {
      const svarData = await svarResponse.json().catch(() => ({}));
      setLoadError(
        typeof svarData.error === 'string'
          ? svarData.error
          : 'Kunne ikke laste innsendte skjema. Prøv å logge inn på nytt.',
      );
    }

    setLeads(leadsRes.data ?? []);
    setInvites(invitesRes.data ?? []);
    setSvar(svarItems);
    setLoading(false);
  }

  async function postInvite(email: string, leadId?: string) {
    const response = await fetch('/api/admin/invite', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(leadId ? { leadId, email } : { email }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error ?? 'Kunne ikke sende skjema.');
    setMessage(`Onboarding-lenke sendt til ${email}.`);
    await loadData();
  }

  async function sendInvite(lead: Lead) {
    setSendingKey(`lead:${lead.id}`);
    setMessage(null);
    try {
      await postInvite(lead.epost, lead.id);
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Sending feilet.');
    } finally {
      setSendingKey(null);
    }
  }

  async function sendManualInvite(emailOverride?: string) {
    const email = (emailOverride ?? manualEmail).trim();
    if (!email) return;
    setSendingKey(emailOverride ? `invite:${email}` : 'manual');
    setMessage(null);
    try {
      await postInvite(email);
      if (!emailOverride) setManualEmail('');
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Sending feilet.');
    } finally {
      setSendingKey(null);
    }
  }

  async function logout() {
    const supabase = createSupabaseBrowserClient();
    await supabase.auth.signOut();
    router.push('/admin/login');
    router.refresh();
  }

  const inviteByLead = new Map(invites.filter((i) => i.lead_id).map((i) => [i.lead_id!, i]));
  const manualInvites = invites.filter((i) => !i.lead_id);

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

      {loadError ? (
        <p style={sx('margin:0 0 20px;padding:14px;border-radius:10px;background:#fff4f4;color:#8b1c1c')}>
          {loadError}
        </p>
      ) : null}

      {loading ? <p>Laster …</p> : null}

      <section style={sx('display:flex;flex-direction:column;gap:28px')}>
        <div style={sx('background:#fff;border:1px solid rgba(11,36,64,.1);border-radius:18px;padding:28px')}>
          <h2 style={sx("margin:0 0 8px;font-family:'Inter Tight',sans-serif;font-size:24px;color:var(--c-p)")}>
            Send skjema manuelt
          </h2>
          <p style={sx('margin:0 0 18px;font-size:14px;color:rgba(30,37,34,.65)')}>
            For kunder som ikke har brukt priskalkulatoren — de får personlig lenke på e-post.
          </p>
          <form
            style={sx('display:flex;flex-wrap:wrap;gap:12px;align-items:flex-end')}
            onSubmit={(e) => {
              e.preventDefault();
              void sendManualInvite();
            }}
          >
            <label style={sx('flex:1;min-width:220px')}>
              <span style={sx('display:block;margin-bottom:6px;font-size:13px;font-weight:600;color:var(--c-p)')}>
                E-post
              </span>
              <input
                type="email"
                value={manualEmail}
                onChange={(e) => setManualEmail(e.target.value)}
                placeholder="kunde@firma.no"
                required
                style={sx(
                  'width:100%;padding:12px 14px;border:1.5px solid rgba(11,36,64,.15);border-radius:10px;font-size:15px;font-family:inherit',
                )}
              />
            </label>
            <button
              type="submit"
              disabled={sendingKey === 'manual' || !manualEmail.trim()}
              style={sx(
                "background:var(--c-a);color:var(--c-p);font-family:'Barlow',sans-serif;font-size:14px;font-weight:700;padding:12px 22px;border:none;border-radius:9999px;cursor:pointer",
              )}
            >
              {sendingKey === 'manual' ? 'Sender …' : 'Send skjema'}
            </button>
          </form>
          {manualInvites.length > 0 ? (
            <div style={sx('margin-top:22px;display:flex;flex-direction:column;gap:10px')}>
              <p style={sx('margin:0;font-size:13px;font-weight:600;color:rgba(30,37,34,.55)')}>
                Tidligere manuelle utsendelser
              </p>
              {manualInvites.map((invite) => (
                <div
                  key={invite.id}
                  style={sx(
                    'display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:12px;padding:14px;border:1px solid rgba(11,36,64,.08);border-radius:12px',
                  )}
                >
                  <div>
                    <p style={sx('margin:0;font-weight:600;color:var(--c-p)')}>{invite.email}</p>
                    <p style={sx('margin:4px 0 0;font-size:13px;color:rgba(30,37,34,.55)')}>
                      Sendt {new Date(invite.sent_at).toLocaleString('nb-NO')} · {invite.status}
                    </p>
                  </div>
                  <button
                    type="button"
                    disabled={sendingKey === `invite:${invite.email}`}
                    onClick={() => void sendManualInvite(invite.email)}
                    style={sx(
                      "background:transparent;border:1.5px solid rgba(11,36,64,.2);color:var(--c-p);font-family:'Barlow',sans-serif;font-size:13px;font-weight:600;padding:8px 16px;border-radius:9999px;cursor:pointer",
                    )}
                  >
                    {sendingKey === `invite:${invite.email}` ? 'Sender …' : 'Send på nytt'}
                  </button>
                </div>
              ))}
            </div>
          ) : null}
        </div>

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
                      disabled={sendingKey === `lead:${lead.id}`}
                      onClick={() => void sendInvite(lead)}
                      style={sx(
                        "background:var(--c-a);color:var(--c-p);font-family:'Barlow',sans-serif;font-size:14px;font-weight:700;padding:10px 18px;border:none;border-radius:9999px;cursor:pointer",
                      )}
                    >
                      {sendingKey === `lead:${lead.id}` ? 'Sender …' : invite ? 'Send på nytt' : 'Send skjema'}
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
            <p style={sx('margin:0;color:rgba(30,37,34,.6)')}>
              Ingen skjema er sendt inn ennå. Når en kunde sender inn via lenken, vises hele skjemaet her.
            </p>
          ) : (
            <div style={sx('display:flex;flex-direction:column;gap:12px')}>
              {svar.map((item) => {
                const expanded = expandedId === item.id;
                return (
                  <div
                    key={item.id}
                    style={sx('padding:16px;border:1px solid rgba(11,36,64,.08);border-radius:12px')}
                  >
                    <div
                      style={sx(
                        'display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:12px',
                      )}
                    >
                      <div>
                        <p style={sx('margin:0 0 4px;font-weight:700;color:var(--c-p)')}>
                          {item.foretaksnavn} ({item.org_nr})
                        </p>
                        <p style={sx('margin:0;font-size:14px;color:rgba(30,37,34,.7)')}>
                          {item.kontakt_epost} · {new Date(item.created_at).toLocaleString('nb-NO')}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setExpandedId(expanded ? null : item.id)}
                        style={sx(
                          "background:transparent;border:1.5px solid rgba(11,36,64,.2);color:var(--c-p);font-family:'Barlow',sans-serif;font-size:13px;font-weight:600;padding:8px 16px;border-radius:9999px;cursor:pointer",
                        )}
                      >
                        {expanded ? 'Skjul detaljer' : 'Vis hele skjemaet'}
                      </button>
                    </div>
                    {expanded ? <OnboardingDetail item={item} /> : null}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </FormPageShell>
  );
}
