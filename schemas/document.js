import mongoose from "mongoose";

const pdfSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  owner:{ type: String, required: true },
  subject:{type:String,required:true},
  group:{type:String,required:true},
  pdf: Buffer,
  term: { type: String, default: "2023" },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  deleted_at: { type: Date, default: null },
});

const PDF = mongoose.model("PDF", pdfSchema);

export { PDF };
