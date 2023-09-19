import fs from "fs";

export const fileWritter = async (filePath, pdfBuffer) => {
  fs.writeFile(filePath, pdfBuffer, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("PDF file created successfully");
      return;
    }
  });
};
