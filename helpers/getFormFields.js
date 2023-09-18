import { PDFDocument } from "pdf-lib";
import fs from "fs";

export const getFormFields = async (filePath) => {
  const formPdfBytes = await fs.promises.readFile(filePath);
  const pdfDoc = await PDFDocument.load(formPdfBytes);
  const form = pdfDoc.getForm();
  const fields = form.getFields();
  const fieldNames = fields.map((field) => field.getName());
  return fieldNames;
};




