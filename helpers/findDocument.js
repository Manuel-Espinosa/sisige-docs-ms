import { PDF } from "../schemas/document.js";

export const findDocumentById = async (id) => {
  const pdf = await PDF.find({ id: id }).exec();
  return pdf;
};
