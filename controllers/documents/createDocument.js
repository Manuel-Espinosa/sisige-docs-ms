import { PDFDocument } from "pdf-lib";
import { Binary } from "mongodb";
import fs from "fs";
import mongoose from "mongoose";
import { PDF } from "../../schemas/document.js";
import { Buffer } from "buffer";


const createDocument = async (req, res, next) => {
  try {

    const data = req.body;
    // These should be Uint8Arrays or ArrayBuffers
    // This data can be obtained in a number of different ways
    // If your running in a Node environment, you could use fs.readFile()
    // In the browser, you could make a fetch() call and use res.arrayBuffer()
    // const formPdfBytes = ... // The bytes of the PDF form you want to fill in
    const filePath = "./templates/instrumentacion.pdf";//storing a template
    const formPdfBytes = await fs.promises.readFile(filePath);
    // Load the PDF form
    const pdfDoc = await PDFDocument.load(formPdfBytes);

    // Get the form containing all the fields
    const form = pdfDoc.getForm();

    // Fill in the form fields
    /**
     * this  should be a getFieldsNames() function that takes  the template and return an array
     * with its field names
     * 
     *then we need a function that takes the body request to pair it keys
     with the field names obtained by getFieldsNames() and set the text to  each field
     */
    const nameField = form.getTextField("subject_name");
    nameField.setText(data.subject_name);

    const lastNameField = form.getTextField("subject_id");
    lastNameField.setText(data.subject_id);

    const addressField = form.getTextField("subject_plan");
    addressField.setText(data.subject_plan);


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
    res.json(result);
  } catch (error) {
    console.log(error);
  } 
};

export { createDocument };
