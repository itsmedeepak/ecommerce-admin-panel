import dbConnect from "../../lib/conn";
import SocialAccount from "../../models/socialSchema";
import mongoose from "mongoose";

export default async function addproduct(req, res) {
  const { whatsapp, teligram, discord } = req.body;
  console.log(req.body);
  console.log("hello deepak");
  try {

    await mongoose.connect(process.env.MONGODB_URI);
    
    console.log("DB Connected");

    const socialaccount = new SocialAccount({ whatsapp, teligram, discord });
    await socialaccount.save();
    console.log("added");

    res.status(200).json({ success: true, message: "Updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "not added" });
  }
}
