
import mongoose from "mongoose";

const newsletter= new mongoose.Schema({
    email:{
        type:"string",
        required:true
    },
})


mongoose.models = {}
const NewsLetter = mongoose.model('NEWSLETTER',newsletter);

module.exports = NewsLetter;
