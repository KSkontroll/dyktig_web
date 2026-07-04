export type Selskapsform = 'as' | 'enk';
export type Bokforing = 'diy' | 'hybrid' | 'full';
export type Bilag = 'low' | 'medium' | 'high' | 'enterprise';
export type Ansatte = '0' | '1-5' | '6-15' | '15+';
export type Revisorplikt = 'ja' | 'nei' | 'usikker';

export type CalculatorAnswers = {
  selskapsform: Selskapsform;
  bokforing: Bokforing;
  bilag: Bilag;
  ansatte: Ansatte;
  omsetningAar1: number;
  omsetningAar2: number;
  revisorpliktig: Revisorplikt;
};

export type RecommendationResult = {
  title: string;
  description: string;
  estimate: string;
};

export type LeadPayload = CalculatorAnswers & {
  navn: string;
  epost: string;
  telefon: string;
  anbefaling: string;
  estimat: string;
};
