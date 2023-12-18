import csvParser from 'csv-parser';
import { Readable } from 'stream';

export async function parseCSV(buffer) {
  const results = [];

  // Convert the buffer into a stream
  const readable = new Readable({
    read() {
      this.push(buffer);
      this.push(null); // No more data
    }
  });

  return new Promise((resolve, reject) => {
    readable
      .pipe(csvParser())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (error) => reject(error));
  });
}
