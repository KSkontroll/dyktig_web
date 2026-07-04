import { sx } from '@/lib/site/sx';

const cards = [
  {
    title: '«Jeg er usikker på om jeg bruker Tripletex riktig»',
    body: 'Vi gir deg strukturert opplæring i Tripletex — én-til-én eller for hele teamet. Oppsett, bankavstemming, MVA-koder, prosjektmodul og automatisering. Du lærer å bruke systemet slik det er ment å brukes, og sparer timer hver måned.',
  },
  {
    title: '«Jeg vil at noen kvalitetssikrer tallene mine»',
    body: 'Du fører løpende — vi går gjennom avstemminger, MVA-meldinger og balansen med jevne mellomrom. Feil fanges opp før de blir dyre, ikke etter at Skatteetaten har funnet dem.',
  },
  {
    title: '«Jeg trenger bare hjelp til årsoppgjøret»',
    body: 'Helt greit. Mange av kundene våre fører alt selv gjennom året, og overlater årsregnskap og skattemelding til oss. Du betaler kun for årsavslutningen — ikke for et abonnement du ikke bruker.',
  },
];

export function DiySection() {
  return (
    <div style={sx('background:#FBFBFA')}>
      <div style={sx('max-width:1200px;margin:0 auto;padding:92px 32px')}>
        <h2
          style={sx(
            "margin:0 0 18px;font-family:'Inter Tight',sans-serif;font-weight:800;font-size:36px;line-height:1.15;letter-spacing:-.015em;color:var(--c-p);max-width:820px",
          )}
        >
          Fører du regnskapet selv i Tripletex? Da er denne siden laget for deg.
        </h2>
        <p
          style={sx(
            'margin:0 0 14px;font-size:17px;line-height:1.6;color:rgba(30,37,34,.85);max-width:820px',
          )}
        >
          Tripletex har gjort det mulig for gründere og småbedrifter å ta kontroll over egen
          økonomi. Du fakturerer, bokfører og har oversikt — og det skal du fortsette med. Vi
          tror ikke du trenger å gi fra deg kontrollen for å få trygghet.
        </p>
        <p
          style={sx(
            'margin:0 0 44px;font-size:17px;line-height:1.6;color:rgba(30,37,34,.85);max-width:820px',
          )}
        >
          Men de fleste som fører selv, kjenner igjen minst ett av disse punktene:
        </p>
        <div
          style={sx(
            'display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:20px;margin-bottom:40px',
          )}
        >
          {cards.map((card) => (
            <div
              key={card.title}
              style={sx(
                'background:#fff;border:1.5px solid color-mix(in oklab, var(--c-p) 22%, transparent);border-radius:16px;padding:28px',
              )}
            >
              <p style={sx('margin:0 0 12px;font-size:18px;font-weight:700;color:var(--c-p)')}>
                {card.title}
              </p>
              <p style={sx('margin:0;font-size:15px;line-height:1.6;color:rgba(30,37,34,.8)')}>
                {card.body}
              </p>
            </div>
          ))}
        </div>
        <p style={sx('margin:0;font-size:17px;font-weight:600;color:var(--c-p)')}>
          <a
            href="#tilbud"
            style={sx(
              'color:var(--c-p);font-weight:700;text-decoration:underline;text-decoration-color:var(--c-a);text-decoration-thickness:3px;text-underline-offset:4px',
            )}
          >
            Book en gratis Tripletex-gjennomgang på 30 minutter →
          </a>
        </p>
      </div>
    </div>
  );
}
