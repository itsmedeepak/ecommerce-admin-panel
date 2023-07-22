import dbConnect from '../../lib/conn';
import Affiliate from "../../models/affliateSchema"
import mongoose from 'mongoose';

export default async function addproduct (req, res) {
  const { url } = req.body;
console.log("hello deepak")
  try {
    // connect to the database
    await mongoose.connect(process.env.MONGODB_URI);
    mongoose.set("strictQuery", true);

    const exist = await Affiliate.findOne({url:url});
    console.log(exist)
    if(exist){
      return res.status(200).json({ success: true , message:'already updated with this url'});
    }
    // find the document in the database
    const dailyLive = new Affiliate({url})
    dailyLive.save();
    console.log("added")

    res.status(200).json({ success: true , message:"Updated"});
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message:'not added'});
  }
}
