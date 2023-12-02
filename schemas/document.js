import mongoose from "mongoose";

const pdfSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  owner:{ type: String, required: true },
  subject:{type:String,required:true},
  group:{type:String,required:true},
  pdf: Buffer, // use Buffer type to store binary data
});

const PDF = mongoose.model("PDF", pdfSchema);

export { PDF };
