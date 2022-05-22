import { IncomingForm } from 'formidable';
import { initDirs } from '@utils/initdir';
import { globals } from '@constants/globals';
import { ReE, ReS } from '@utils/reusables';
const convert = require('xml-js');

const fs = require('fs');
initDirs();

const uploadDir = globals.uploadDir + '/xmltojson';
const downloadDir = globals.downloadDir + '/xmltojson';

export const config = {
  api: {
    bodyParser: false,
  },
}

const jsonOptions = {
  ignoreComment: true,
  alwaysChildren: true,
  compact: true,
  spaces: 4
};

// Process a POST request
export default async (req, res) => {
  // TODO: This should be in middleware.
  if (req.method !== 'POST') {
    return ReE(res, 'I ❤️ JSON. But you shouldn\'t be here.');
  }

  // parse form with a Promise wrapper
  const data = await new Promise((resolve, reject) => {
    const form = new IncomingForm();
    form.uploadDir = uploadDir;
    form.keepExtensions = true;
    form.parse(req, async (_err, _fields, files) => {
      if (_err) return reject(_err);
      resolve({ _fields, files });
    });
  });

  if (!(data.files && data.files.fileInfo)) {
    return ReE(res, 'I ❤️ JSON. But you forgot to bring something to me.');
  }

  // Read the file - what's new?
  var xmlRead = fs.readFileSync(data.files?.fileInfo?.filepath, 'utf8');

  try {
    // Convert it to XML -> Json
    var jsonContent = convert.xml2json(xmlRead, jsonOptions);

    // Is it converted?
    if (!!jsonContent) {
      const modifiedDate = new Date().getTime();
      const filePath = `${downloadDir}/${modifiedDate}.json`;
      fs.writeFileSync(filePath, jsonContent, 'utf8');

      let toPath = filePath.replace('public/', '');

      // Parsed
      return ReS(res, {
        message: 'I ❤️ JSON. XML to JSON Conversion Successful.',
        data: `/${toPath}`
      });

    }
  } catch (e) {
    return ReE(res, 'I ❤️ JSON. But you have entered invalid XML.');
  }

}
