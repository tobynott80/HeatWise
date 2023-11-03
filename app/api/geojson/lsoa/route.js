import { promises as fs } from 'fs';

// api/geojson/lsoa/ route: get a specific lower super output area geojson

export async function GET(request) {
  const lsoaQuery = request.nextUrl.searchParams.get('lsoa');
  if (!lsoaQuery) {
    return Response.json({ error: 'lsoa must not be null' });
  }
  const filePath = `/public/LSOA/${lsoaQuery}.geojson`;
  const file = await fs.readFile(process.cwd() + filePath, 'utf8');
  return Response.json(JSON.parse(file));
}
