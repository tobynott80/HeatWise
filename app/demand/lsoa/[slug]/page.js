import { Suspense } from 'react';
import LSOAMap from './LSOAMap';

export default async function Page({ params }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LSOAMap lsoa={params.slug} />
    </Suspense>
  );
}
