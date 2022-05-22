import { IncomingForm } from 'formidable';
import { initDirs } from '@utils/initdir';
import { globals } from '@constants/globals';
import { ReE, ReS } from '@utils/reusables';
const convert = require('xml-js');

const fs = require('fs');
initDirs();

const uploadDir = globals.uploadDir + '/jsontoxml';
const downloadDir = globals.downloadDir + '/jsontoxml';

export const config = {
  api: {
    bodyParser: false,
  },
}

const xmlOptions = {
  compact: true, // BUGGY
  ignoreComment: true,
  spaces: 4
}

// Process a POST request
export default async (req, res) => {
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

  var jsonRead = fs.readFileSync(data.files?.fileInfo?.filepath, 'utf8');

  try {
    if (JSON.parse(jsonRead) && !!jsonRead) {
      var xmlOp = convert.json2xml(jsonRead, xmlOptions);

      const modifiedDate = new Date().getTime();
      const filePath = `${downloadDir}/${modifiedDate}.xml`;
      fs.writeFileSync(filePath, xmlOp, 'utf8');

      let toPath = filePath.replace('public/', '');

      return ReS(res, {
        message: 'I ❤️ JSON. JSON to XML Conversion Successful.',
        data: `/${toPath}`
      });
    }
  } catch (e) {
    return ReE(res, 'I ❤️ JSON. But you have entered invalid JSON.');
  }
}
