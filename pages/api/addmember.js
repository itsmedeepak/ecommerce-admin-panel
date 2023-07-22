
import connect from "../../lib/conn";
import Payment from "../../models/paymentSchema";



const handler = async (req, res) => {
    var number =( req.body.number);


    try {
        const payment = await Payment.findOne({number:number})
        console.log(payment)
        if (payment) {
            if(payment.added_by_admin){
                return res.status(200).json({success: false,message:"Already Verified !"});
            }
            await Payment.updateOne({number:number}, {$set:{added_by_admin:true}})
              console.log("done")
              return res.status(200).json({success:true,message:"Verified"})
        }
        else {
            res.status(200).json({success: false,message:"No user found !"});
        }
    }
    catch(e) {
        console.log(e);
        res.status(200).json({success: false, message:"Connection error"});
    }
}
export default connect(handler)