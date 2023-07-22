import connect from "../../../lib/conn";
import Product from "../../../models/productsSchema";
import mongoose from "mongoose";

export default async function updateProduct(req, res) {
  const productId = req.body.productId; // assuming you're passing the product ID in the URL
  console.log(req.body);
  const lifetime_price_id = req.body.lifetime_price_id;
  const {
    name,
    short_description,
    description,
    version,
    script,
    trader,
    market,
    dashboard,
    alerts,
    signal,
    monthly_price,
    monthly_price_id,
    yearly_price,
    yearly_price_id,
    lifetime_price,
    f1_text,
    f2_text,
    f3_text,
    f4_text,
    f5_text,
    img1,
    img2,
    img3,
    img4,
    img5,
  } = req.body;
  const isActive = true;
  await mongoose.connect(process.env.MONGODB_URI);
  mongoose.set("strictQuery", true);
  console.log("DB Connected");

  const filter = { _id: productId };
  const update = {
    name,
    short_description,
    description,
    version,
    script,
    trader,
    market,
    dashboard,
    alerts,
    signal,
    isActive,
    monthly_price,
    monthly_price_id,
    yearly_price,
    yearly_price_id,
    lifetime_price,
    lifetime_price_id,
    f1_text,
    f2_text,
    f3_text,
    f4_text,
    f5_text,
    img1,
    img2,
    img3,
    img4,
    img5,
  };

  const exist = await Product.findOne({_id:productId})
  if(!exist){
    res.status(200).json({ success: true , message:"something went wrong"});
  }

  const result = await Product.updateOne(filter, update);
  console.log(result);

  res.status(200).json({ success: true , message:"update"});
}
