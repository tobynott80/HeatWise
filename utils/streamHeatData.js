const fs = require('fs');
const csv = require('csv-parser');
const { PrismaClient } = require('@prisma/client');
const path = require('path');

const prisma = new PrismaClient();

async function seedHeatDemandData() {
  const stream = fs.createReadStream(path.join(__dirname, 'data2021.csv')).pipe(csv());

  for await (const row of stream) {
    const rowArray = Object.values(row);  // Convert the row object into an array

    //  LOSA11CD is the first column (0), before demand is the 55th column (54) and after demand is the 56th column (55)
    const lsoaId = rowArray[0];
    const before = parseFloat(rowArray[54]);  // Convert from string to float
    const after = parseFloat(rowArray[55]);   // Convert from string to float
  
    // Insert data into db using Prisma
    await prisma.heatDemand.create({
      data: {
        lsoaId,
        before: parseFloat(before),  // Convert from string to float
        after: parseFloat(after),    // Convert from string to float
      },
    }).catch(e => {
      console.error(`Error inserting data for LSOA ID ${lsoaId}: `, e);
    });
  }

  await prisma.$disconnect();  // Close the Prisma Client connection
}

seedHeatDemandData()
  .then(() => console.log('Data seeding completed'))
  .catch((e) => {
    console.error('Data seeding failed: ', e);
  });
