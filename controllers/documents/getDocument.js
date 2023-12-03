import { fileURLToPath } from "url";
import path from "path";
import { fileWritter } from "../../helpers/fileWritter.js";
import { findDocumentById } from "../../helpers/findDocument.js";
import { fileShredder } from "../../helpers/fileShredder.js";
import fs from "fs";
import { getFilePath } from "../../helpers/getFilePath.js";
import { pipeline } from "stream";
import onFinish from "on-finished";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getDocument = async (req, res, next) => {
  try {
    const id = req.params.id;
    console.log("Searching for document:", id);
    const pdf = await findDocumentById(id);
    const pdfBuffer = pdf[0].pdf;

    const filePath = path.join(
      __dirname,
      `../../templates/${id}.pdf`
    );

    await fileWritter(filePath, pdfBuffer);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${id}.pdf`
    );

    const readStream = fs.createReadStream(filePath);
    pipeline(readStream, res, err => {
      if (err) {
        console.error('Pipeline failed.', err);
        next(err);
      }
    });

    onFinish(res, async () => {
      await fileShredder(filePath);
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

    const templateAbsolutePath = path.resolve(__dirname, '..', '..', templateRelativePath);

    // Read the PDF file from the file system
   // const fileContent = fs.readFileSync(templateAbsolutePath);

    // Convert the file content to a Base64 encoded string
    //const base64EncodedPDF = fileContent.toString('base64');

    // Set the correct headers for Base64 encoded content

    // Send the Base64 encoded content
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${path.basename(templateAbsolutePath)}`
    );

    res.status(200).sendFile(templateAbsolutePath);
  } catch (error) {
    next(error);
  }
};

export { getDocument, getTemplate };
