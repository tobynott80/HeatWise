import { PrismaClient } from '@prisma/client';
// api/geojson/lad/ route: get local authority district geojson

export async function GET(request) {
  const prisma = new PrismaClient();
  // Prisma doesn't support postgis yet, so we use a raw query
  const data = await prisma.$queryRaw`
  SELECT json_build_object(
    'type', 'FeatureCollection',
    'features', json_agg(
      json_build_object(
        'type', 'Feature',
        'geometry', ST_AsGeoJSON(geom)::json,
        'properties', json_build_object(
          'id', "id",
          'LAD13CD', "LAD13CD",
          'LAD13CDO', "LAD13CDO",
          'LAD13NM', "LAD13NM",
          'LAD13NMW', "LAD13NMW"
        )
      )
    )
  )
  FROM "lad_eng_wal";
`;

  return Response.json(data[0].json_build_object);
}
