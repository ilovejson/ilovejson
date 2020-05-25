import formidable from 'formidable';
const { Parser } = require('json2csv');
var fs = require('fs');

const uploadDir = './public/uploads/jsontocsv';
const downloadDir = './public/downloads/jsontocsv/'

export const config = {
  api: {
    bodyParser: false,
  },
}

// Process a POST request
export default (req, res) => {
  if (req.method !== 'POST') {
    return res.status(403).json({
      success: false,
      message: 'I ❤️ JSON. But you shouldn\'t be here.'
    });
  }

  const form = new formidable.IncomingForm();
  form.uploadDir = uploadDir;
  form.keepExtensions = true;
  form.parse(req, (_err, _fields, files) => {
    if (!(files && files.fileInfo)) {
      return res.status(400).json({
        success: false,
        message: 'I ❤️ JSON. But you forgot to bring something to me.'
      });
    }

    var jsonRead = fs.readFileSync(files?.fileInfo?.path, 'utf8');

    const json2csvParser = new Parser();
    const csv = json2csvParser.parse(JSON.parse(jsonRead));

    const modifiedDate = new Date().getTime();
    const writePath = `${downloadDir}${modifiedDate}.csv`;

    fs.writeFileSync(writePath, csv, 'utf8');

    return res.status(200).json({
      success: true,
      message: 'I ❤️ JSON. CSV Conversion Successful.',
      data: writePath.replace('./public', '')
    });
  });

}
