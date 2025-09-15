import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  descriptions: [String], // now an array
});

const subcategorySchema = new mongoose.Schema({
  name: String,
  products: [productSchema],
});

const categorySchema = new mongoose.Schema({
  name: String,
  subcategories: [subcategorySchema],
});

export default mongoose.model("Category", categorySchema);
