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

const uploadDir = globals.uploadDir + '/yamltojson';
const downloadDir = globals.downloadDir + '/yamltojson';

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

    var yamlRead = fs.readFileSync(files?.fileInfo?.path, 'utf8');
    try {
      const json = await YAML.parse(yamlRead, yamlOptions);
      console.log(json);
      if (!!json) {
        const modifiedDate = new Date().getTime();
        const filePath = `${downloadDir}/${modifiedDate}.json`;
        var toPath = '';
        await fs.writeFileSync(filePath, JSON.stringify(json, undefined, 4), 'utf8');

        if (isProd) {
          toPath = await filePath.replace('dist/downloads/', '');
          await uploadToFTP(filePath, toPath);
        } else {
          toPath = await filePath.replace('dist/', '');
        }

        return ReS(res, {
          message: 'I ❤️ JSON. YAML to JSON Conversion Successful.',
          data: `${cdnUrl}/${toPath}`
        });


      }
    } catch (e) {
      return ReE(res, 'I ❤️ JSON. But you have entered invalid YAML.');
    }
});

}
