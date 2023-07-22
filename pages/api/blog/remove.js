import mongoose from "mongoose";
import Blog from "../../../models/manage/blogSchema";

export default async function addproduct(req, res) {
  const { url } = req.body;
  console.log(req.body);
  try {
    // connect to the database pages\api\strategy.js\add.js
    await mongoose.connect(process.env.MONGODB_URI);
    mongoose.set("strictQuery", true);
    console.log("DB Connected");

    const exist = await Blog.findOne({ url: url });
    console.log(exist);
    if (!exist) {
      return res
        .status(200)
        .json({ success: true, message: "Something went wrong" });
    }

    await Blog.deleteOne({ url: url });
    console.log("Removed existing strategy with URL: ", url);

    res.status(200).json({ success: true, message: "Deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error" });
  }
}
