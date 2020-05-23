import { useRouter } from 'next/router';
import React, { useCallback, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import Layout from '../src/components/layout';


const activeStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};

const Convert = () => {
  const router = useRouter()
  const { slug } = router.query;
  const title = slug?.replace(/-/g, ' ');

  const maxSize = 1048576;

  const onDrop = useCallback(acceptedFiles => {
    console.log(acceptedFiles);
  }, []);

  const {
    isDragActive,
    getRootProps,
    getInputProps,
    isDragReject,
    isDragAccept,
    acceptedFiles,
    rejectedFiles
  } = useDropzone({
    onDrop,
    // accept: 'image/png',
    minSize: 1,
    maxSize,
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
        <div {...getRootProps({ className: 'dropzone h-screen', ...style })}>
          <input {...getInputProps()} />
          {!isDragActive && 'Click here or drop a file to upload!'}
          {isDragActive && !isDragReject && "Drop it like it's hot!"}
          {isDragReject && "File type not accepted, sorry!"}
          {isFileTooLarge && (
            <div className="text-danger mt-2">
              File is too large.
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default Convert;
