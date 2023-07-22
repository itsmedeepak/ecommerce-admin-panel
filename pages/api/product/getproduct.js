// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connect from "../../../lib/conn";
import Product from "../../../models/productsSchema"



const handler  = async (req,res)=>{
    console.log(req)
        try{
            const products = await Product.find();
            console.log(products)
            res.status(200).json({message:"ok", products})
        }
        catch(err){
            console.log(err);
            return res.status(201).json({ success: false ,message: "Connection Problem" });
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
