import fs from "fs";

export const fileShredder = async (filePath) => {
  try {
    fs.unlinkSync(filePath);
    console.log("File deleted successfully");
  } catch (err) {
    console.error(`Error deleting the file: ${err.message}`);
  }
};
