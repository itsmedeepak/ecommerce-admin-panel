const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
// import { useCookies } from "react-cookie"
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type: Number,
        required:true
    },
    pwd:{
        type:String,
        required:true
    },
    activated:{
        type : Boolean,
        required:true
    },
    added_by_admin:{
        type : Boolean,
        required:true
    },
    

    purchased:{
        type:Boolean,
    },
    form_filled:{
        type:Boolean,
    },
    payment_id:[
        {
            p_id:{
                type:String,
            }
        }
    ],
    tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }
    ]
}, {timestamps: true})


userSchema.pre('save', async function(next){
    if(this.isModified('pwd')){
        console.log(this.pwd);
        this.pwd = await bcrypt.hash(this.pwd,12);
        console.log(this.pwd);
    }
    next();
})

userSchema.methods.generateAuthToken = async function(){
    try{
        let token = jwt.sign({__id:this.id},process.env.SECRETKEY);
        this.tokens=this.tokens.concat({token:token})
        // console.log()
        await this.save();
        return token;

    }
    catch(err){
        console.log(err)
    }
}

mongoose.models = {}
const User = mongoose.model('USER',userSchema);

module.exports = User;