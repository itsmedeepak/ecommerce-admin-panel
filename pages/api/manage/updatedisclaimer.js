
import Disclaimer from '../../../models/manage/disclaimerSchema';
import mongoose from 'mongoose';

export default async function addproduct (req, res) {
  const { disclaimer } = req.body;
console.log("hello deepak")
  try {
    // connect to the database
    await mongoose.connect(process.env.MONGODB_URI);
    mongoose.set("strictQuery", true);
    console.log("DB Connected")

    // const exist = await Disclaimer.findOne({disclaimer:disclaimer});
    // console.log(exist)
    // if(exist){
    //   return res.status(200).json({ success: true , message:'already updated with this url'});
    // }
    // find the document in the database
    const dailyLive = new Disclaimer({disclaimer})
    dailyLive.save();
    console.log("added")

    res.status(200).json({ success: true , message:"Updated"});
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message:'not added'});
  }
}
