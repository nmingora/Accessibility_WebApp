// models/pdfWaivers.js
const mongoose = require('mongoose');

const pdfWaiverSchema = new mongoose.Schema({
  pdfType: {
    type: String,
    required: true,
  },
  uploadedBy: {
    type: String,
    required: true,
  },
  pdfName: {
    type: String,
    required: true,
  },
  pdfData: {
    type: Buffer,
    required: true,
  }
}, { timestamps: true });

const PdfWaiver = mongoose.model('PdfWaiver', pdfWaiverSchema);

module.exports = PdfWaiver;