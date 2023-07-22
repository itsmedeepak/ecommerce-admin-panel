import mongoose from "mongoose";
import Chart from "../../../models/manage/chartSchema";


export default async function addproduct(req, res) {
  const { url, title, description, script, type, trend } = req.body;
  console.log(req.body);
  try {
    // connect to the database
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("DB Connected");

    const existingChart = await Chart.findOne({ title });
    if (existingChart) {
      existingChart.url = url;
      existingChart.description = description;
      existingChart.type = type;
      existingChart.trend = trend;
      existingChart.script = script;
      await existingChart.save();
      console.log("Updated existing chart with URL: ", url);
      return res.status(200).json({ success: true, message: "Updated" });
    }

    const newChart = new Chart({ url, title, description, script, type, trend });
    await newChart.save();
    console.log("Added new chart");

    res.status(200).json({ success: true, message: "Added" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Not added" });
  }
}
