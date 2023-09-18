import { PDFDocument } from "pdf-lib";
import { Binary } from "mongodb";
import fs from "fs";
import { PDF } from "../../schemas/document.js";
import { Buffer } from "buffer";
import { getFormFields } from "../../helpers/getFormFields.js";
import { getFilePath } from "../../helpers/getFilePath.js";

const createDocument = async (req, res, next) => {
  try {
    const data = req.body;
    // These should be Uint8Arrays or ArrayBuffers
    // This data can be obtained in a number of different ways
    // If your running in a Node environment, you could use fs.readFile()
    // In the browser, you could make a fetch() call and use res.arrayBuffer()
    // const formPdfBytes = ... // The bytes of the PDF form you want to fill in

    //the file name should be in req.body.fileName)
    const templatePath = getFilePath(data.file_name); //storing a template
    const fieldNamesInTemplate = await getFormFields(templatePath);
    const fieldsNotFound = [];
    const formPdfBytes = await fs.promises.readFile(templatePath);
    // Load the PDF form
    const pdfDoc = await PDFDocument.load(formPdfBytes);

    // Get the form containing all the fields
    const form = pdfDoc.getForm();

    // Iterate through field names in the template
    for (const fieldName of fieldNamesInTemplate) {
      // Check if the field name exists in data.fields
      if (data.fields.hasOwnProperty(fieldName)) {
        // Get the value for the current field
        const value = data.fields[fieldName];

        // Get the corresponding PDF text field
        const textField = form.getTextField(fieldName);

        // Check if the text field exists in the PDF form
        if (textField) {
          // Set the text of the PDF text field with the value
          textField.setText(value.toString()); // Ensure 'value' is a string
        } else {
          // Print a warning if the field is not found in the PDF form
          fieldsNotFound.push(fieldName);
        }
      }
    }

    // Serialize the PDFDocument to bytes (a Uint8Array)
    const pdfBytes = await pdfDoc.save();
    //converting the pdf a binary
    const pdfBson = new Binary(pdfBytes);
    //buffering the "binarized" pdf
    const pdfBuffer = Buffer.from(pdfBson.buffer);
    //creaaating and instance of PDF Schema to assing its  properties
    const createdDocument = new PDF({
      name: req.body.title,
      id: req.body.id,
      owner: req.body.owner,
      pdf: pdfBuffer,
    });
    //saving the pdf document
    const result = await createdDocument.save();
    if (fieldsNotFound.length > 0) {
      res.status(201).json({ message:"Created with problems",problems: fieldsNotFound, result: result });
    }
    res.status(201).json({ message:"Created without problems", result: result });
  } catch (error) {
    res.status(500).json({error:error})
  }
};

export { createDocument };
