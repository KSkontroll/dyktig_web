import { sx } from '@/lib/site/sx';

export function PricingSection() {
  return (
    <div id="priser" style={sx('background:#fff')}>
      <div style={sx('max-width:1200px;margin:0 auto;padding:92px 32px')}>
        <h2
          style={sx(
            "margin:0 0 44px;font-family:'Inter Tight',sans-serif;font-weight:800;font-size:38px;line-height:1.1;letter-spacing:-.015em;color:var(--c-p)",
          )}
        >
          Regnskap på dine premisser. Du bestemmer prisen.
        </h2>
        <div
          style={sx(
            'display:grid;grid-template-columns:repeat(auto-fit,minmax(340px,1fr));gap:24px;margin-bottom:26px',
          )}
        >
          <div
            style={sx(
              'position:relative;background:#fff;border:2px solid var(--c-a);border-radius:18px;padding:34px;box-shadow:0 24px 50px -32px color-mix(in oklab, var(--c-p) 45%, transparent);display:flex;flex-direction:column;gap:14px',
            )}
          >
            <span
              style={sx(
                'position:absolute;top:-13px;left:26px;background:var(--c-a);color:var(--c-p);font-size:11.5px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;padding:4px 12px;border-radius:9999px',
              )}
            >
              Mest populær
            </span>
            <p
              style={sx(
                "margin:6px 0 0;font-family:'Inter Tight',sans-serif;font-weight:800;font-size:26px;color:var(--c-p)",
              )}
            >
              Pay As You Go
            </p>
            <p style={sx('margin:0;font-size:15.5px;line-height:1.6;color:rgba(30,37,34,.85)')}>
              <strong style={sx('color:var(--c-p)')}>For deg som:</strong> fører mye selv i
              Tripletex, men vil ha en autorisert partner i ryggen til opplæring,
              kvalitetssikring, MVA og årsavslutning.
            </p>
            <p style={sx('margin:0;font-size:15.5px;line-height:1.6;color:rgba(30,37,34,.85)')}>
              <strong style={sx('color:var(--c-p)')}>Fordelen:</strong> Ingen faste
              månedskostnader. Du betaler kun for den faktiske tiden vi bruker — når du trenger
              support, kontroll eller årsoppgjør.
            </p>
            <p style={sx('margin:0;font-size:15.5px;line-height:1.6;color:rgba(30,37,34,.85)')}>
              <strong style={sx('color:var(--c-p)')}>Typisk bruk:</strong> Tripletex-opplæring
              ved oppstart, kvartalsvis kvalitetssjekk, årsregnskap og skattemelding.
            </p>
            <a
              href="#tilbud"
              style={sx(
                'margin-top:auto;display:inline-block;width:fit-content;background:var(--c-a);color:var(--c-p);font-size:15.5px;font-weight:700;text-decoration:none;padding:13px 24px;border-radius:9999px',
              )}
            >
              Få tilbud på Pay As You Go →
            </a>
          </div>
          <div
            style={sx(
              'background:#fff;border:1.5px solid color-mix(in oklab, var(--c-p) 25%, transparent);border-radius:18px;padding:34px;display:flex;flex-direction:column;gap:14px',
            )}
          >
            <p
              style={sx(
                "margin:6px 0 0;font-family:'Inter Tight',sans-serif;font-weight:800;font-size:26px;color:var(--c-p)",
              )}
            >
              Forutsigbar Fastpris
            </p>
            <p style={sx('margin:0;font-size:15.5px;line-height:1.6;color:rgba(30,37,34,.85)')}>
              <strong style={sx('color:var(--c-p)')}>For deg som:</strong> vil sette hele
              økonomifunksjonen på autopilot og slippe å tenke på frister og bilagsføring.
            </p>
            <p style={sx('margin:0;font-size:15.5px;line-height:1.6;color:rgba(30,37,34,.85)')}>
              <strong style={sx('color:var(--c-p)')}>Fordelen:</strong> Én fast, avtalt pris hver
              måned. Vi tar oss av alt — bokføring, lønn, MVA, skattemelding og årsregnskap.
            </p>
            <p style={sx('margin:0;font-size:15.5px;line-height:1.6;color:rgba(30,37,34,.85)')}>
              <strong style={sx('color:var(--c-p)')}>Typisk bruk:</strong> Bedrifter i vekst som
              vil bruke tiden på kunder, ikke bilag.
            </p>
            <a
              href="#tilbud"
              style={sx(
                'margin-top:auto;display:inline-block;width:fit-content;background:var(--c-p);color:#fff;font-size:15.5px;font-weight:700;text-decoration:none;padding:13px 24px;border-radius:9999px',
              )}
            >
              Få tilbud på fastpris →
            </a>
          </div>
        </div>
        <p
          style={sx(
            'margin:0;font-size:15px;line-height:1.55;color:rgba(30,37,34,.7);max-width:720px',
          )}
        >
          Usikker på hvilken modell som passer? De fleste starter med Pay As You Go og
          oppgraderer når bilagsmengden vokser. Du bytter når du vil — uten bindingstid.
        </p>
      </div>
    </div>
  );
}
