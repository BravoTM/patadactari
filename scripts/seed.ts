import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

async function main() {
  // Read facilities from data/facilities.json
  const facilitiesPath = path.join(process.cwd(), 'data', 'facilities.json');
  const facilitiesData = JSON.parse(fs.readFileSync(facilitiesPath, 'utf-8'));

  console.log(`Seeding ${facilitiesData.length} facilities...`);

  for (const facility of facilitiesData) {
    await prisma.facility.upsert({
      where: { id: facility.id },
      update: {
        name: facility.name,
        city: facility.city,
        level: facility.level,
        address: facility.address,
        latitude: facility.latitude ? parseFloat(facility.latitude) : null,
        longitude: facility.longitude ? parseFloat(facility.longitude) : null,
        phone: facility.phone,
        hours: facility.hours,
        emergencyCapable: facility.emergencyCapable,
        specialties: facility.specialties,
      },
      create: {
        id: facility.id,
        name: facility.name,
        city: facility.city,
        level: facility.level,
        address: facility.address,
        latitude: facility.latitude ? parseFloat(facility.latitude) : null,
        longitude: facility.longitude ? parseFloat(facility.longitude) : null,
        phone: facility.phone,
        hours: facility.hours,
        emergencyCapable: facility.emergencyCapable,
        specialties: facility.specialties,
      },
    });
  }

  console.log('✅ Seeding complete!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
