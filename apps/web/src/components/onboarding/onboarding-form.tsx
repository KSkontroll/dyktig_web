'use client';

import { FormEvent, useState } from 'react';

import {
  FormGrid,
  FormSection,
  FormSubmitButton,
  FormSuccessCard,
  PrivacyLink,
} from '@/components/forms/form-shell';
import { sx } from '@/lib/site/sx';

const TJENESTER = [
  'Løpende bokføring',
  'Lønnskjøring',
  'MVA-melding',
  'Årsoppgjør',
  'Skattemelding',
  'Fakturering',
  'Økonomisk rådgivning',
  'Tripletex-opplæring',
] as const;

export function OnboardingForm({
  token,
  inviteEmail,
}: {
  token: string;
  inviteEmail: string;
}) {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tjenester, setTjenester] = useState<string[]>([]);
  const [firmaattest, setFirmaattest] = useState<File | null>(null);

  function toggleTjeneste(value: string) {
    setTjenester((current) =>
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value],
    );
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const form = new FormData(event.currentTarget);
    const payload = {
      orgNr: String(form.get('orgNr') ?? ''),
      foretaksnavn: String(form.get('foretaksnavn') ?? ''),
      selskapsform: String(form.get('selskapsform') ?? ''),
      bransje: String(form.get('bransje') ?? ''),
      adresse: String(form.get('adresse') ?? ''),
      kommune: String(form.get('kommune') ?? ''),
      registrertEnhetsreg: String(form.get('registrertEnhetsreg') ?? ''),
      nettside: String(form.get('nettside') ?? ''),
      kontaktNavn: String(form.get('kontaktNavn') ?? ''),
      kontaktRolle: String(form.get('kontaktRolle') ?? ''),
      kontaktEpost: String(form.get('kontaktEpost') ?? ''),
      kontaktTelefon: String(form.get('kontaktTelefon') ?? ''),
      signaturrett: String(form.get('signaturrett') ?? ''),
      reelleRettighetshavere: String(form.get('reelleRettighetshavere') ?? ''),
      eierandeler: String(form.get('eierandeler') ?? ''),
      pep: String(form.get('pep') ?? ''),
      statsborgerskap: String(form.get('statsborgerskap') ?? ''),
      bank: String(form.get('bank') ?? ''),
      dagensSystem: String(form.get('dagensSystem') ?? ''),
      harTripletex: String(form.get('harTripletex') ?? ''),
      forrigeRegnskapsforer: String(form.get('forrigeRegnskapsforer') ?? ''),
      tjenester,
      antallAnsatte: Number(form.get('antallAnsatte') ?? 0),
      omsetningIfjor: String(form.get('omsetningIfjor') ?? '').replace(/\D/g, ''),
      mvaRegistrert: String(form.get('mvaRegistrert') ?? ''),
      revisorpliktig: String(form.get('revisorpliktig') ?? ''),
      oppstartsdato: String(form.get('oppstartsdato') ?? ''),
      tilleggsinfo: String(form.get('tilleggsinfo') ?? ''),
      samtykke: form.get('samtykke') === 'on',
    };

    try {
      let firmaattestUrl: string | null = null;

      if (firmaattest) {
        const uploadData = new FormData();
        uploadData.append('token', token);
        uploadData.append('file', firmaattest);

        const uploadResponse = await fetch('/api/onboarding/upload', {
          method: 'POST',
          body: uploadData,
        });
        const uploadResult = await uploadResponse.json();
        if (!uploadResponse.ok) {
          throw new Error(uploadResult.error ?? 'Kunne ikke laste opp firmaattest.');
        }
        firmaattestUrl = uploadResult.path;
      }

      const response = await fetch('/api/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, firmaattestUrl, token }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error ?? 'Kunne ikke sende skjemaet.');

      setSent(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Noe gikk galt.');
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <FormSuccessCard
        title="Takk! Skjemaet er sendt inn."
        body="Vi har mottatt opplysningene dine og gjennomgår dem nå. Du hører fra oss innen én virkedag med neste steg og en signeringsklar oppdragsavtale."
      />
    );
  }

  return (
    <form onSubmit={handleSubmit} style={sx('display:flex;flex-direction:column;gap:28px')}>
      {error ? (
        <p style={sx('margin:0;padding:14px;border-radius:10px;background:#fff4f4;color:#8b1c1c')}>
          {error}
        </p>
      ) : null}

      <FormSection step={1} title="Selskapsinformasjon">
        <FormGrid>
          <label className="lbl">
            Organisasjonsnummer <span className="req">*</span>
            <input className="fld" name="orgNr" inputMode="numeric" required placeholder="9 siffer" />
          </label>
          <label className="lbl">
            Foretaksnavn <span className="req">*</span>
            <input className="fld" name="foretaksnavn" required placeholder="Bedriften AS" />
          </label>
          <label className="lbl">
            Selskapsform <span className="req">*</span>
            <select className="fld" name="selskapsform" required defaultValue="">
              <option value="" disabled>Velg …</option>
              <option>Aksjeselskap (AS)</option>
              <option>Enkeltpersonforetak (ENK)</option>
              <option>Ansvarlig selskap (ANS/DA)</option>
              <option>Norskregistrert utenlandsk foretak (NUF)</option>
              <option>Annet</option>
            </select>
          </label>
          <label className="lbl">
            Bransje / NACE
            <input className="fld" name="bransje" placeholder="f.eks. konsulentvirksomhet" />
          </label>
          <label className="lbl">
            Forretningsadresse <span className="req">*</span>
            <input className="fld" name="adresse" required placeholder="Gate, postnr, sted" />
          </label>
          <label className="lbl">
            Kommune <span className="req">*</span>
            <input className="fld" name="kommune" required placeholder="f.eks. Oslo" />
          </label>
          <label className="lbl">
            Registrert i Enhetsregisteret? <span className="req">*</span>
            <select className="fld" name="registrertEnhetsreg" required defaultValue="">
              <option value="" disabled>Velg …</option>
              <option>Ja</option>
              <option>Nei</option>
              <option>Under registrering</option>
            </select>
          </label>
          <label className="lbl">
            Nettside
            <input className="fld" name="nettside" placeholder="www.bedriften.no" />
          </label>
          <label className="lbl" style={sx('grid-column:1 / -1')}>
            Last opp firmaattest{' '}
            <span style={sx('font-weight:500;color:rgba(30,37,34,.5)')}>(PDF/bilde, valgfritt)</span>
            <input
              className="fld"
              type="file"
              accept=".pdf,image/*"
              style={sx('padding:10px')}
              onChange={(event) => setFirmaattest(event.target.files?.[0] ?? null)}
            />
          </label>
        </FormGrid>
      </FormSection>

      <FormSection step={2} title="Kontaktperson">
        <FormGrid>
          <label className="lbl">
            Navn <span className="req">*</span>
            <input className="fld" name="kontaktNavn" required placeholder="For- og etternavn" />
          </label>
          <label className="lbl">
            Rolle i selskapet <span className="req">*</span>
            <input className="fld" name="kontaktRolle" required placeholder="f.eks. daglig leder" />
          </label>
          <label className="lbl">
            E-postadresse <span className="req">*</span>
            <input
              className="fld"
              name="kontaktEpost"
              type="email"
              required
              defaultValue={inviteEmail}
              placeholder="navn@bedriften.no"
            />
          </label>
          <label className="lbl">
            Telefon / mobil <span className="req">*</span>
            <input className="fld" name="kontaktTelefon" type="tel" required placeholder="+47 …" />
          </label>
          <label className="lbl" style={sx('grid-column:1 / -1')}>
            Kan du signere på vegne av bedriften? <span className="req">*</span>
            <select className="fld" name="signaturrett" required defaultValue="">
              <option value="" disabled>Velg …</option>
              <option>Ja — jeg har signaturrett</option>
              <option>Nei — en annen signerer</option>
              <option>Usikker</option>
            </select>
          </label>
        </FormGrid>
      </FormSection>

      <FormSection
        step={3}
        title="Eiere og reelle rettighetshavere"
        hint="Påkrevd for kundekontroll etter hvitvaskingsloven. Oppgi alle som eier eller kontrollerer 25 % eller mer."
      >
        <FormGrid>
          <label className="lbl">
            Reelle rettighetshavere (navn) <span className="req">*</span>
            <input className="fld" name="reelleRettighetshavere" required placeholder="Navn, evt. flere adskilt med komma" />
          </label>
          <label className="lbl">
            Eierandel(er) <span className="req">*</span>
            <input className="fld" name="eierandeler" required placeholder="f.eks. 60 % / 40 %" />
          </label>
          <label className="lbl">
            Er noen av eierne politisk eksponert person (PEP)? <span className="req">*</span>
            <select className="fld" name="pep" required defaultValue="">
              <option value="" disabled>Velg …</option>
              <option>Nei</option>
              <option>Ja</option>
              <option>Usikker</option>
            </select>
          </label>
          <label className="lbl">
            Statsborgerskap til eier(e)
            <input className="fld" name="statsborgerskap" placeholder="f.eks. norsk" />
          </label>
        </FormGrid>
      </FormSection>

      <FormSection step={4} title="Bank og systemer">
        <FormGrid>
          <label className="lbl">
            Bankforbindelse
            <input className="fld" name="bank" placeholder="f.eks. DNB, Sparebank 1" />
          </label>
          <label className="lbl">
            Dagens regnskapssystem
            <input className="fld" name="dagensSystem" placeholder="f.eks. Tripletex, Fiken, ingen" />
          </label>
          <label className="lbl">
            Har dere Tripletex fra før? <span className="req">*</span>
            <select className="fld" name="harTripletex" required defaultValue="">
              <option value="" disabled>Velg …</option>
              <option>Ja</option>
              <option>Nei</option>
              <option>Vil ha hjelp til å opprette</option>
            </select>
          </label>
          <label className="lbl">
            Nåværende / forrige regnskapsfører
            <input className="fld" name="forrigeRegnskapsforer" placeholder="Navn på byrå (hvis noen)" />
          </label>
        </FormGrid>
      </FormSection>

      <FormSection step={5} title="Hvilke tjenester ønsker du?">
        <div style={sx('display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px')}>
          {TJENESTER.map((label) => (
            <label
              key={label}
              style={sx(
                'display:flex;align-items:center;gap:10px;padding:14px;border:1.5px solid rgba(30,37,34,.14);border-radius:11px;cursor:pointer;font-size:14.5px;font-weight:600;color:var(--c-p)',
              )}
            >
              <input
                type="checkbox"
                checked={tjenester.includes(label)}
                onChange={() => toggleTjeneste(label)}
                style={sx('width:17px;height:17px;accent-color:var(--c-a)')}
              />
              {label}
            </label>
          ))}
        </div>
      </FormSection>

      <FormSection step={6} title="Regnskapsdetaljer">
        <FormGrid>
          <label className="lbl">
            Antall ansatte med lønn <span className="req">*</span>
            <input className="fld" name="antallAnsatte" type="number" min={0} required placeholder="0" />
          </label>
          <label className="lbl">
            Omsetning ifjor (kr)
            <input className="fld" name="omsetningIfjor" inputMode="numeric" placeholder="f.eks. 2 500 000" />
          </label>
          <label className="lbl">
            Er selskapet MVA-registrert? <span className="req">*</span>
            <select className="fld" name="mvaRegistrert" required defaultValue="">
              <option value="" disabled>Velg …</option>
              <option>Ja</option>
              <option>Nei</option>
              <option>Skal registreres</option>
            </select>
          </label>
          <label className="lbl">
            Er selskapet revisorpliktig? <span className="req">*</span>
            <select className="fld" name="revisorpliktig" required defaultValue="">
              <option value="" disabled>Velg …</option>
              <option>Nei</option>
              <option>Ja</option>
              <option>Usikker</option>
            </select>
          </label>
          <label className="lbl">
            Ønsket oppstartsdato
            <input className="fld" name="oppstartsdato" placeholder="f.eks. snarest / 01.01" />
          </label>
        </FormGrid>
        <label className="lbl" style={sx('margin-top:16px')}>
          Er det noe mer vi bør vite?
          <textarea
            className="fld"
            name="tilleggsinfo"
            rows={3}
            style={sx('resize:vertical')}
            placeholder="Frivillig — spesielle behov, tidligere utfordringer, ol."
          />
        </label>
      </FormSection>

      <FormSection step={7} title="Samtykke">
        <label style={sx('display:flex;align-items:flex-start;gap:12px;cursor:pointer')}>
          <input
            type="checkbox"
            name="samtykke"
            required
            style={sx('width:18px;height:18px;margin-top:2px;accent-color:var(--c-a)')}
          />
          <span style={sx('font-size:14.5px;line-height:1.55;color:rgba(30,37,34,.8)')}>
            Jeg bekrefter at opplysningene er korrekte, og samtykker til at Dyktig Regnskapsfører AS
            behandler dem for å opprette kundeforhold og oppdragsavtale, i tråd med{' '}
            <PrivacyLink />. <span className="req">*</span>
          </span>
        </label>
      </FormSection>

      <FormSubmitButton disabled={loading}>
        {loading ? 'Sender …' : 'Send inn skjemaet'}
      </FormSubmitButton>
    </form>
  );
}
