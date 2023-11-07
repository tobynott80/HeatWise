import { Suspense } from 'react';
import LSOAMap from './LSOAMap';
import { PrismaClient } from '@prisma/client';

export async function generateStaticParams() {
  const prisma = new PrismaClient();
  const data = await prisma.heatDemand.findMany();

  return data.map((heatData) => ({
    slug: heatData[0]
  }));
}

export default async function Page({ params }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LSOAMap lsoa={params.slug} />
    </Suspense>
  );
}
