
import Terms from '../../../models/manage/termsSchema';
import mongoose from 'mongoose';

export default async function addproduct (req, res) {
  const { terms } = req.body;
console.log("hello deepak")
  try {
    // connect to the database
    await mongoose.connect(process.env.MONGODB_URI);
    mongoose.set("strictQuery", true);
    console.log("DB Connected")

    // const exist = await Terms.findOne({terms:terms});
    // console.log(exist)
    // if(exist){
    //   return res.status(200).json({ success: true , message:'already updated with this url'});
    // }
    // find the document in the database
    const dailyLive = new Terms({terms})
    dailyLive.save();
    console.log("added")

    res.status(200).json({ success: true , message:"Updated"});
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message:'not added'});
  }
}
