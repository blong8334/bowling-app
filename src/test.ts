import * as fs from 'fs';
import * as path from 'path';
import * as Textract from 'aws-sdk/clients/textract';

const options = {
  apiVersion: '2018-06-27',
  region: 'us-east-1',
  logger: console.log.bind(console),
};
const textract = new Textract(options);
const imagePath = path.resolve(__dirname, 'test.png');
const resultsPath = path.resolve(__dirname, 'results.json');

function getImage(): Buffer {
  const image = fs.readFileSync(imagePath);
  return Buffer.from(image);
}

async function getDocumentText(Bytes: Buffer): Promise<void> {
  const params = { Document: { Bytes }, FeatureTypes: ['TABLES', 'FORMS'] };
  const results = await new Promise((resolve, reject) => {
    textract.analyzeDocument(params, (err, data) => {
      if (err) {
        return reject(err);
      }
      return resolve(data);
    });
  });
  fs.writeFileSync(resultsPath, JSON.stringify(results, null, 2));
}

(async function main(): Promise<void> {
  try {
    const image = getImage();
    await getDocumentText(image);
    console.log(`Wrote results to ${resultsPath}`);
  } catch (err) {
    console.error(err);
  }
})();