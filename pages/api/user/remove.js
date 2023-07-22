import mongoose from "mongoose";
import User from "../../../models/userSchema";
import Payment from "../../../models/paymentSchema";
import Form from "../../../models/formSchema"

export default async function addproduct(req, res) {
  const { email } = req.body;
  console.log(req.body);
  try {
    // connect to the database pages\api\strategy.js\add.js
    await mongoose.connect(process.env.MONGODB_URI);
    mongoose.set("strictQuery", true);
    console.log("DB Connected");

    const exist = await User.findOne({ email: email });
    console.log(exist);
    if (!exist) {
      return res
        .status(200)
        .json({ success: true, message: "Something went wrong" });
    }

    await User.deleteOne({ email: email });
    console.log("Removed existing user with URL: ", email);

    const existp = await Payment.findOne({user_id:exist._id})
    if(existp){
      await existp.deleteOne({user_id:exist._id})
      console.log("deleted exist payment existing email",email)
    }
    const existf = await Form.findOne({user_id:exist._id});
    if(existf){
      await existf.deleteOne({user_id:exist._id})
      console.log("deleted Form existing email",email)
    }
    

    res.status(200).json({ success: true, message: "Deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "not added" });
  }
}
