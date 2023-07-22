import mongoose from "mongoose";
import Strategy from "../../../models/manage/strategySchema";

export default async function addproduct(req, res) {
  const { url, title, description } = req.body;
  console.log(req.body);

  try {
    // Connect to the database pages\api\strategy.js\add.js
    await mongoose.connect(process.env.MONGODB_URI);
    mongoose.set("strictQuery", true);
    console.log("DB Connected");

    const existingStrategy = await Strategy.findOne({ url: url });
    console.log(existingStrategy);

    if (existingStrategy) {
      // If a strategy with the same URL already exists, update it
      existingStrategy.title = title;
      existingStrategy.description = description;
      await existingStrategy.save();
      console.log("Updated existing strategy with URL: ", url);
    } else {
      // If a strategy with the same URL does not exist, create a new one
      const dailyLive = new Strategy({ url, title, description });
      await dailyLive.save();
      console.log("Added new strategy with URL: ", url);
    }

    res.status(200).json({ success: true, message: "Updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Not added" });
  }
}
