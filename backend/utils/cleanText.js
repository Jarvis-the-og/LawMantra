/**
 * Cleans and normalizes OCR-extracted text
 * @param {string} text
 * @returns {string}
 */
const cleanText = (text) => {
  return text
    .replace(/\r\n/g, "\n")           // Normalize line endings
    .replace(/[ \t]+/g, " ")          // Collapse multiple spaces/tabs
    .replace(/\n{3,}/g, "\n\n")       // Max 2 consecutive newlines
    .replace(/[^\x20-\x7E\n]/g, " ")  // Remove non-ASCII garbage from OCR
    .trim();
};

module.exports = { cleanText };
