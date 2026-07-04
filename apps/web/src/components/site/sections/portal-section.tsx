import Image from 'next/image';

import { sx } from '@/lib/site/sx';

const features = [
  {
    title: 'Sømløs onboarding:',
    body: 'Vi henter selskapsdata automatisk og setter opp gode internkontrollrutiner for deg fra første dag.',
  },
  {
    title: 'Alt på ett sted:',
    body: 'Se oppgaver, godkjenn tilbud, signer oppdragsavtale med BankID og følg frister i sanntid.',
  },
  {
    title: 'Dokumentert etterrettelighet:',
    body: 'Rutiner, styreprotokoller og HMS dokumentert i henhold til lovverket — klart om Skatteetaten eller banken spør.',
  },
];

export function PortalSection() {
  return (
    <div id="portal" style={sx('background:var(--c-p)')}>
      <div
        style={sx(
          'max-width:1200px;margin:0 auto;padding:92px 32px;display:grid;grid-template-columns:1fr 1fr;gap:56px;align-items:center',
        )}
      >
        <div>
          <p style={sx('margin:0 0 16px')}>
            <span
              style={sx(
                'display:inline-flex;align-items:center;gap:8px;background:color-mix(in oklab, var(--c-a) 18%, transparent);border:1px solid var(--c-a);color:var(--c-a);font-size:12.5px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;padding:7px 15px;border-radius:9999px',
              )}
            >
              <span
                style={sx(
                  'width:7px;height:7px;border-radius:9999px;background:var(--c-a)',
                )}
              />
              Kommer snart · Oppstart 2027
            </span>
          </p>
          <h2
            style={sx(
              "margin:0 0 14px;font-family:'Inter Tight',sans-serif;font-weight:800;font-size:34px;line-height:1.15;letter-spacing:-.015em;color:#fff",
            )}
          >
            Fullstendig oversikt i vår egen{' '}
            <span style={sx('color:var(--c-a)')}>kundeportal</span>
          </h2>
          <p
            style={sx(
              'margin:0 0 28px;font-size:16.5px;line-height:1.6;color:rgba(255,255,255,.82)',
            )}
          >
            Slutt på e-postkaos og tapte bilag. Gjennom vår samhandlingsportal — bygget på KS
            Kontroll-plattformen — har du og din regnskapsfører full oversikt over alle oppgaver,
            på ett felles sted.
          </p>
          <div style={sx('display:flex;flex-direction:column;gap:16px;margin-bottom:24px')}>
            {features.map((feature) => (
              <div key={feature.title} style={sx('display:flex;gap:14px')}>
                <span
                  style={sx(
                    'flex:none;width:26px;height:26px;border-radius:9999px;background:var(--c-a);color:var(--c-p);display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:800',
                  )}
                >
                  ✓
                </span>
                <p
                  style={sx(
                    'margin:0;font-size:15.5px;line-height:1.55;color:rgba(255,255,255,.85)',
                  )}
                >
                  <strong style={sx('color:#fff')}>{feature.title}</strong> {feature.body}
                </p>
              </div>
            ))}
          </div>
          <p
            style={sx(
              'margin:0;font-size:13.5px;line-height:1.5;color:rgba(255,255,255,.5)',
            )}
          >
            Portalen drives av KS Kontroll — vår egen plattform for kvalitetssikring og
            samhandling, utviklet for norske regnskapsmiljøer. Lanseres for kundene våre i 2027.
          </p>
        </div>
        <div>
          <Image
            src="/images/aml-dashboard-pic.webp"
            alt="Samhandlingsportalen — oppgaver, frister og dokumenter i sanntid"
            width={640}
            height={420}
            style={sx(
              'display:block;width:100%;height:auto;border-radius:14px;border:1px solid rgba(255,255,255,.25);box-shadow:0 34px 70px -30px rgba(0,0,0,.6)',
            )}
          />
        </div>
      </div>
    </div>
  );
}
