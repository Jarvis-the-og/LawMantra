const Tesseract = require("tesseract.js");

/**
 * Extracts text from an image buffer using Tesseract.js
 * @param {Buffer} imageBuffer - The image data buffer
 * @returns {Promise<string>} - Extracted text
 */
const extractText = async (imageBuffer) => {
  try {
    const { data } = await Tesseract.recognize(imageBuffer, "eng", {
      // Suppress Tesseract logs in production
      logger: process.env.NODE_ENV === "development" ? (m) => console.log(m) : undefined,
    });

    return data.text || "";
  } catch (err) {
    console.error("OCR error:", err.message);
    throw new Error("OCR failed: Unable to extract text from image.");
  }
};

module.exports = { extractText };
