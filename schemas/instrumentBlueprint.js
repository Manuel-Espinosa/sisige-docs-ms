import mongoose from "mongoose";
import { values } from "pdf-lib";

const activities = new mongoose.Schema({
  activity: { type: String },
  hours: { type: String },
});

const indicators = new mongoose.Schema({
  values: [{ type: String }],
});

const competition = new mongoose.Schema({});
