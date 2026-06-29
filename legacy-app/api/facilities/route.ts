import { prisma } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const city = request.nextUrl.searchParams.get('city');
  const emergency = request.nextUrl.searchParams.get('emergency');

  const facilities = await prisma.facility.findMany({
    where: {
      ...(city && { city }),
      ...(emergency === 'true' && { emergencyCapable: true }),
    },
  });

  return NextResponse.json(facilities);
}
