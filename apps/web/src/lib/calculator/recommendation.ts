import { formatThousands } from '@/lib/site/format';

import type {
  CalculatorAnswers,
  RecommendationResult,
} from './types';

function buildEstimate(
  answers: CalculatorAnswers,
  monthlyPrice: number,
): string {
  const yearlyClosing = answers.revisorpliktig === 'ja' ? 35_000 : 25_000;
  let estimate =
    'Estimert månedspris: kr ' +
    formatThousands(monthlyPrice) +
    ',- eks. mva. I tillegg kommer årsregnskap og skattemelding ved levering året etter: kr ' +
    formatThousands(yearlyClosing) +
    ',- ' +
    (answers.revisorpliktig === 'ja'
      ? '(revisorpliktig selskap).'
      : '(AS under 7 mill-grensen).');

  if (answers.revisorpliktig === 'ja') {
    estimate += ' Revisorpliktig: vi koordinerer med revisor ved årsavslutning.';
  } else if (answers.revisorpliktig === 'usikker') {
    estimate += ' Usikker på revisorplikt? Vi avklarer det i gjennomgangen.';
  }

  return estimate;
}

export function buildRecommendation(
  answers: CalculatorAnswers,
): RecommendationResult {
  if (answers.bokforing === 'diy') {
    return {
      title: 'Pay As You Go',
      description:
        'Siden du fører regnskapet selv i Tripletex, anbefaler vi Pay As You Go. Du betaler kun for faktiske timer brukt på kvalitetssikring, support og årsoppgjør. Ingen månedlige faste kostnader.',
      estimate:
        'Estimerte kostnader: Timepris kr 1 100,- for kvalitetssikring og support ved behov.',
    };
  }

  if (
    answers.bokforing === 'hybrid' &&
    answers.bilag !== 'high' &&
    answers.bilag !== 'enterprise'
  ) {
    return {
      title: 'Pay As You Go (Kombinert)',
      description:
        'Du gjør litt selv, og vi hjelper deg med resten (MVA-melding og kontroll). Dette holder kostnadene nede, og du betaler kun for arbeidet vi faktisk utfører.',
      estimate: 'Estimerte kostnader baseres på medgått tid per kvartal.',
    };
  }

  const averageRevenue =
    (answers.omsetningAar1 + answers.omsetningAar2) / 2;
  const monthlyPrice = Math.round(averageRevenue * 0.03 / 12);

  return {
    title: 'Forutsigbar Fastpris',
    description:
      'For å gi deg fullstendig ro og forutsigbarhet anbefaler vi fastpris. Vi overtar alt av bokføring, lønnskjøring og MVA, slik at du slipper å tenke på frister.',
    estimate: buildEstimate(answers, monthlyPrice),
  };
}
