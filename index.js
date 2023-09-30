import { PDFDocument } from "pdf-lib";
import fs from "fs";

const getFormFields = async() => {
    const filePath = './templates/materias/1/ACA-0907/--AC007 Taller de Etica.pdf'
    const formPdfBytes = await fs.promises.readFile(filePath);
    const pdfDoc = await PDFDocument.load(formPdfBytes);
    const form = pdfDoc.getForm();
    const fields = form.getFields();
    const fieldNames = fields.map((field) => field.getName());
    console.log(JSON.stringify(fieldNames))
    return fieldNames;
};

getFormFields()