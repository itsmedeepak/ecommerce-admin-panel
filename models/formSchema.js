
import mongoose from "mongoose";

const formSchema = new mongoose.Schema({
    user_id:{
        type:"string",
        required:true
    },
    tradingView:{
        type:"string",
        required:true
    },
    teligram:{
        type:"string",
        required:true
    },
    discord:{
        type:"string",
        required:true
    },
    whatsapp:{
        type:"string",
        required:true
    },

})


mongoose.models = {}
const Form = mongoose.model.FORM || mongoose.model('FORMDATA',formSchema);

module.exports = Form;
