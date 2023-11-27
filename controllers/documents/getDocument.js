import { fileURLToPath } from "url";
import path from "path";
import { fileWritter } from "../../helpers/fileWritter.js";
import { findDocumentById } from "../../helpers/findDocument.js";
import { fileShredder } from "../../helpers/fileShredder.js";
import { getFilePath } from "../../helpers/getFilePath.js";
import fs from "fs"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getDocument = async (req, res, next) => {
  try {
    // Connect to Mongo and get the document by its ID
    const id = req.params.id;
    console.log("Searching for document:", id);
    const pdf = await findDocumentById(id);
    const pdfBuffer = pdf[0].pdf;
    // Specify the file path for writing and reading the PDF
    const filePath = path.join(
      __dirname,
      `../../templates/${pdf[0]._id.toString()}.pdf`
    );

    // Write the PDF to the file system
    await fileWritter(filePath, pdfBuffer);
    // Set response headers to indicate that you're sending a PDF as an attachment
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${path.basename(filePath)}`
    );

    // Send the PDF file as the response
    res.status(200).sendFile(filePath, async (err) => {
      if (!err) {
        // If the file is sent successfully, delete it securely
        await fileShredder(filePath);
      } else {
        console.error("Error sending the file:", err);
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getTemplate = async (req, res, next) => {
  try {
    const data = req.body;
    const templateRelativePath = getFilePath(data.file_name);

    const templateAbsolutePath = path.resolve(__dirname, '..','..', templateRelativePath);

    const fileContent = fs.readFileSync(templateAbsolutePath);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=${path.basename(templateAbsolutePath)}`);

    res.send(fileContent);
  } catch (error) {
    next(error);
  }
};

export { getDocument, getTemplate };
