// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connect from "../../../lib/conn";
import Product from "../../../models/productsSchema"



const handler  = async (req,res)=>{

    // const users = await User.find();
    console.log(req.body.id)
    console.log("req.body.id")
    
    if(req.method == "POST"){
        console.log(req.body.id);
        const id = req.body.id;
        
        try{
            const productExist = await Product.findOne({_id:id});
            if(!productExist){
                console.log("product===")
                return res.status(422).json({success: false, message: "Prduct not exists" });
            }
            // delete
            await Product.deleteOne({_id:id});
            console.log("product")
            res.status(200).json({message:"Product Deleted"})
        }
        catch(err){
            console.log(err);
            return res.status(201).json({ success: false ,message: "Connection Problem" });
        }
    }
    else{
        res.status(400).json({error:"This method is not allowed"});
    }
    
}

export default connect(handler);














// connect();

// export default async function handler(req, res) {
//   const { name, email, phone, pwd } = req.body;
//   console.log(req.body);
//   if (!name || !email || !phone || !pwd) {
//     return res.status(422).json({ error: "Enter all field" });
//   }
//   try {
//     const userExist = await User.findOne({ email: email });
//     if (userExist) {
//       return res.status(422).json({ error: "Email Already Exists" });
//     }

//     const user = new User({ name, email, phone, pwd });

//     await user.save();

//     res.status(201).json({ message: "User registered successfully" });
//   } catch (err) {
//     console.log(err);
//   }
// }
