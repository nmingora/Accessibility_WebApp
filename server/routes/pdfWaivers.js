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
  















module.exports = router;
