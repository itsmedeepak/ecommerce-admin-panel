import mongoose from "mongoose";
import Blog from "../../../models/manage/blogSchema";


export default async function addproduct(req, res) {
  const { url, title, description, script, type, trend } = req.body;
  console.log(req.body);
  try {
    // connect to the database
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("DB Connected");

    const existingChart = await Blog.findOne({ title });
    if (existingChart) {
      existingChart.url = url;
      existingChart.description = description;

      await existingChart.save();
      console.log("Updated existing chart with URL: ", url);
      return res.status(200).json({ success: true, message: "Updated" });
    }

    const newChart = new Blog({ url, title, description });
    await newChart.save();
    console.log("Added new chart");

    res.status(200).json({ success: true, message: "Added" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Not added" });
  }
}
