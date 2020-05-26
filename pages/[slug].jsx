import { useRouter } from 'next/router';
import React, { useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { post } from 'axios';

import Layout from '@components/layout';
import { globals } from '@constants/globals';

const activeStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};

// TODO: Convert it in to actual component
const Convert = () => {
  const router = useRouter()
  const { slug } = router.query;
  const title = slug?.replace(/-/g, ' ');
  const api = slug?.replace(/-/g, '');

  const [downloadLink, setDownloadLink] = useState(null);

  const maxSize = 1048576;

  const handleSubmit = (e) => {
    if (acceptedFiles.length) {
      const formData = new FormData();
      formData.append('fileInfo', acceptedFiles[0])
      const config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      }
      post(`${globals.apiUrl}/${api}`, formData, config).then((response)=>{
        setDownloadLink(response.data.data);
      }).catch(function (err) {
        console.error(err);
      });
    }
  }

  const downloadFile = () => {
    window.open(downloadLink, '_blank');
  }

  const {
    isDragActive,
    getRootProps,
    getInputProps,
    isDragReject,
    isDragAccept,
    acceptedFiles,
    rejectedFiles
  } = useDropzone({
    // accept: 'image/png', // TODO: Drive this dynamically
    minSize: 1,
    maxSize,
    noKeyboard: true
  });

  const isFileTooLarge = rejectedFiles?.length > 0 && rejectedFiles[0].size > maxSize;

  const style = useMemo(() => ({
    ...(isDragActive ? activeStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isDragActive,
    isDragReject,
    isDragAccept
  ]);

  return (
    <Layout isHomePage>
      <h1 className="text-4xl font-semibold uppercase">
        {title}
      </h1>

      <p>
        Make JSON files easy to read by converting them to CSV.
      </p>

      <div className="mt-10 w-full">
        <div {...getRootProps({ className: 'dropzone h-fifty', ...style })}>
          <input {...getInputProps()} />
          {!isDragActive && 'Click here or drop a file to upload!'}
          {isDragActive && !isDragReject && "Drop it like it's hot!"}
          {isDragReject && "File type not accepted, sorry!"}
          {isFileTooLarge && (
            <div className="text-danger mt-2">
              File is too large.
            </div>
          )}
          <ul className="list-group mt-2 list-none text-green-400 font-semibold">
            {acceptedFiles.length > 0 && acceptedFiles.map(acceptedFile => (
              <li className="bg-green" key={acceptedFile.name}>
                {acceptedFile.name}
              </li>
            ))}
          </ul>
        </div>

        {/* Row */}
        <div className={!downloadLink ? 'row sm:flex mt-5' : 'hidden'}>
          <button className={`bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mx-auto ${(!acceptedFiles.length) ? 'disabled:opacity-75' : ''} ${(downloadLink) ? 'hidden': ''}`} onClick={handleSubmit} disabled={!acceptedFiles.length}>
            <span>Convert</span>
          </button>
        </div>

        {/* Row */}
        <div className={downloadLink ? 'row sm:flex mt-5' : 'hidden'}>
          <button className='bg-teal-400 hover:bg-teal-600 text-white font-semibold py-2 px-4 w-100 border border-gray-400 rounded shadow inline-flex mx-auto' onClick={downloadFile}>
            <svg className="fill-current w-4 h-4 mr-2 mt-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"/></svg>
            <span>Download</span>
          </button>
        </div>
      </div>
    </Layout>
  );
}

export default Convert;
