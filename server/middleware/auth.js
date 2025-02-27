const jwt= require('jsonwebtoken')
exports.verifytoken= (req,res,next)=>{
  try {
      let token=  req?.cookies['admin'] || req?.headers?.authorization?.split(' ')[1];
      console.log('token: ', token);

      if(!token){
          res.json({
              message:"token not found"
          })
      }
     
     
      const verifytoken=jwt.verify(token,process.env.Secret_Key)
      if(verifytoken){
          req.admin=verifytoken
          next()
      }else{
          res.json({
              error:true,
              message:"token is not verify"
          })
      }  
  } catch (error) {
    res.json(error)
  }
}
exports.isAdmin=(req,res,next)=>{
   try {
     const {role}=req.admin
     console.log(role);


     if(role==="admin"){
         next()
     }else{
         res.json({
             error:true,
             message:'your are not admin'
         })
     }
   } catch (error) {
    res.json(error)
   }
}

exports.isUser=(req,res,next)=>{
    try {
      const {role}=req.admin
      console.log(role);
       
      if(role==="user"){
          next()
      }else{
          res.json({
              error:true,
              message:'your are not user'
          })
      }
    } catch (error) {
     res.json(error)
    }
 }
 
