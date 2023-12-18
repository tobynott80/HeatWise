import { promises as fs } from 'fs';

// api/geojson/lad19/ route: get local authority district geojson 2019

// Important: Removed geojson from database due to quota limits - this api route has been deprecated
// Instead, please fetch from a cdn or place geojson in public server folder

export async function GET(request) {
  const file = await fs.readFile(
    process.cwd() + '/public/lad17.geojson',
    'utf8'
  );
  const ladTracs = JSON.parse(file);
  return Response.json(ladTracs);
}