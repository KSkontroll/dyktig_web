import Image from 'next/image';

import { sx } from '@/lib/site/sx';

export function HeroSection() {
  return (
    <div style={sx('position:relative;overflow:hidden;background:var(--c-a)')}>
      <div
        style={sx(
          'position:absolute;left:0;top:0;bottom:0;width:70%;background:linear-gradient(150deg,var(--c-pl) 0%,var(--c-p) 100%)',
        )}
      />
      <div
        style={sx(
          'position:absolute;left:64%;top:-10%;width:14%;height:120%;background:linear-gradient(150deg,var(--c-pl) 0%,var(--c-p) 100%);transform:skewX(-8deg)',
        )}
      />
      <div
        style={sx(
          'position:relative;max-width:1200px;margin:0 auto;padding:84px 32px 76px;display:grid;grid-template-columns:1.1fr .9fr;gap:56px;align-items:center',
        )}
      >
        <div>
          <h1
            style={sx(
              "margin:0 0 20px;font-family:'Inter Tight',sans-serif;font-weight:800;font-size:50px;line-height:1.07;letter-spacing:-.02em;color:#fff",
            )}
          >
            Du fører regnskapet.{' '}
            <span style={sx('color:var(--c-a)')}>Vi sørger for at det holder.</span>
          </h1>
          <p
            style={sx(
              'margin:0 0 28px;font-size:18px;line-height:1.55;color:rgba(255,255,255,.86);max-width:540px',
            )}
          >
            Tusenvis av norske bedrifter fører regnskapet selv i Tripletex — helt uten
            regnskapsfører. Det er smart, helt til det ikke er det. Vi er det autoriserte
            byrået som møter deg der du er: med opplæring, kvalitetssikring, årsregnskap og
            skattemelding. Kun når du trenger det. Kun for tiden vi faktisk bruker.
          </p>
          <div
            style={sx(
              'display:flex;align-items:center;flex-wrap:wrap;gap:18px;margin-bottom:24px',
            )}
          >
            <a
              href="#tilbud"
              style={sx(
                'display:inline-block;background:var(--c-a);color:var(--c-p);font-size:16.5px;font-weight:700;text-decoration:none;padding:15px 28px;border-radius:9999px;box-shadow:0 14px 30px -14px rgba(0,0,0,.5)',
              )}
            >
              Få uforpliktende tilbud på 2 minutter
            </a>
            <a
              href="#priser"
              style={sx(
                'color:#fff;font-size:16px;font-weight:600;text-decoration:underline;text-decoration-color:var(--c-a);text-decoration-thickness:3px;text-underline-offset:5px',
              )}
            >
              Se hvordan Pay As You Go fungerer →
            </a>
          </div>
          <p
            style={sx(
              'margin:0;font-size:13.5px;line-height:1.5;color:rgba(255,255,255,.55)',
            )}
          >
            Autorisert regnskapsforetak · Tripletex-spesialister · Egen kundeportal med
            BankID
          </p>
        </div>
        <div style={sx('position:relative')}>
          <span
            style={sx(
              'position:absolute;top:-13px;left:18px;z-index:2;background:var(--c-p);color:#fff;font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;padding:6px 13px;border-radius:9999px;border:1px solid rgba(255,255,255,.25)',
            )}
          >
            Kundeportalen
          </span>
          <Image
            src="/images/aml-dashboard-pic.webp"
            alt="Kundeportalen til Dyktig Regnskapsfører — oppgaver, frister og dokumenter på ett sted"
            width={640}
            height={420}
            style={sx(
              'display:block;width:100%;height:auto;border-radius:14px;border:1.5px solid var(--c-p);box-shadow:0 34px 70px -30px rgba(0,0,0,.5)',
            )}
          />
        </div>
      </div>
    </div>
  );
}
