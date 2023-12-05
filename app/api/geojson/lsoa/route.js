import { promises as fs } from 'fs';

// api/geojson/lsoa/ route: get a specific local authority district and its lsoa bounderies geojson

export async function GET(request) {
  const ladQuery = request.nextUrl.searchParams.get('lad');
  if (!ladQuery) {
    return Response.json({ error: 'lad must not be null' });
  }
  const filePath = `/public/LSOA/${ladQuery}.geojson`;
  const file = await fs.readFile(process.cwd() + filePath, 'utf8');
  return Response.json(JSON.parse(file));
}
