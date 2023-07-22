const mongoose = require("mongoose");
const paymentSchema = new mongoose.Schema(
  {
    user_id:{
        type:String
    },
    session_id:{
        type:String
    },
    id :{
        type:String
    },
    product:{
        type:String
    },
    validty:{
        type:Number
    },
    customer_email:{
        type:String
    },
    customer_name:{
        type:String
    },
    customer_phone:{
        type:String
    },
    expiry_date:{
        type:String
    },
    purchase_date:{
        type:String
     },
    invoice_pdf:{
        type:String
    },
    hosted_invoice_url:{
        type:String
    },
    receipt:{
        type:String
    },
    number:{
        type:String
    },
    added_by_admin:{
        type:Boolean
    },
    paid:{
        type:Boolean
    },
    total:{
        type:String
    },
    customer_address:[
        {
            city:{
                type:String
            },
            country:{
                type:String
            },
            line1:{
                type:String
            },
            line2:{
                type:String
            },
            postal_code:{
                type:String
            },
            state:{
                type:String
            }
        }
    ]
  },
  { timestamps: true }
);

// mongoose.set("strictQuery", true);


const Payment = mongoose.models.PAYMENT ||mongoose.model("PAYMENT", paymentSchema);
module.exports = Payment;