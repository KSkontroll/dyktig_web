import type { Metadata } from 'next';

import { SiteFooter } from '@/components/site/site-footer';
import { SiteNav } from '@/components/site/site-nav';
import { CONTACT_EMAIL } from '@/lib/site/constants';
import { sx } from '@/lib/site/sx';

export const metadata: Metadata = {
  title: 'Personvernerklæring | Dyktig Regnskapsfører AS',
  description:
    'Personvernerklæring for Dyktig Regnskapsfører AS — hva vi lagrer, hvorfor, og hvilke rettigheter du har.',
};

const formaalCards = [
  {
    title: 'Levere regnskapsoppdraget',
    body: 'Opplysninger om deg, selskapet ditt og dine ansatte brukes til å utføre avtalt regnskapsføring, lønn og rapportering.',
    grunnlag: 'Grunnlag: oppfyllelse av avtale',
  },
  {
    title: 'Administrere kundeforholdet',
    body: 'Kundeservice, klagebehandling og feilretting knyttet til ditt kundeforhold.',
    grunnlag: 'Grunnlag: oppfyllelse av avtale',
  },
  {
    title: 'Forbedre tjenestene våre',
    body: 'Analyse av kundeaktivitet og historikk for å utvikle og forbedre tjenester og kommunikasjon.',
    grunnlag: 'Grunnlag: berettiget interesse',
  },
  {
    title: 'Kommunikasjon og markedsføring',
    body: 'Tilpasset informasjon om tjenestene våre, f.eks. på e-post eller i kundeportalen. Du kan reservere deg når som helst.',
    grunnlag: 'Grunnlag: berettiget interesse / samtykke',
  },
];

const rettigheter = [
  {
    title: 'Innsyn',
    body: 'Be om kopi av alle opplysninger vi behandler om deg.',
  },
  {
    title: 'Retting',
    body: 'Få rettet eller supplert opplysninger som er feil eller misvisende.',
  },
  {
    title: 'Sletting',
    body: 'Be om sletting uten ugrunnet opphold — med unntak av det vi må beholde etter loven.',
  },
  {
    title: 'Begrensning',
    body: 'Be oss begrense behandlingen i visse situasjoner, eller administrer samtykker selv.',
  },
  {
    title: 'Protest',
    body: 'Protester mot behandling basert på berettiget interesse, inkludert markedsføring.',
  },
  {
    title: 'Klage',
    body: 'Du kan alltid klage til Datatilsynet hvis du mener vi behandler opplysninger feil.',
  },
];

const leverandorer = [
  { navn: 'Regnskap Norge', rolle: 'Bransjeforening — faglig standard og kvalitet' },
  { navn: 'Stø AS', rolle: 'Regnskaps- og systemtjenester' },
  { navn: 'Freshdesk', rolle: 'Kundeservice og henvendelser' },
  { navn: 'Microsoft', rolle: 'E-post, dokumenter og skylagring' },
  { navn: 'Teletopia SMS AS', rolle: 'SMS-varsling' },
  { navn: 'AccountFlow AS', rolle: 'Automatisering av regnskapsprosesser' },
  { navn: 'KS Kontroll AS', rolle: 'Kvalitetssikring, internkontroll og kundeportal' },
  { navn: 'Monday.com', rolle: 'Prosjekt- og oppgavestyring' },
  { navn: 'Dun & Bradstreet', rolle: 'Kreditt- og selskapsinformasjon' },
].map((lev) => ({
  ...lev,
  init: lev.navn
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase(),
}));

