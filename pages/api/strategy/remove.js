import mongoose from "mongoose";
import Strategy from "../../../models/manage/strategySchema";

export default async function addproduct(req, res) {
  const { url, title, description } = req.body;
  console.log(req.body);
  try {
    // connect to the database pages\api\strategy.js\add.js
    await mongoose.connect(process.env.MONGODB_URI);
    mongoose.set("strictQuery", true);
    console.log("DB Connected");

    const exist = await Strategy.findOne({ url: url });
    console.log(exist);
    if (!exist) {
      return res
        .status(200)
        .json({ success: true, message: "Something went wrong" });
    }

    await Strategy.deleteOne({ url: url });
    console.log("Removed existing strategy with URL: ", url);

    res.status(200).json({ success: true, message: "Deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "not added" });
  }
}
