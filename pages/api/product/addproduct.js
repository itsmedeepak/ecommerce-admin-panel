
import connect from "../../../lib/conn";
import Product from "../../../models/productsSchema"
import mongoose from "mongoose";


export default async function addproduct (req, res){
    console.log(req.body)
    const lifetime_price_id= req.body.lifeTime_price_id;
    const isActive = true;
    const {name, short_description, description, version, script, trader, market, dashboard, alerts, signal, monthly_price, monthly_price_id, yearly_price, yearly_price_id, lifetime_price , f1_text,  f2_text, f3_text, f4_text, f5_text, img1, img2, img3, img4, img5 }= req.body;
    
    if (!mongoose.connections[0].readyState) {

    }
    await mongoose.connect(process.env.MONGODB_URI);
    mongoose.set("strictQuery", true);
    console.log("DB Connected")



    const product = new Product({name,isActive, short_description, description, version, script, trader, market, dashboard, alerts, signal, monthly_price, monthly_price_id, yearly_price, yearly_price_id, lifetime_price, lifetime_price_id, f1_text,  f2_text, f3_text, f4_text, f5_text, img1, img2, img3, img4, img5 })
    await product.save() 
    console.log("succes")
    res.status(201).json({ success: true});

}
















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














// ================
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import connect from "../../../lib/conn";
// import Product from "../../../models/productsSchema"
// import mongoose from "mongoose";
// import multer from 'multer';
// import { v4 as uuidv4 } from 'uuid';
// const path = require("path")
// const fs = require('fs')

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'public/uploads/')
//     },
//     filename: (req, file, cb) => {
//         console.log(file)
//         cb(null, Date.now() + path.extname(file.originalname));
//     }
// })

// const upload = multer({ storage: storage });

// const handler = async (req, res) => {


//     console.log("addproduct")
//     if (req.method === 'POST') {
//         upload.single('image')(req, res, async (err) => {

//             console.log(req.body)
//             const { name, description, version, script, alert, signal, upgrade, market, monthly_id, monthly_price, yearly_id, yearly_price, lifeTime_id, lifetime_price } = req.body;
//             if (err) {
//                 console.log(err)
//             }

//             console.log(name, "dee;rloglhaeoligr", alert);
//             // Save image file to server
//             const file = req.file;
//             console.log(file.filename)
//             // const filename = file.filename;

//             // const filepath = `public/uploads/${filename}`;
//             // const imageUrl = `public/uploads/${file.filename}`;
//             // console.log(imageUrl, filepath)
//             // require('fs').writeFile(filepath, file, (err) => {
//             //     if (err) throw err;
//             // });
//             if (!mongoose.connections[0].readyState) {

//             }
//             await mongoose.connect(process.env.MONGODB_URI);
//             mongoose.set("strictQuery", true);
          
          
//             console.log("DB Connected")
//             const image = file.filename;
//             const product = new Product({ name, description, version, script, alert, signal, upgrade, market, monthly_id, monthly_price, yearly_id, yearly_price, lifeTime_id, lifetime_price,image})
//             await product.save()
//             console.log("succes")
//             res.status(201).json({ success: true, img:image});
//         });
//     }
// }
// export const config = {
//     api: {
//         bodyParser: false,
//     },
// };

// export default handler;














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
