import * as fs from 'fs';
import * as path from 'path';
import * as Textract from 'aws-sdk/clients/textract';

const options = {
  apiVersion: '2018-06-27',
  region: 'us-east-1',
  logger: console.log.bind(console),
};
const textract = new Textract(options);
const resultsPath = path.resolve(__dirname, '../data/results.json');

function getImage(imageName: string): Buffer {
  const imagePath = path.resolve(__dirname, '../data', imageName);
  const image = fs.readFileSync(imagePath);
  return Buffer.from(image);
}

async function getDocumentText(Bytes: Buffer): Promise<{}> {
  const params = { Document: { Bytes }, FeatureTypes: ['TABLES'] };
  const results = await new Promise((resolve, reject) => {
    textract.analyzeDocument(params, (err, data) => {
      if (err) {
        return reject(err);
      }
      return resolve(data);
    });
  });
  fs.writeFileSync(resultsPath, JSON.stringify(results, null, 2));
  return results;
}

export function getText(imageName: string): Promise<{}> {
  try {
    const image = getImage(imageName);
    return getDocumentText(image);
  } catch (err) {
    console.error(err);
  }
}