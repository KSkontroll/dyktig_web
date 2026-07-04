import type { LeadPayload } from '@/lib/calculator/types';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateLeadPayload(payload: unknown):
  | { ok: true; data: LeadPayload }
  | { ok: false; error: string } {
  if (!payload || typeof payload !== 'object') {
    return { ok: false, error: 'Ugyldig forespørsel.' };
  }

  const value = payload as Record<string, unknown>;
  const navn = String(value.navn ?? '').trim();
  const epost = String(value.epost ?? '').trim();
  const telefon = String(value.telefon ?? '').trim();

  if (navn.length < 2) {
    return { ok: false, error: 'Navn må fylles ut.' };
  }

  if (!EMAIL_PATTERN.test(epost)) {
    return { ok: false, error: 'Ugyldig e-postadresse.' };
  }

  if (telefon.replace(/\D/g, '').length < 8) {
    return { ok: false, error: 'Telefonnummer må fylles ut.' };
  }

  const omsetningAar1 = Number(value.omsetningAar1);
  const omsetningAar2 = Number(value.omsetningAar2);

  if (!Number.isFinite(omsetningAar1) || omsetningAar1 < 0) {
    return { ok: false, error: 'Ugyldig omsetning for siste år.' };
  }

  if (!Number.isFinite(omsetningAar2) || omsetningAar2 < 0) {
    return { ok: false, error: 'Ugyldig omsetning for året før.' };
  }

  const requiredFields = [
    'selskapsform',
    'bokforing',
    'bilag',
    'ansatte',
    'revisorpliktig',
    'anbefaling',
    'estimat',
  ] as const;

  for (const field of requiredFields) {
    if (!value[field] || typeof value[field] !== 'string') {
      return { ok: false, error: 'Manglende kalkulatordata.' };
    }
  }

  return {
    ok: true,
    data: {
      navn,
      epost,
      telefon,
      selskapsform: value.selskapsform as LeadPayload['selskapsform'],
      bokforing: value.bokforing as LeadPayload['bokforing'],
      bilag: value.bilag as LeadPayload['bilag'],
      ansatte: value.ansatte as LeadPayload['ansatte'],
      omsetningAar1,
      omsetningAar2,
      revisorpliktig: value.revisorpliktig as LeadPayload['revisorpliktig'],
      anbefaling: String(value.anbefaling),
      estimat: String(value.estimat),
    },
  };
}

export function validateCalculatorAnswers(payload: unknown):
  | { ok: true; data: Omit<LeadPayload, 'navn' | 'epost' | 'telefon' | 'anbefaling' | 'estimat'> }
  | { ok: false; error: string } {
  const partial = validateLeadPayload({
    navn: 'Test Testesen',
    epost: 'test@example.com',
    telefon: '12345678',
    anbefaling: 'placeholder',
    estimat: 'placeholder',
    ...((payload as object) ?? {}),
  });

  if (!partial.ok) {
    return partial;
  }

  const { navn: _n, epost: _e, telefon: _t, anbefaling: _a, estimat: _es, ...answers } =
    partial.data;

  return { ok: true, data: answers };
}
