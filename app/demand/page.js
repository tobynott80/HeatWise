import { Suspense } from 'react';
import LADMap from './LADMap';

export default async function Page({}) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LADMap />
    </Suspense>
  );
}
