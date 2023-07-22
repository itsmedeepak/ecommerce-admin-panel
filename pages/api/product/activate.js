import connect from "../../../lib/conn";
import Product from "../../../models/productsSchema";
import mongoose from "mongoose";

export default async function updateProduct(req, res) {
    console.log("activate")
    const productId = req.body.id;
    
    
    // Assuming you have already connected to the MongoDB database
    // with the appropriate MONGODB_URI
    
    // Find the product by its _id
    var isActive;
    const filter = { _id: productId };
    const state = await Product.findOne({_id:productId})
    
    if(state){
        isActive = !state.isActive;
    }
    const update = { isActive: isActive };
    
    // Use the findOneAndUpdate method to update the product
    const updatedProduct = await Product.findOneAndUpdate(filter, update, { new: true });
    
    if (updatedProduct) {
      // The product was successfully updated
      console.log("done")
      res.status(200).json({ success: true, message: "Product updated successfully" });
    } else {
      // The product with the given _id was not found
      res.status(404).json({ success: false, message: "Product not found" });
    }
}
