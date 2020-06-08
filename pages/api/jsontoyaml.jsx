import formidable from 'formidable';
import { initDirs } from '@utils/initdir';
import { globals } from '@constants/globals';
import { uploadToFTP } from '@utils/ftp';
import YAML from 'yaml';
import { ReE, ReS } from '@utils/reusables';

const isProd = process.env.NODE_ENV === 'production';
const cdnUrl = process.env.CDN_URL || '';

const fs = require('fs');
initDirs();

const uploadDir = globals.uploadDir + '/jsontoyaml';
const downloadDir = globals.downloadDir + '/jsontoyaml';

export const config = {
  api: {
    bodyParser: false,
  },
}

const yamlOptions = {
  indent: 4,
  prettyErrors: true,
};

// Process a POST request
export default async (req, res) => {
  // TODO: This should be in middleware.
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

    var jsonRead = fs.readFileSync(files?.fileInfo?.path, 'utf8');
    try {
      if (JSON.parse(jsonRead) && !!jsonRead) {
        const yaml = await YAML.stringify(JSON.parse(jsonRead), yamlOptions);

        const modifiedDate = new Date().getTime();
        const filePath = `${downloadDir}/${modifiedDate}.yml`;
        var toPath = '';
        await fs.writeFileSync(filePath, yaml, 'utf8');

        if (isProd) {
          toPath = await filePath.replace('dist/downloads/', '');
          await uploadToFTP(filePath, toPath);
        } else {
          toPath = await filePath.replace('dist/', '');
        }

        return ReS(res, {
          message: 'I ❤️ JSON. JSON to YAML Conversion Successful.',
          data: `${cdnUrl}/${toPath}`
        });


      }
    } catch (e) {
      return ReE(res, 'I ❤️ JSON. But you have entered invalid JSON.');
    }
});

}
