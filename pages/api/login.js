const Login = async (req, res) => {
  console.log(req.body);
  const email = req.body.email;
  const pwd = req.body.pwd;

  var permission = email.split("@");
  permission = permission[0];

  if(permission =='admin'){
    const em = 'admin@testing.com';
    const pw = process.env.LOGIN_PWD;
    if (em == email && pw == pwd) {
      return res.status(200).json({ success: true , message:'admin'});
    }
  }
  if(permission =='owner'){
    const em = 'owner@patalgo.com';
    const pw = 'OwPat#2023'
    if (em == email && pw == pwd) {
      return res.status(200).json({ success: true, message:"owner" });
    }
  }
  if(permission =='agent'){
    const em = 'agent@patalgo.com';
    const pw = 'AgPat$2023'
    if (em == email && pw == pwd) {
      return res.status(200).json({ success: true , message:"agent"});
    }
  }

  
  // console.log(em, pw, email, pwd);
  
  return res.status(200).json({ success: false });
};

export default Login;
