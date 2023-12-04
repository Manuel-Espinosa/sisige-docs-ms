import { PDFDocument, PDFTextField, PDFButton } from "pdf-lib";
import { Binary } from "mongodb";
import fs from "fs";
import { PDF } from "../../schemas/document.js";
import { Buffer } from "buffer";
import { getFormFields } from "../../helpers/getFormFields.js";
import { getFilePath } from "../../helpers/getFilePath.js";
import ensureDefaultAppearance from "../../helpers/ensureDefaultAppearance.js";

const createDocument = async (req, res, next) => {
  try {
    const data = req.body;
    console.log("Request received with body: ", JSON.stringify(data));

    const templatePath = getFilePath(data.file_name);
    console.log("Template path: ", templatePath);

    if (!fs.existsSync(templatePath)) {
      console.log(`Template file not found at: ${templatePath}`);
      throw new Error("Template file not found");
    }

    const fieldNamesInTemplate = await getFormFields(templatePath);
    console.log("Fields in template: ", JSON.stringify(fieldNamesInTemplate));

    const formPdfBytes = await fs.promises.readFile(templatePath);
    console.log("Form PDF bytes processed.");

    const pdfDoc = await PDFDocument.load(formPdfBytes);
    if (!pdfDoc) {
      console.log("Failed to load PDF document");
      throw new Error("Failed to load PDF document");
    }
    console.log("PDF document loaded successfully.");

    const form = pdfDoc.getForm();
    if (!form) {
      console.log("No form found in PDF document");
      throw new Error("No form found in PDF document");
    }
    console.log("PDF form retrieved.");

    const fieldsNotFound = [];

    for (const fieldName of fieldNamesInTemplate) {
      if (data.fields.hasOwnProperty(fieldName)) {
        const value = data.fields[fieldName];

        // Ensure the default appearance is set for the field
        await ensureDefaultAppearance(pdfDoc, fieldName);

        const field = form.getField(fieldName);
        if (field) {
          if (field instanceof PDFTextField) {
            console.log(`Setting text field ${fieldName} with value ${value}`);
            field.setFontSize(9);
            field.enableMultiline();
            field.setText(value.toString());
          } else {
            // Log that a non-text field was found and will be ignored
            console.log(`Non-text field found and ignored: ${fieldName}`);
          }
        } else {
          console.log(`Field not found in PDF: ${fieldName}`);
          fieldsNotFound.push(fieldName);
        }
      }
    }

    console.log("Saving PDF document...");
    const pdfBytes = await pdfDoc.save();
    console.log("PDF document saved.");

    const pdfBson = new Binary(pdfBytes);
    const pdfBuffer = Buffer.from(pdfBson.buffer);

    const createdDocument = new PDF({
      name: data.title,
      id: data.id,
      owner: data.owner,
      subject:data.subject,
      group:data.group,
      pdf: pdfBuffer,
    });

    console.log("Saving document to database...");
    const result = await createdDocument.save();
    console.log("Document saved to database.");

    if (fieldsNotFound.length > 0) {
      console.log("Created with missing fields: ", fieldsNotFound);
      return res.status(201).json({
        message: "Created with problems",
        problems: fieldsNotFound,
        result: result,
      });
    }

    res
      .status(201)
      .json({ message: "Created without problems", result: result });
  } catch (error) {
    console.log("Error occurred: ", error);
    res.status(500).json({ error: error.message });
  }
};

export { createDocument };
