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

  const form = await new formidable.IncomingForm();
  form.uploadDir = uploadDir;
  form.keepExtensions = true;
  
  await form.parse(req, async (_err, _fields, files) => {
    if (!(files && files.fileInfo)) {
      return ReE(res, 'I ❤️ JSON. But you forgot to bring something to me.');
    }
    // Read the file - what's new?
    var xmlRead = fs.readFileSync(files?.fileInfo?.path, 'utf8');
    
    try {
      //Convert it to XML -> Json
      var jsonContent = await convert.xml2json(xmlRead, jsonOptions);
      
      //Is it converted?
      if (!!jsonContent) {

        const modifiedDate = new Date().getTime();
        const filePath = `${downloadDir}/${modifiedDate}.json`;
        var toPath = '';
        await fs.writeFileSync(filePath, jsonContent, 'utf8');

        if (isProd) {
          toPath = await filePath.replace('dist/downloads/', '');
          await uploadToFTP(filePath, toPath);
        } else {
          toPath = await filePath.replace('dist/', '');
        }
        
        //Parsed
        return ReS(res, {
          message: 'I ❤️ JSON. XML to JSON Conversion Successful.',
          data: `${cdnUrl}/${toPath}`
        });

      }
    } catch (e) {
      return ReE(res, 'I ❤️ JSON. But you have entered invalid XML.');
    }
  });

}