import { sx } from '@/lib/site/sx';

const faqs = [
  {
    question: 'Kan jeg føre regnskapet selv i Tripletex og bare bruke dere til årsoppgjøret?',
    answer:
      'Ja — det er faktisk den vanligste modellen hos oss. Du fører løpende gjennom året, og vi tar årsregnskap og skattemelding. Med Pay As You Go betaler du kun for årsavslutningen.',
  },
  {
    question: 'Tilbyr dere kurs og opplæring i Tripletex?',
    answer:
      'Ja. Vi tilbyr én-til-én-opplæring, oppstartspakker for nye Tripletex-brukere og workshops for team. Alt på timebasis eller som fast pakke.',
  },
  {
    question: 'Hva koster årsregnskap og skattemelding?',
    answer:
      'Prisen avhenger av bilagsmengde og kompleksitet, men du får alltid et konkret tilbud før vi starter — ingen overraskelser. Be om et uforpliktende tilbud, så svarer vi raskt.',
  },
  {
    question: 'Hva er forskjellen på Pay As You Go og fastpris?',
    answer:
      'Pay As You Go: ingen månedskostnad, du betaler kun for faktisk medgått tid. Fastpris: én avtalt månedspris der vi tar hele økonomifunksjonen. Du kan bytte modell når som helst.',
  },
  {
    question: 'Er dere et autorisert regnskapsforetak?',
    answer:
      'Ja, Dyktig Regnskapsfører AS er et autorisert regnskapsforetak under tilsyn av Finanstilsynet.',
  },
  {
    question: 'Hjelper dere enkeltpersonforetak (ENK)?',
    answer:
      'Ja — vi leverer skattemelding og næringsspesifikasjon for ENK, og gir opplæring i Tripletex for deg som driver alene.',
  },
  {
    question: 'Må jeg bytte regnskapssystem for å bli kunde?',
    answer:
      'Nei. Vi er Tripletex-spesialister og jobber i ditt eksisterende oppsett. Har du et annet system, hjelper vi deg gjerne over til Tripletex.',
  },
];

export function FaqSection() {
  return (
    <div id="faq" style={sx('background:#FBFBFA')}>
      <div style={sx('max-width:900px;margin:0 auto;padding:92px 32px')}>
        <h2
          style={sx(
            "margin:0 0 36px;font-family:'Inter Tight',sans-serif;font-weight:800;font-size:34px;letter-spacing:-.015em;color:var(--c-p)",
          )}
        >
          Ofte stilte spørsmål
        </h2>
        <div style={sx('display:flex;flex-direction:column;gap:26px')}>
          {faqs.map((faq, index) => (
            <div
              key={faq.question}
              style={
                index < faqs.length - 1
                  ? sx(
                      'border-bottom:1px solid color-mix(in oklab, var(--c-p) 15%, transparent);padding-bottom:22px',
                    )
                  : undefined
              }
            >
              <p
                style={sx(
                  'margin:0 0 8px;font-size:17.5px;font-weight:700;color:var(--c-p)',
                )}
              >
                {faq.question}
              </p>
              <p
                style={sx(
                  'margin:0;font-size:15.5px;line-height:1.6;color:rgba(30,37,34,.82)',
                )}
              >
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
