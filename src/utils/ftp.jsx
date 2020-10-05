const ftp = require("basic-ftp");

export const uploadToFTP = async (filePath, toPath) => {
  const client = new ftp.Client();
  client.ftp.verbose = true
  try {
    await client.access({
      host: process.env.FTP_HOST,
      user: process.env.FTP_USER,
      password: process.env.FTP_PASS,
      secure: false
    });
    await client.uploadFrom(filePath, toPath);
  } catch (err) {
    console.log(err);
  }
  client.close();
}
