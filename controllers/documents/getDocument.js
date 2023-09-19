import fs from "fs";
import { findDocumentById } from "../../helpers/findDocument.js";


const getDocument = async (req, res, next) => {
  try {
    //connecting to Mongo
    //getting document from its id 
    const id = req.params.id;
    console.log('searching for document: ', id)
    const pdf = await findDocumentById(id)
    const pdfBuffer = pdf[0].pdf;
    fs.writeFile("./templates/converted_i.pdf", pdfBuffer, function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log("PDF file created successfully");
      }
    });
    res.json(pdfBuffer);
  } catch (error) { 
    console.log(error);
  } 
};

export {  getDocument };
