import mongoose from "mongoose";
import Strategy from "../../../models/manage/strategySchema";

function getdate() {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;

  var yyyy = today.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  var today = dd + "/" + mm + "/" + yyyy;
  return today;
}



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
    if (exist) {
      return res
        .status(200)
        .json({ success: true, message: "already updated with this url" });
    }
    const createAt = getdate();
    // find the document in the database
    const dailyLive = new Strategy({ url, title, description});
    dailyLive.save();
    console.log("added");

    res.status(200).json({ success: true, message: "Updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "not added" });
  }
}
