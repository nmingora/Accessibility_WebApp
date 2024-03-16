// routes/pdfWaivers.js
const express = require('express');
const router = express.Router();
const PdfWaiver = require('../models/pdfWaivers');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });


// Endpoint to upload a PDF waiver

router.post('/upload', upload.single('pdfData'), async (req, res) => {
    try {
      const newPdfWaiver = new PdfWaiver({
        pdfType: req.body.pdfType,
        uploadedBy: req.body.uploadedBy,
        pdfName: req.body.pdfName,
        pdfData: req.file.buffer, // Access the file buffer from multer
      });
  
      const savedPdfWaiver = await newPdfWaiver.save();
      res.status(201).json(savedPdfWaiver);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  

// GET endpoint to retrieve all PDF waivers
router.get('/getAll', async (req, res) => {
    try {
      // Find all documents in the PdfWaiver collection
      const pdfWaivers = await PdfWaiver.find({});
  
    
  
      res.status(200).json(pdfWaivers);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  

  // Express route to serve a PDF from MongoDB



  router.get('/pdfs/:id', async (req, res) => {
    console.log('Received request for PDF with ID:', req.params.id); // Log the requested ID
    try {
      const id = req.params.id;
      console.log('Attempting to find waiver with ID:', id); // Log before attempting to find
      const waiver = await PdfWaiver.findById(id);
  
      if (!waiver) {
        console.log('No waiver found for ID:', id); // Log if no waiver found
        return res.status(404).send('Waiver not found');
      }
  
      console.log('Waiver found. Preparing to send response for ID:', id); // Log after waiver is found
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `inline; filename="${waiver.pdfName}"`);
      
      console.log('Headers set, sending PDF data for ID:', id); // Log before sending the response
      res.send(waiver.pdfData);
    } catch (error) {
      console.error('Error fetching PDF with ID:', req.params.id, error); // Log error details
      res.status(500).send('Server Error');
    }
  });
  




















module.exports = router;
