import { sx } from '@/lib/site/sx';

export function PainSection() {
  return (
    <div style={sx('background:var(--c-p)')}>
      <div style={sx('max-width:900px;margin:0 auto;padding:76px 32px')}>
        <h3
          style={sx(
            "margin:0 0 18px;font-family:'Inter Tight',sans-serif;font-weight:800;font-size:30px;line-height:1.2;letter-spacing:-.015em;color:#fff",
          )}
        >
          Lei av uforutsigbare regnskapsregninger og{' '}
          <span style={sx('color:var(--c-a)')}>e-postkaos</span>?
        </h3>
        <p
          style={sx(
            'margin:0 0 14px;font-size:16.5px;line-height:1.6;color:rgba(255,255,255,.82)',
          )}
        >
          De fleste regnskapsbyråer låser deg til faste månedshonorarer — selv i måneder der du
          nesten ikke har bilag. Og verdifull tid forsvinner i å lete etter dokumenter, svare på
          purringer og sende filer frem og tilbake på e-post.
        </p>
        <p style={sx('margin:0;font-size:16.5px;line-height:1.6;color:rgba(255,255,255,.82)')}>
          Vi mener regnskap skal være et verktøy som hjelper deg å drive lønnsomt — ikke en
          administrativ hindring. Derfor har vi bygget både prismodellen og teknologien vår rundt
          én idé:{' '}
          <strong style={sx('color:#fff')}>
            du skal ha kontroll, uten å bære alt alene.
          </strong>
        </p>
      </div>
    </div>
  );
}
