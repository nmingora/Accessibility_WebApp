import React from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

// You might need to set up a worker, but I didnt tbh
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const CustomPdfViewer = ({ fileUrl }) => {
  const [numPages, setNumPages] = React.useState(null);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

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
          <Document
            file={fileUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            options={{
              cMapUrl: 'cmaps/',
              cMapPacked: true,
            }}
          >
            {Array.from(
              new Array(numPages),
              (el, index) => (
                <Page
                  key={`page_${index + 1}`}
                  pageNumber={index + 1}
                  width={600} // You might want to set this dynamically
                />
              ),
            )}
          </Document>
        </div>
      ) : (
        <p>No PDF selected</p>
      )}
    </div>
  );
};

export default CustomPdfViewer;
