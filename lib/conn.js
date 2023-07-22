import mongoose from "mongoose";

const DB = process.env.MONGODB_URI;

const connect= handler   => async (req,res)=>{
  if(mongoose.connections[0].readyState){
    return handler(req,res);
  }
  await mongoose.connect(DB);
  return handler(req,res);
}


export default connect;
