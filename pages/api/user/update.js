import mongoose from "mongoose";
import User from "../../../models/userSchema";
import Form from "../../../models/formSchema";
export default async function addproduct(req, res) {
  const { email, phone, name, whatsapp, teligram, tradingview, discord } =
    req.body;
  console.log(req.body);

  try {
    // Connect to the database pages\api\strategy.js\add.js
    await mongoose.connect(process.env.MONGODB_URI);
    mongoose.set("strictQuery", true);
    console.log("DB Connected");

    const existingStrategy = await User.findOne({ email: email });
    console.log(existingStrategy);

    if (existingStrategy) {
      // If a strategy with the same URL already exists, update it
      existingStrategy.name = name;
      existingStrategy.phone = phone;
      await existingStrategy.save();
      console.log("Updated existing strategy with email: ", email);

      const existingForm = await Form.findOne({
        user_id: existingStrategy._id,
      });
      if (existingForm) {
        console.log(existingForm)
        existingForm.whatsapp = whatsapp;
        existingForm.teligram = teligram;
        existingForm.tradingView = tradingview;
        existingForm.discord = discord;
        await existingForm.save();
        console.log("2")
      }
      else{
        const tradingView=tradingview;
        const user_id= existingStrategy._id
        const form = new Form({whatsapp,teligram,tradingView, discord, user_id})
        await form.save();
        console.log("1")
      }
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
