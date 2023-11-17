import { getFormFields } from "../../helpers/getFormFields.js";
import {getFilePath} from "../../helpers/getFilePath.js"

export const getDocumentFields = async (req, res, next) => {
  try {
    const data = req.body;
    console.log(data)

    const filePath = getFilePath(data.fileName)

    const formFields = await getFormFields(filePath);

    if (formFields) {
      res.status(201).json({
        message: "Fields founded",
        result: formFields,
      });
    } else {
      res.status(404).json({
        message: "No fields founded",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
