import formidable from 'formidable';
const { Parser } = require('json2csv');
var fs = require('fs');

export const config = {
  api: {
    bodyParser: false,
  },
}

// Process a POST request
export default (req, res) => {
  if (req.method === 'POST') {
    const form = new formidable.IncomingForm();
    form.uploadDir = './public/uploads/jsontocsv';
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
      fs.readFile(files.fileInfo.path, 'utf8', function(err, contents) {
        //console.log(err, fields, files);

        const json2csvParser = new Parser();
        const csv = json2csvParser.parse(JSON.parse(contents));
        
        fs.writeFile('public/downloads/jsontocsv/'+ files.fileInfo.lastModifiedDate +'.csv', csv, function(err) {
          if (err) throw err
          res.status(200).json({ text: 'I ❤️ JSON. Converted to CSV at "public/downloads/jsontocsv/'+ files.fileInfo.lastModifiedDate +'.csv"' })
        });

      });
    });

  } else {
    // Handle any other HTTP method
    res.status(200).json({ text: 'I ❤️ JSON. But you shouldn\'t be here' })
  }
  
}
