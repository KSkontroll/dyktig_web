import { NextResponse } from 'next/server';

import { buildRecommendation } from '@/lib/calculator/recommendation';
import { validateCalculatorAnswers } from '@/lib/validation/lead';

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const validated = validateCalculatorAnswers(payload);

    if (!validated.ok) {
      return NextResponse.json({ error: validated.error }, { status: 400 });
    }

    const recommendation = buildRecommendation(validated.data);

    return NextResponse.json(recommendation);
  } catch {
    return NextResponse.json({ error: 'Kunne ikke behandle forespørselen.' }, { status: 500 });
  }
}