export default function PersonvernPage() {
  return (
    <div style={sx("font-family:'Barlow',sans-serif;color:#1E2522")}>
        <SiteNav variant="simple" />

        <div style={sx('position:relative;overflow:hidden;background:var(--c-a)')}>
          <div
            style={sx(
              'position:absolute;left:0;top:0;bottom:0;width:78%;background:linear-gradient(150deg,var(--c-pl) 0%,var(--c-p) 100%)',
            )}
          />
          <div
            style={sx(
              'position:absolute;left:72%;top:-10%;width:12%;height:120%;background:linear-gradient(150deg,var(--c-pl) 0%,var(--c-p) 100%);transform:skewX(-8deg)',
            )}
          />
          <div style={sx('position:relative;max-width:900px;margin:0 auto;padding:70px 32px 64px')}>
            <p
              style={sx(
                'margin:0 0 14px;font-size:12.5px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--c-a)',
              )}
            >
              Sist oppdatert juli 2026
            </p>
            <h1
              style={sx(
                "margin:0 0 14px;font-family:'Inter Tight',sans-serif;font-weight:800;font-size:44px;line-height:1.08;letter-spacing:-.02em;color:#fff",
              )}
            >
              Personvernerklæring
            </h1>
            <p
              style={sx(
                'margin:0;font-size:17px;line-height:1.6;color:rgba(255,255,255,.85);max-width:640px',
              )}
            >
              Dyktig Regnskapsfører AS (org.nr. 928 824 756) er behandlingsansvarlig for
              personopplysningene vi behandler om deg. Her forklarer vi hva vi lagrer, hvorfor —
              og hvilke rettigheter du har.
            </p>
          </div>
        </div>

        <div style={sx('background:#FBFBFA')}>
          <div style={sx('max-width:900px;margin:0 auto;padding:76px 32px')}>
            <h2
              style={sx(
                "margin:0 0 14px;font-family:'Inter Tight',sans-serif;font-weight:800;font-size:30px;letter-spacing:-.015em;color:var(--c-p)",
              )}
            >
              Hva vi bruker opplysningene til
            </h2>
            <p
              style={sx(
                'margin:0 0 36px;font-size:16px;line-height:1.6;color:rgba(30,37,34,.8);max-width:720px',
              )}
            >
              Vi behandler kun personopplysninger vi trenger, og alltid med et rettslig grunnlag
              etter GDPR.
            </p>
            <div style={sx('display:grid;grid-template-columns:1fr 1fr;gap:18px')}>
              {formaalCards.map((card) => (
                <div
                  key={card.title}
                  style={sx(
                    'background:#fff;border:1.5px solid color-mix(in oklab, var(--c-p) 18%, transparent);border-radius:14px;padding:24px',
                  )}
                >
                  <p
                    style={sx(
                      'margin:0 0 8px;font-size:16.5px;font-weight:700;color:var(--c-p)',
                    )}
                  >
                    {card.title}
                  </p>
                  <p
                    style={sx(
                      'margin:0 0 10px;font-size:14.5px;line-height:1.55;color:rgba(30,37,34,.8)',
                    )}
                  >
                    {card.body}
                  </p>
                  <p
                    style={sx(
                      'margin:0;font-size:12.5px;font-weight:600;color:var(--c-ad)',
                    )}
                  >
                    {card.grunnlag}
                  </p>
                </div>
              ))}
            </div>
            <p
              style={sx(
                'margin:26px 0 0;font-size:14px;line-height:1.6;color:rgba(30,37,34,.65)',
              )}
            >
              Merk: opplysninger vi er lovpålagt å oppbevare — for eksempel etter bokføringsloven
              og hvitvaskingsloven — kan ikke slettes før lovens frister er utløpt.
            </p>
          </div>
        </div>

        <div style={sx('background:var(--c-p)')}>
          <div style={sx('max-width:900px;margin:0 auto;padding:76px 32px')}>
            <h2
              style={sx(
                "margin:0 0 14px;font-family:'Inter Tight',sans-serif;font-weight:800;font-size:30px;letter-spacing:-.015em;color:#fff",
              )}
            >
              Dine <span style={sx('color:var(--c-a)')}>rettigheter</span>
            </h2>
            <p
              style={sx(
                'margin:0 0 36px;font-size:16px;line-height:1.6;color:rgba(255,255,255,.8);max-width:700px',
              )}
            >
              Du bestemmer over dine egne opplysninger. Ta kontakt på{' '}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                style={sx('color:var(--c-a);font-weight:600;text-decoration:none')}
              >
                {CONTACT_EMAIL}
              </a>{' '}
              for å bruke rettighetene dine.
            </p>
            <div style={sx('display:grid;grid-template-columns:1fr 1fr;gap:14px 28px')}>
              {rettigheter.map((item) => (
                <div key={item.title} style={sx('display:flex;gap:14px;align-items:baseline')}>
                  <span
                    style={sx(
                      'flex:none;width:26px;height:26px;border-radius:9999px;background:var(--c-a);color:var(--c-p);display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:800;transform:translateY(5px)',
                    )}
                  >
                    ✓
                  </span>
                  <div>
                    <p style={sx('margin:0 0 4px;font-size:16px;font-weight:700;color:#fff')}>
                      {item.title}
                    </p>
                    <p
                      style={sx(
                        'margin:0;font-size:14px;line-height:1.5;color:rgba(255,255,255,.7)',
                      )}
                    >
                      {item.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={sx('background:#fff')}>
          <div style={sx('max-width:900px;margin:0 auto;padding:76px 32px')}>
            <h2
              style={sx(
                "margin:0 0 14px;font-family:'Inter Tight',sans-serif;font-weight:800;font-size:30px;letter-spacing:-.015em;color:var(--c-p)",
              )}
            >
              Våre leverandører og databehandlere
            </h2>
            <p
              style={sx(
                'margin:0 0 36px;font-size:16px;line-height:1.6;color:rgba(30,37,34,.8);max-width:720px',
              )}
            >
              Vi bruker anerkjente tredjeparter for å levere tjenestene våre trygt og effektivt.
              Disse behandler opplysninger på våre vegne, regulert gjennom databehandleravtaler.
            </p>
            <div
              style={sx(
                'display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:16px',
              )}
            >
              {leverandorer.map((lev) => (
                <div
                  key={lev.navn}
                  style={sx(
                    'display:flex;align-items:center;gap:14px;background:#fff;border:1.5px solid color-mix(in oklab, var(--c-p) 15%, transparent);border-radius:14px;padding:18px 20px',
                  )}
                >
                  <span
                    style={sx(
                      "flex:none;width:42px;height:42px;border-radius:10px;background:color-mix(in oklab, var(--c-p) 8%, #fff);color:var(--c-p);display:flex;align-items:center;justify-content:center;font-family:'Inter Tight',sans-serif;font-weight:800;font-size:15px",
                    )}
                  >
                    {lev.init}
                  </span>
                  <div>
                    <p
                      style={sx(
                        'margin:0 0 2px;font-size:15.5px;font-weight:700;color:var(--c-p)',
                      )}
                    >
                      {lev.navn}
                    </p>
                    <p style={sx('margin:0;font-size:12.5px;color:rgba(30,37,34,.6)')}>
                      {lev.rolle}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <p
              style={sx(
                'margin:26px 0 0;font-size:14px;line-height:1.6;color:rgba(30,37,34,.65)',
              )}
            >
              Fullstendig oversikt over underleverandører og rutiner får du under onboarding som
              kunde.
            </p>
          </div>
        </div>

        <div
          style={sx(
            'background:linear-gradient(150deg,var(--c-pl) 0%,var(--c-p) 100%)',
          )}
        >
          <div
            style={sx(
              'max-width:900px;margin:0 auto;padding:70px 32px;display:grid;grid-template-columns:1.3fr .7fr;gap:44px;align-items:center',
            )}
          >
            <div>
              <h2
                style={sx(
                  "margin:0 0 12px;font-family:'Inter Tight',sans-serif;font-weight:800;font-size:30px;letter-spacing:-.015em;color:var(--c-a)",
                )}
              >
                Spørsmål om personvern?
              </h2>
              <p
                style={sx(
                  'margin:0 0 24px;font-size:16px;line-height:1.6;color:rgba(255,255,255,.85)',
                )}
              >
                Ta kontakt, så svarer vi deg raskt. Du kan også be om innsyn, retting eller
                sletting direkte.
              </p>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                style={sx(
                  'display:inline-block;background:var(--c-a);color:var(--c-p);font-size:16px;font-weight:700;text-decoration:none;padding:14px 26px;border-radius:9999px;box-shadow:0 14px 30px -14px rgba(0,0,0,.5)',
                )}
              >
                Send oss en e-post
              </a>
            </div>
            <div style={sx('font-size:14.5px;line-height:1.7;color:rgba(255,255,255,.8)')}>
              <p style={sx('margin:0 0 4px;font-weight:700;color:#fff')}>
                Dyktig Regnskapsfører AS
              </p>
              <p style={sx('margin:0')}>Org.nr. 928 824 756</p>
              <p style={sx('margin:0')}>Møllergata 8, 0179 Oslo</p>
              <p style={sx('margin:0')}>+47 92 51 49 85</p>
              <p style={sx('margin:0')}>{CONTACT_EMAIL}</p>
            </div>
          </div>
        </div>

      <SiteFooter variant="simple" />
    </div>
  );
}
