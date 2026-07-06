export type Aksjonaer = {
  navn: string;
  eierandel: string;
};

export const MAX_AKSJONAERER = 5;

export type OnboardingPayload = {
  orgNr: string;
  foretaksnavn: string;
  selskapsform: string;
  bransje: string;
  adresse: string;
  kommune: string;
  registrertEnhetsreg: string;
  nettside: string;
  firmaattestUrl: string;
  kontaktNavn: string;
  kontaktRolle: string;
  kontaktEpost: string;
  kontaktTelefon: string;
  signaturrett: string;
  aksjonaerer: Aksjonaer[];
  pep: string;
  statsborgerskap: string;
  bank: string;
  dagensSystem: string;
  harTripletex: string;
  forrigeRegnskapsforer: string;
  tjenester: string[];
  antallAnsatte: number;
  omsetningIfjor: string;
  mvaRegistrert: string;
  revisorpliktig: string;
  oppstartsdato: string;
  tilleggsinfo: string;
  samtykke: boolean;
};

export function formatAksjonaererSummary(aksjonaerer: Aksjonaer[]) {
  return {
    reelleRettighetshavere: aksjonaerer.map((a) => a.navn).join(' · '),
    eierandeler: aksjonaerer.map((a) => `${a.navn}: ${a.eierandel}`).join(' · '),
  };
}

function validateAksjonaerer(
  aksjonaerer: unknown,
): { ok: true; data: Aksjonaer[] } | { ok: false; error: string } {
  if (!Array.isArray(aksjonaerer) || aksjonaerer.length < 1) {
    return { ok: false, error: 'Oppgi minst én aksjonær.' };
  }

  if (aksjonaerer.length > MAX_AKSJONAERER) {
    return { ok: false, error: `Du kan legge til maks ${MAX_AKSJONAERER} aksjonærer.` };
  }

  const normalized: Aksjonaer[] = [];

  for (const item of aksjonaerer) {
    if (!item || typeof item !== 'object') {
      return { ok: false, error: 'Ugyldig aksjonærdata.' };
    }

    const entry = item as Partial<Aksjonaer>;
    const navn = typeof entry.navn === 'string' ? entry.navn.trim() : '';
    const eierandel = typeof entry.eierandel === 'string' ? entry.eierandel.trim() : '';

    if (!navn || !eierandel) {
      return { ok: false, error: 'Hver aksjonær må ha navn og eierandel.' };
    }

    normalized.push({ navn, eierandel });
  }

  return { ok: true, data: normalized };
}

export function validateOnboardingPayload(payload: unknown):
  | { ok: true; data: OnboardingPayload }
  | { ok: false; error: string } {
  if (!payload || typeof payload !== 'object') {
    return { ok: false, error: 'Ugyldig data.' };
  }

  const p = payload as Partial<OnboardingPayload>;
  const requiredText = [
    ['orgNr', p.orgNr],
    ['foretaksnavn', p.foretaksnavn],
    ['selskapsform', p.selskapsform],
    ['adresse', p.adresse],
    ['kommune', p.kommune],
    ['registrertEnhetsreg', p.registrertEnhetsreg],
    ['kontaktNavn', p.kontaktNavn],
    ['kontaktRolle', p.kontaktRolle],
    ['kontaktEpost', p.kontaktEpost],
    ['kontaktTelefon', p.kontaktTelefon],
    ['signaturrett', p.signaturrett],
    ['pep', p.pep],
    ['harTripletex', p.harTripletex],
    ['mvaRegistrert', p.mvaRegistrert],
    ['revisorpliktig', p.revisorpliktig],
  ] as const;

  for (const [, value] of requiredText) {
    if (!value || typeof value !== 'string' || value.trim().length < 1) {
      return { ok: false, error: 'Alle obligatoriske felt må fylles ut.' };
    }
  }

  if (!Array.isArray(p.tjenester)) {
    return { ok: false, error: 'Velg minst én tjeneste.' };
  }

  if (!p.samtykke) {
    return { ok: false, error: 'Du må samtykke før innsending.' };
  }

  if (typeof p.antallAnsatte !== 'number' || p.antallAnsatte < 0) {
    return { ok: false, error: 'Antall ansatte er ugyldig.' };
  }

  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(p.kontaktEpost ?? '')) {
    return { ok: false, error: 'Ugyldig e-postadresse.' };
  }

  if (!p.firmaattestUrl || typeof p.firmaattestUrl !== 'string' || !p.firmaattestUrl.trim()) {
    return { ok: false, error: 'Firmaattest må lastes opp.' };
  }

  const aksjonaererResult = validateAksjonaerer(p.aksjonaerer);
  if (!aksjonaererResult.ok) {
    return aksjonaererResult;
  }

  return {
    ok: true,
    data: {
      orgNr: p.orgNr!.trim(),
      foretaksnavn: p.foretaksnavn!.trim(),
      selskapsform: p.selskapsform!.trim(),
      bransje: (p.bransje ?? '').trim(),
      adresse: p.adresse!.trim(),
      kommune: p.kommune!.trim(),
      registrertEnhetsreg: p.registrertEnhetsreg!.trim(),
      nettside: (p.nettside ?? '').trim(),
      firmaattestUrl: p.firmaattestUrl.trim(),
      kontaktNavn: p.kontaktNavn!.trim(),
      kontaktRolle: p.kontaktRolle!.trim(),
      kontaktEpost: p.kontaktEpost!.trim(),
      kontaktTelefon: p.kontaktTelefon!.trim(),
      signaturrett: p.signaturrett!.trim(),
      aksjonaerer: aksjonaererResult.data,
      pep: p.pep!.trim(),
      statsborgerskap: (p.statsborgerskap ?? '').trim(),
      bank: (p.bank ?? '').trim(),
      dagensSystem: (p.dagensSystem ?? '').trim(),
      harTripletex: p.harTripletex!.trim(),
      forrigeRegnskapsforer: (p.forrigeRegnskapsforer ?? '').trim(),
      tjenester: p.tjenester,
      antallAnsatte: p.antallAnsatte,
      omsetningIfjor: (p.omsetningIfjor ?? '').trim(),
      mvaRegistrert: p.mvaRegistrert!.trim(),
      revisorpliktig: p.revisorpliktig!.trim(),
      oppstartsdato: (p.oppstartsdato ?? '').trim(),
      tilleggsinfo: (p.tilleggsinfo ?? '').trim(),
      samtykke: true,
    },
  };
}
