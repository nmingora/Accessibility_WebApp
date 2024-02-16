import React from 'react';

const CustomPdfViewer = ({ fileUrl }) => {
  return (
    <div>
      {fileUrl ? (
        <div style={{
          overflowY: 'scroll',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          <iframe
            src={fileUrl}
            style={{
              width: '100%', // Adjust width as needed
              height: '90vh', // Adjust height as needed
              border: 'none',
            }}
            title="PDF Viewer"
          ></iframe>
        </div>
      ) : (
        <p>No PDF selected</p>
      )}
    </div>
  );
};

export default CustomPdfViewer;
