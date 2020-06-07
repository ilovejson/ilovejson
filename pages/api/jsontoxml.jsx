import formidable from 'formidable';
import { initDirs } from '@utils/initdir';
import { globals } from '@constants/globals';
import { uploadToFTP } from '@utils/ftp';
import { ReE, ReS } from '@utils/reusables';
const convert = require('xml-js');

const isProd = process.env.NODE_ENV === 'production';
const cdnUrl = process.env.CDN_URL || '';

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

  const form = await new formidable.IncomingForm();
  form.uploadDir = uploadDir;
  form.keepExtensions = true;
  await form.parse(req, async (_err, _fields, files) => {
    if (!(files && files.fileInfo)) {
      return ReE(res, 'I ❤️ JSON. But you forgot to bring something to me.');
    }

    var jsonRead = await fs.readFileSync(files?.fileInfo?.path, 'utf8');

    try {
      if (JSON.parse(jsonRead) && !!jsonRead) {
        var xmlOp = await convert.json2xml(jsonRead, xmlOptions);

        const modifiedDate = new Date().getTime();
        const filePath = `${downloadDir}/${modifiedDate}.xml`;
        var toPath = '';
        await fs.writeFileSync(filePath, xmlOp, 'utf8');

        if (isProd) {
          toPath = await filePath.replace('dist/downloads/', '');
          await uploadToFTP(filePath, toPath);
        } else {
          toPath = await filePath.replace('dist/', '');
        }

        return ReS(res, {
          message: 'I ❤️ JSON. JSON to XML Conversion Successful.',
          data: `${cdnUrl}/${toPath}`
        });
      }
    } catch (e) {
      return ReE(res, 'I ❤️ JSON. But you have entered invalid JSON.');
    }
  });
}
