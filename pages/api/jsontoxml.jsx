import formidable from 'formidable';
const convert = require('xml-js');
var fs = require('fs');

const uploadDir = './public/uploads/jsontoxml';
const downloadDir = './public/downloads/jsontoxml/'

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

    var options = {compact: true, ignoreComment: true, spaces: 4};
    var xmlOp = convert.json2xml(jsonRead, options);

    const modifiedDate = new Date().getTime();
    const writePath = `${downloadDir}${modifiedDate}.xml`;

    fs.writeFileSync(writePath, xmlOp, 'utf8');

    return res.status(200).json({
      success: true,
      message: 'I ❤️ JSON. XML Conversion Successful.',
      data: writePath.replace('./public', '')
    });
  });

}
