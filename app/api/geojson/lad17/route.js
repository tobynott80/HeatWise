import { promises as fs } from 'fs';

// api/geojson/lad17/ route: get local authority district geojson 2017

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

// This function is for getting geojson from the database using POSTGIS -- see deprecation above
// export async function GET(request) {
//   const prisma = new PrismaClient();
//   // Prisma doesn't support postgis yet, so we use a raw query
//   const data = await prisma.$queryRaw`
//   SELECT json_build_object(
//     'type', 'FeatureCollection',
//     'features', json_agg(
//       json_build_object(
//         'type', 'Feature',
//         'geometry', ST_AsGeoJSON(geom)::json,
//         'properties', json_build_object(
//           'id', "id",
//           'LAD13CD', "LAD13CD",
//           'LAD13CDO', "LAD13CDO",
//           'LAD13NM', "LAD13NM",
//           'LAD13NMW', "LAD13NMW"
//         )
//       )
//     )
//   )
//   FROM "lad_eng_wal";
// `;

//   return Response.json(data[0].json_build_object);
// }
