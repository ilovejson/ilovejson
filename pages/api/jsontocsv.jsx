import formidable from 'formidable';
import { initDirs } from '@utils/initdir';
import { globals } from '@constants/globals';
import { uploadToFTP } from '@utils/ftp';
const { Parser } = require('json2csv');

const fs = require('fs');
initDirs();

const uploadDir = globals.uploadDir + '/jsontocsv';
const downloadDir = globals.downloadDir + '/jsontocsv';

export const config = {
  api: {
    bodyParser: false,
  },
}

// Process a POST request
export default async (req, res) => {
  // TODO: This should be in middleware.
  if (req.method !== 'POST') {
    return res.status(403).json({
      success: false,
      message: 'I ❤️ JSON. But you shouldn\'t be here.'
    });
  }

  const form = await new formidable.IncomingForm();
  form.uploadDir = uploadDir;
  form.keepExtensions = true;
  await form.parse(req, async (_err, _fields, files) => {
    if (!(files && files.fileInfo)) {
      return res.status(400).json({
        success: false,
        message: 'I ❤️ JSON. But you forgot to bring something to me.'
      });
    }

    var jsonRead = fs.readFileSync(files?.fileInfo?.path, 'utf8');

    const json2csvParser = await new Parser();
    const csv = await json2csvParser.parse(JSON.parse(jsonRead));

    const modifiedDate = new Date().getTime();
    const filePath = `${downloadDir}/${modifiedDate}.csv`;
    await fs.writeFileSync(filePath, csv, 'utf8');

    const toPath = await filePath.replace('dist/downloads/', '');
    await uploadToFTP(filePath, toPath);

    return res.status(200).json({
      success: true,
      message: 'I ❤️ JSON. CSV Conversion Successful.',
      data: toPath
    });
  });

}
