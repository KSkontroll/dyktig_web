import { sx } from '@/lib/site/sx';

const steps = [
  {
    number: '01',
    title: 'Fortell oss om bedriften din',
    body: 'Fyll ut skjemaet på 2 minutter.',
  },
  {
    number: '02',
    title: 'Vi tar en kikk sammen',
    body: 'En kort, uforpliktende gjennomgang av Tripletex-oppsettet og behovene dine.',
  },
  {
    number: '03',
    title: 'Du velger modell',
    body: 'Pay As You Go eller fastpris. Oppdragsavtalen signeres med BankID i portalen.',
  },
  {
    number: '04',
    title: 'Vi er i gang',
    body: 'Med opplæring, kvalitetssikring eller full regnskapsføring. Du bestemmer.',
  },
];

export function ProcessSection() {
  return (
    <div style={sx('background:#fff')}>
      <div style={sx('max-width:1200px;margin:0 auto;padding:92px 32px')}>
        <h2
          style={sx(
            "margin:0 0 44px;font-family:'Inter Tight',sans-serif;font-weight:800;font-size:34px;line-height:1.1;letter-spacing:-.015em;color:var(--c-p)",
          )}
        >
          Fra første kontakt til orden i regnskapet — på under en uke
        </h2>
        <div
          style={sx(
            'display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:24px',
          )}
        >
          {steps.map((step) => (
            <div key={step.number}>
              <p
                style={sx(
                  "margin:0 0 10px;font-family:'JetBrains Mono',monospace;font-weight:700;font-size:15px;color:var(--c-ad)",
                )}
              >
                {step.number}
              </p>
              <p style={sx('margin:0 0 8px;font-size:18px;font-weight:700;color:var(--c-p)')}>
                {step.title}
              </p>
              <p style={sx('margin:0;font-size:15px;line-height:1.55;color:rgba(30,37,34,.8)')}>
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
