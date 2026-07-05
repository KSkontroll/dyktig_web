'use client';

import { FormEvent, useMemo, useState } from 'react';

import type {
  Ansatte,
  Bilag,
  Bokforing,
  CalculatorAnswers,
  RecommendationResult,
  Revisorplikt,
  Selskapsform,
} from '@/lib/calculator/types';
import { formatThousands, parseNumericInput } from '@/lib/site/format';
import { sx } from '@/lib/site/sx';

type Answers = Partial<CalculatorAnswers>;

const choiceButton = sx(
  "padding:16px;border:1.5px solid rgba(30,37,34,.15);border-radius:12px;background:#fff;text-align:left;font-family:'Barlow',sans-serif;font-size:15px;font-weight:600;color:var(--c-p);cursor:pointer",
);

export function PriceCalculator() {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<Answers>({});
  const [recommendation, setRecommendation] = useState<RecommendationResult | null>(
    null,
  );
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [navn, setNavn] = useState('');
  const [epost, setEpost] = useState('');
  const [telefon, setTelefon] = useState('');
  const [omsetningAar1, setOmsetningAar1] = useState('');
  const [omsetningAar2, setOmsetningAar2] = useState('');

  const yearNow = new Date().getFullYear();
  const yearLast = yearNow - 1;
  const yearBefore = yearNow - 2;

  function pick<K extends keyof CalculatorAnswers>(key: K, value: CalculatorAnswers[K], nextStep: number) {
    setAnswers((current) => ({ ...current, [key]: value }));
    setStep(nextStep);
    setError(null);
  }

  async function finishCalculator(revisorpliktig: Revisorplikt) {
    const nextAnswers: Answers = { ...answers, revisorpliktig };
    setAnswers(nextAnswers);
    setLoading(true);
    setError(null);

    try {
      const payload = {
        ...nextAnswers,
        omsetningAar1: Number(nextAnswers.omsetningAar1 ?? omsetningAar1.replace(/\D/g, '')),
        omsetningAar2: Number(nextAnswers.omsetningAar2 ?? omsetningAar2.replace(/\D/g, '')),
      };

      const response = await fetch('/api/estimate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error ?? 'Kunne ikke beregne anbefaling.');
      }

      setRecommendation(data);
      setStep(7);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Noe gikk galt.');
    } finally {
      setLoading(false);
    }
  }

  async function submitLead(event: FormEvent) {
    event.preventDefault();
    if (!recommendation || !answers.selskapsform || !answers.bokforing || !answers.bilag || !answers.ansatte) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const payload = {
        navn,
        epost,
        telefon,
        selskapsform: answers.selskapsform,
        bokforing: answers.bokforing,
        bilag: answers.bilag,
        ansatte: answers.ansatte,
        omsetningAar1: Number(answers.omsetningAar1 ?? omsetningAar1.replace(/\D/g, '')),
        omsetningAar2: Number(answers.omsetningAar2 ?? omsetningAar2.replace(/\D/g, '')),
        revisorpliktig: answers.revisorpliktig,
        anbefaling: recommendation.title,
        estimat: recommendation.estimate,
      };

      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error ?? 'Kunne ikke sende forespørselen.');
      }

      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Noe gikk galt.');
    } finally {
      setLoading(false);
    }
  }

  function restart() {
    setStep(1);
    setAnswers({});
    setRecommendation(null);
    setSent(false);
    setNavn('');
    setEpost('');
    setTelefon('');
    setOmsetningAar1('');
    setOmsetningAar2('');
    setError(null);
  }

  const stepTitle = useMemo(
    () =>
      sx(
        'margin:0 0 14px;font-size:14.5px;font-weight:700;color:#1E2522',
      ),
    [],
  );

  return (
    <div style={sx('max-width:720px;margin:0 auto;background:#FBFBFA;border-radius:18px;padding:36px;box-shadow:0 30px 60px -30px rgba(0,0,0,.5)')}>
      <h3 style={sx("margin:0 0 6px;text-align:center;font-family:'Inter Tight',sans-serif;font-weight:800;font-size:23px;color:var(--c-p)")}>
        Priskalkulator
      </h3>
      <p style={sx('margin:0 0 28px;text-align:center;font-size:14px;color:rgba(30,37,34,.6)')}>
        Finn prismodellen som passer din bedrift på under 1 minutt.
      </p>

      {error ? (
        <p style={sx('margin:0 0 16px;color:#b00020;font-size:14px;text-align:center')}>{error}</p>
      ) : null}

      {step === 1 ? (
        <>
          <p style={stepTitle}>1. Hvilken selskapsform har bedriften?</p>
          <div style={sx('display:grid;grid-template-columns:1fr 1fr;gap:14px')}>
            <button type="button" style={choiceButton} onClick={() => pick('selskapsform', 'as' as Selskapsform, 2)}>
              Aksjeselskap (AS)
            </button>
            <button type="button" style={choiceButton} onClick={() => pick('selskapsform', 'enk' as Selskapsform, 2)}>
              Enkeltpersonforetak (ENK)
            </button>
          </div>
        </>
      ) : null}

      {step === 2 ? (
        <>
          <p style={stepTitle}>2. Hvem skal gjøre den daglige bokføringen?</p>
          <div style={sx('display:flex;flex-direction:column;gap:12px')}>
            {[
              ['diy', 'Jeg gjør nesten alt selv i Tripletex', 'Trenger kun hjelp til kvalitetssikring, MVA og årsoppgjør.'],
              ['hybrid', 'Jeg vil gjøre litt selv', 'F.eks. fakturere, men vil ha hjelp til bilag og MVA.'],
              ['full', 'Jeg vil at regnskapsføreren skal gjøre alt', 'Full autopilot. Vi tar oss av alt papirarbeidet.'],
            ].map(([value, title, subtitle]) => (
              <button
                key={value}
                type="button"
                style={choiceButton}
                onClick={() => pick('bokforing', value as Bokforing, 3)}
              >
                <span style={sx('display:block;font-size:15px;font-weight:700;color:var(--c-p)')}>{title}</span>
                <span style={sx('font-size:13px;color:rgba(30,37,34,.6)')}>{subtitle}</span>
              </button>
            ))}
          </div>
        </>
      ) : null}

      {step === 3 ? (
        <>
          <p style={stepTitle}>3. Hvor mange bilag (kjøp/salg) har dere i måneden?</p>
          <div style={sx('display:grid;grid-template-columns:1fr 1fr;gap:14px')}>
            {[
              ['low', 'Under 15 bilag', 'Liten aktivitet / nystartet'],
              ['medium', '15 – 50 bilag', 'Normal drift'],
              ['high', '50 – 150 bilag', 'Høy aktivitet'],
              ['enterprise', 'Over 150 bilag', 'Krever skreddersydd løp'],
            ].map(([value, title, subtitle]) => (
              <button
                key={value}
                type="button"
                style={choiceButton}
                onClick={() => pick('bilag', value as Bilag, 4)}
              >
                <span style={sx('display:block;font-size:15px;font-weight:700;color:var(--c-p)')}>{title}</span>
                <span style={sx('font-size:13px;color:rgba(30,37,34,.6)')}>{subtitle}</span>
              </button>
            ))}
          </div>
        </>
      ) : null}

      {step === 4 ? (
        <>
          <p style={stepTitle}>4. Hvor mange ansatte skal ha lønn?</p>
          <div style={sx('display:grid;grid-template-columns:1fr 1fr;gap:14px')}>
            {[
              ['0', 'Kun meg selv / ingen ansatte'],
              ['1-5', '1 – 5 ansatte'],
              ['6-15', '6 – 15 ansatte'],
              ['15+', 'Over 15 ansatte'],
            ].map(([value, label]) => (
              <button
                key={value}
                type="button"
                style={choiceButton}
                onClick={() => pick('ansatte', value as Ansatte, 5)}
              >
                {label}
              </button>
            ))}
          </div>
        </>
      ) : null}

      {step === 5 ? (
        <>
          <p style={stepTitle}>5. Hva var omsetningen de siste to årene?</p>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setAnswers((current) => ({
                ...current,
                omsetningAar1: Number(parseNumericInput(omsetningAar1)),
                omsetningAar2: Number(parseNumericInput(omsetningAar2)),
              }));
              setStep(6);
            }}
            style={sx('display:flex;flex-direction:column;gap:14px')}
          >
            <div style={sx('display:grid;grid-template-columns:1fr 1fr;gap:14px')}>
              <label style={sx('display:flex;flex-direction:column;gap:6px;font-size:13px;font-weight:600;color:rgba(30,37,34,.7)')}>
                Omsetning {yearLast} (kr)
                <input
                  required
                  inputMode="numeric"
                  placeholder="f.eks. 2 500 000"
                  value={formatThousands(omsetningAar1)}
                  onChange={(event) => setOmsetningAar1(parseNumericInput(event.target.value))}
                  style={sx("padding:13px;border:1.5px solid rgba(30,37,34,.15);border-radius:10px;font-family:'Barlow',sans-serif;font-size:14.5px;outline:none")}
                />
              </label>
              <label style={sx('display:flex;flex-direction:column;gap:6px;font-size:13px;font-weight:600;color:rgba(30,37,34,.7)')}>
                Inntekt {yearBefore} (kr)
                <input
                  required
                  inputMode="numeric"
                  placeholder="f.eks. 1 800 000"
                  value={formatThousands(omsetningAar2)}
                  onChange={(event) => setOmsetningAar2(parseNumericInput(event.target.value))}
                  style={sx("padding:13px;border:1.5px solid rgba(30,37,34,.15);border-radius:10px;font-family:'Barlow',sans-serif;font-size:14.5px;outline:none")}
                />
              </label>
            </div>
            <button
              type="submit"
              style={sx("width:100%;background:var(--c-p);color:#fff;font-family:'Barlow',sans-serif;font-size:15.5px;font-weight:700;padding:14px;border:none;border-radius:10px;cursor:pointer")}
            >
              Neste →
            </button>
          </form>
        </>
      ) : null}

      {step === 6 ? (
        <>
          <p style={stepTitle}>6. Er bedriften revisorpliktig?</p>
          <div style={sx('display:grid;grid-template-columns:1fr 1fr 1fr;gap:14px')}>
            {(['ja', 'nei', 'usikker'] as Revisorplikt[]).map((value) => (
              <button
                key={value}
                type="button"
                disabled={loading}
                style={choiceButton}
                onClick={() => finishCalculator(value)}
              >
                {value === 'ja' ? 'Ja' : value === 'nei' ? 'Nei' : 'Usikker'}
              </button>
            ))}
          </div>
        </>
      ) : null}

      {step === 7 && recommendation ? (
        <>
          <div style={sx('text-align:center;padding:26px;background:#fff;border:1.5px solid color-mix(in oklab, var(--c-p) 12%, transparent);border-radius:14px;margin-bottom:22px')}>
            <p style={sx('margin:0 0 8px;font-size:16px;font-weight:700;color:var(--c-p)')}>
              Vår anbefaling for deg:
            </p>
            <p style={sx("margin:0 0 14px;font-family:'Inter Tight',sans-serif;font-weight:800;font-size:30px;color:var(--c-ad)")}>
              {recommendation.title}
            </p>
            <p style={sx('margin:0 auto 16px;font-size:14.5px;line-height:1.55;color:rgba(30,37,34,.8);max-width:460px')}>
              {recommendation.description}
            </p>
            <p style={sx('margin:0;font-size:12.5px;color:rgba(30,37,34,.55)')}>
              {recommendation.estimate}
            </p>
          </div>

          {sent ? (
            <div style={sx('text-align:center;padding:22px;background:color-mix(in oklab, var(--c-a) 14%, #fff);border:1.5px solid var(--c-a);border-radius:14px')}>
              <p style={sx('margin:0 0 6px;font-size:17px;font-weight:700;color:var(--c-p)')}>
                Takk! Vi har mottatt forespørselen din.
              </p>
              <p style={sx('margin:0;font-size:14.5px;color:rgba(30,37,34,.75)')}>
                Vi tar kontakt innen én virkedag med et uforpliktende tilbud og lenke til
                oppstartsskjemaet.
              </p>
            </div>
          ) : (
            <>
              <form onSubmit={submitLead} style={sx('display:flex;flex-direction:column;gap:14px')}>
                <div style={sx('display:grid;grid-template-columns:1fr 1fr;gap:14px')}>
                  <input
                    required
                    placeholder="Ditt navn *"
                    value={navn}
                    onChange={(event) => setNavn(event.target.value)}
                    style={sx("padding:13px;border:1.5px solid rgba(30,37,34,.15);border-radius:10px;font-family:'Barlow',sans-serif;font-size:14.5px;outline:none")}
                  />
                  <input
                    required
                    type="email"
                    placeholder="E-postadresse *"
                    value={epost}
                    onChange={(event) => setEpost(event.target.value)}
                    style={sx("padding:13px;border:1.5px solid rgba(30,37,34,.15);border-radius:10px;font-family:'Barlow',sans-serif;font-size:14.5px;outline:none")}
                  />
                </div>
                <input
                  required
                  type="tel"
                  placeholder="Telefonnummer *"
                  value={telefon}
                  onChange={(event) => setTelefon(event.target.value)}
                  style={sx("width:100%;box-sizing:border-box;padding:13px;border:1.5px solid rgba(30,37,34,.15);border-radius:10px;font-family:'Barlow',sans-serif;font-size:14.5px;outline:none")}
                />
                <button
                  type="submit"
                  disabled={loading}
                  style={sx("width:100%;background:var(--c-a);color:var(--c-p);font-family:'Barlow',sans-serif;font-size:16px;font-weight:700;padding:14px;border:none;border-radius:10px;cursor:pointer;box-shadow:0 10px 24px -12px rgba(0,0,0,.4)")}
                >
                  {loading ? 'Sender…' : 'Motta uforpliktende tilbud nå'}
                </button>
              </form>
              <p style={sx('margin:14px 0 0;text-align:center')}>
                <button
                  type="button"
                  onClick={restart}
                  style={sx("background:none;border:none;font-family:'Barlow',sans-serif;font-size:13px;color:rgba(30,37,34,.55);text-decoration:underline;cursor:pointer")}
                >
                  Start på nytt
                </button>
              </p>
            </>
          )}
        </>
      ) : null}
    </div>
  );
}
