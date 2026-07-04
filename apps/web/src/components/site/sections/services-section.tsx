import { sx } from '@/lib/site/sx';

const services = [
  {
    featured: true,
    badge: 'Tripletex-opplæring og support',
    title: 'Bli trygg i Tripletex — med en spesialist ved din side',
    body: 'Vi setter opp Tripletex riktig fra dag én, og lærer deg å utnytte automatiseringen: bankintegrasjon, EHF-faktura, reiseregning og MVA-koder. Tilbys som oppstartspakke, workshops eller løpende support på timebasis. Perfekt for deg som fører regnskapet selv — eller vil begynne med det.',
  },
  {
    label: 'Årsregnskap og årsavslutning',
    title: 'Årsregnskap levert trygt og presist',
    body: 'Vi avslutter regnskapsåret ditt: avstemminger, avskrivninger, disponering og noter — og sender årsregnskapet direkte til Brønnøysundregistrene innen fristen. Fører du selv i Tripletex, overtar vi sømløst der du slapp. Ingen gebyrer, ingen tvangsmulkt, ingen overraskelser.',
  },
  {
    label: 'Skattemelding for AS og ENK',
    title: 'Skattemelding uten hodepine',
    body: 'Vi utarbeider og leverer skattemeldingen med alle vedlegg direkte til Skatteetaten — for aksjeselskap og enkeltpersonforetak. Vi ser samtidig på lovlige fradrag du kan ha oversett, slik at du ikke betaler mer skatt enn du må.',
  },
  {
    label: 'Løpende bokføring og MVA',
    title: 'Alltid oppdatert regnskap',
    body: 'For deg på fastpris sørger vi for at regnskapet alltid er à jour, og at MVA-meldingen leveres presist annenhver måned.',
  },
  {
    label: 'Lønn og HR',
    title: 'Lønn uten stress',
    body: 'Profesjonell lønnskjøring, feriepengeberegning og A-melding — levert riktig, hver gang.',
  },
];

export function ServicesSection() {
  return (
    <div id="tjenester" style={sx('background:#FBFBFA')}>
      <div style={sx('max-width:1200px;margin:0 auto;padding:92px 32px')}>
        <h2
          style={sx(
            "margin:0 0 44px;font-family:'Inter Tight',sans-serif;font-weight:800;font-size:36px;line-height:1.1;letter-spacing:-.015em;color:var(--c-p)",
          )}
        >
          Vi tar oss av detaljene, så du kan fokusere på vekst.
        </h2>
        <div
          style={sx(
            'display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:20px',
          )}
        >
          {services.map((service) =>
            service.featured ? (
              <div
                key={service.title}
                style={sx(
                  'position:relative;background:#fff;border:2px solid var(--c-a);border-radius:16px;padding:28px;grid-column:1 / -1;box-shadow:0 20px 44px -28px color-mix(in oklab, var(--c-p) 40%, transparent)',
                )}
              >
                <span
                  style={sx(
                    'position:absolute;top:-12px;left:22px;background:var(--c-a);color:var(--c-p);font-size:11.5px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;padding:4px 12px;border-radius:9999px',
                  )}
                >
                  {service.badge}
                </span>
                <p style={sx('margin:8px 0 10px;font-size:21px;font-weight:700;color:var(--c-p)')}>
                  {service.title}
                </p>
                <p
                  style={sx(
                    'margin:0;font-size:15.5px;line-height:1.6;color:rgba(30,37,34,.8);max-width:900px',
                  )}
                >
                  {service.body}
                </p>
              </div>
            ) : (
              <div
                key={service.title}
                style={sx(
                  'background:#fff;border:1.5px solid color-mix(in oklab, var(--c-p) 22%, transparent);border-radius:16px;padding:28px',
                )}
              >
                <p
                  style={sx(
                    'margin:0 0 4px;font-size:13px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--c-ad)',
                  )}
                >
                  {service.label}
                </p>
                <p style={sx('margin:0 0 10px;font-size:19px;font-weight:700;color:var(--c-p)')}>
                  {service.title}
                </p>
                <p style={sx('margin:0;font-size:15px;line-height:1.6;color:rgba(30,37,34,.8)')}>
                  {service.body}
                </p>
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  );
}
