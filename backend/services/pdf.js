const PDFDocument = require("pdfkit");

/**
 * Generates a cybercrime complaint PDF
 * @param {Object} opts
 * @returns {Promise<Buffer>}
 */
const generateComplaintPDF = ({ scamType, description, name, law, actions }) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 60, size: "A4" });
    const chunks = [];

    doc.on("data", (chunk) => chunks.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);

    const today = new Date().toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const scamLabel = scamType.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

    // ── Header ──────────────────────────────────────────────────────────────
    doc
      .rect(0, 0, doc.page.width, 90)
      .fill("#0f172a");

    doc
      .fillColor("#ef4444")
      .fontSize(22)
      .font("Helvetica-Bold")
      .text("CYBERCRIME COMPLAINT", 60, 28, { align: "left" });

    doc
      .fillColor("#94a3b8")
      .fontSize(10)
      .font("Helvetica")
      .text("National Cyber Crime Reporting Portal  |  cybercrime.gov.in", 60, 56);

    // ── Meta Info ────────────────────────────────────────────────────────────
    doc.moveDown(3.5);

    doc
      .fillColor("#1e293b")
      .fontSize(10)
      .font("Helvetica")
      .text(`Date: ${today}`, { align: "right" });

    doc.moveDown(0.5);

    doc
      .fillColor("#1e293b")
      .fontSize(12)
      .font("Helvetica-Bold")
      .text("To,");

    doc
      .font("Helvetica")
      .fontSize(11)
      .fillColor("#334155")
      .text("The Station House Officer / Cyber Crime Cell")
      .text("(Jurisdiction as applicable)");

    doc.moveDown(1);

    // ── Subject ──────────────────────────────────────────────────────────────
    doc
      .fillColor("#0f172a")
      .fontSize(12)
      .font("Helvetica-Bold")
      .text(`Subject: Complaint Regarding ${scamLabel} – Request for Investigation`);

    doc
      .moveTo(60, doc.y + 4)
      .lineTo(doc.page.width - 60, doc.y + 4)
      .strokeColor("#e2e8f0")
      .stroke();

    doc.moveDown(1);

    // ── Body ─────────────────────────────────────────────────────────────────
    doc
      .font("Helvetica")
      .fontSize(11)
      .fillColor("#334155")
      .text(`Respected Sir/Madam,\n\nI, ${name}, wish to bring to your notice that I have been targeted by a suspected ${scamLabel} scam. The details of the incident are as follows:`);

    doc.moveDown(1);

    // ── Scam Details Box ─────────────────────────────────────────────────────
    const boxY = doc.y;
    doc
      .rect(60, boxY, doc.page.width - 120, description ? 90 : 60)
      .fill("#f8fafc")
      .stroke("#e2e8f0");

    doc
      .fillColor("#ef4444")
      .font("Helvetica-Bold")
      .fontSize(10)
      .text("INCIDENT DETAILS", 75, boxY + 12);

    doc
      .fillColor("#334155")
      .font("Helvetica")
      .fontSize(10)
      .text(`Scam Type: ${scamLabel}`, 75, boxY + 28)
      .text(`Description: ${description || "Suspicious communication received. Full details available on request."}`, 75, boxY + 44, {
        width: doc.page.width - 160,
      });

    doc.y = boxY + (description ? 100 : 70);
    doc.moveDown(1);

    // ── Legal Sections ────────────────────────────────────────────────────────
    if (law) {
      doc
        .fillColor("#0f172a")
        .font("Helvetica-Bold")
        .fontSize(12)
        .text("Applicable Legal Provisions:");

      doc.moveDown(0.3);

      doc
        .fillColor("#334155")
        .font("Helvetica")
        .fontSize(11)
        .text(`• Section(s): ${law.section}`)
        .text(`• Description: ${law.description}`)
        .text(`• Punishment: ${law.punishment}`);

      doc.moveDown(1);
    }

    // ── Actions Taken ──────────────────────────────────────────────────────────
    if (actions && actions.length > 0) {
      doc
        .fillColor("#0f172a")
        .font("Helvetica-Bold")
        .fontSize(12)
        .text("Steps Taken / Requested Actions:");

      doc.moveDown(0.3);

      actions.forEach((action) => {
        doc
          .fillColor("#334155")
          .font("Helvetica")
          .fontSize(11)
          .text(`• ${action}`);
      });

      doc.moveDown(1);
    }

    // ── Prayer ───────────────────────────────────────────────────────────────
    doc
      .fillColor("#334155")
      .font("Helvetica")
      .fontSize(11)
      .text(
        "I humbly request you to register an FIR/complaint and investigate this matter at the earliest. I am willing to provide any further information or evidence as required."
      );

    doc.moveDown(2);

    // ── Signature ─────────────────────────────────────────────────────────────
    doc
      .font("Helvetica-Bold")
      .fillColor("#0f172a")
      .text("Yours sincerely,")
      .moveDown(0.5)
      .font("Helvetica")
      .text(name)
      .text(`Date: ${today}`);

    // ── Footer ────────────────────────────────────────────────────────────────
    const footerY = doc.page.height - 50;
    doc
      .rect(0, footerY - 10, doc.page.width, 60)
      .fill("#f1f5f9");

    doc
      .fillColor("#94a3b8")
      .fontSize(8)
      .font("Helvetica")
      .text(
        "Generated by Legal First-Aid | Report cybercrime at cybercrime.gov.in | Emergency: 1930",
        60,
        footerY,
        { align: "center", width: doc.page.width - 120 }
      );

    doc.end();
  });
};

module.exports = { generateComplaintPDF };
