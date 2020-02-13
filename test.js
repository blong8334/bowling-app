const ocr = require('ocr');

const basePath = '/Users/brianlong/Desktop';

const params = {
  input: `${basePath}/scoring.bmp`,
  output: `${basePath}/results.txt`,
  format: 'text'
};

ocr.recognize(params, (err, document) => {
  if (err)
    console.error(err);
  else {
    //output the document object: 
    console.log(document);
  }
});