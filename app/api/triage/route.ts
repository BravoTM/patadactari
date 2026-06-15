import { prisma } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { userId, symptoms, severityLevel, recommendedFacilityId, aiGuidance, language } = await request.json();

  const session = await prisma.triageSession.create({
    data: {
      userId,
      symptoms,
      severityLevel,
      recommendedFacilityId,
      aiGuidance,
      language,
    },
  });

  return NextResponse.json(session);
}
