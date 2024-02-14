//customPdfViewer
import React, { useEffect, useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf';
import 'pdfjs-dist/legacy/build/pdf.worker';

const CustomPdfViewer = ({ fileUrl }) => {
  const [pagesRendered, setPagesRendered] = useState([]);

  useEffect(() => {
    const fetchPdf = async () => {
      if (fileUrl) {
        const pdfjsWorker = require('pdfjs-dist/legacy/build/pdf.worker.entry');
        pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

        try {
          const pdf = await pdfjsLib.getDocument(fileUrl).promise;
          const newPagesRendered = []; // Temporary array to store rendered pages

          for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
            const page = await pdf.getPage(pageNumber);
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');

            // Use the original scale (1.5) without reduction
            const scale = 1.5;
            const viewport = page.getViewport({ scale });
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            const renderContext = {
              canvasContext: context,
              viewport: viewport,
            };

            await page.render(renderContext).promise;

            // Use the temporary array for accumulating rendered pages
            newPagesRendered.push(canvas);
          }

          // Update state once with all rendered pages to avoid duplication
          setPagesRendered(newPagesRendered);
        } catch (error) {
          console.error('Error loading PDF: ', error);
        }
      }
    };

    fetchPdf();
  }, [fileUrl]);

  return (
    <div>
      {fileUrl ? (
        <div style={{
          overflowY: 'scroll',
          maxHeight: '90vh', // Restored original maxHeight
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          {pagesRendered.map((canvas, index) => (
            <div key={index} style={{ marginBottom: '20px', width: '100%', display: 'flex', justifyContent: 'center' }}>
              <img src={canvas.toDataURL()} alt={`Page ${index + 1}`} style={{ maxWidth: '100%', height: 'auto' }} /> {/* Restored original maxWidth */}
            </div>
          ))}
        </div>
      ) : (
        <p>No PDF selected</p>
      )}
    </div>
  );
};

export default CustomPdfViewer;




