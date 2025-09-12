// models/companyInfo.js
import mongoose from "mongoose";

const companyInfoSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  content: { type: [String], required: true }, // now an array of strings
});

export default mongoose.model("CompanyInfo", companyInfoSchema);
