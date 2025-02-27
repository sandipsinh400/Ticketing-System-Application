const { Admin } = require('../model/Admin.model')
const { plainToHash, hashToplain } = require('../utils/password')
const jwt = require('jsonwebtoken')

const checkemail = async (q_email) => {
  const Adminexist = await Admin.findOne({ q_email })
  if (Adminexist) {
    return true
  }
}

exports.signup = async (req, res) => {

  try {
    const { q_username, q_email, q_password } = req.body

    const Adminexist = await checkemail(q_email)
    if (Adminexist) {
      res.status(403).json({
        message: "email id is already exist"
      })
    } else {
      const hash_password = await plainToHash(q_password)
      const admin = await Admin.create({
        q_username, q_email, q_password: hash_password
      })
      if (admin) {
        res.status(201).json({
          success: true,
          message: 'signup successfully!'
        })
      }
    }
  } catch (error) {
    res.status(502).json(error)
  }
}

exports.login = async (req, res) => {
  const { q_email, q_password } = req.body
  const Adminexist = await checkemail(q_email)
  if (Adminexist) {
    const admin = await Admin.findOne({ q_email })
    const match = await hashToplain(q_password,admin.q_password)
    if(!match){
      res.status(200).json({
        success:false,
        message:"Invalid credential"
      })
    }

    if (match) {
      const payload = {
        id: admin._id,
        role: admin.q_role_id
      }

      const token = jwt.sign(payload,process.env.Secret_Key,{ expiresIn: '1h' })
     
      res.cookie('admin', token, { 
        httpOnly: true, 
        secure: true, 
        sameSite: 'None', 
        maxAge: 60 * 60 * 1000 
    }).json({
        success: true,
        message: 'Login successfully',
        admin
    });
    

    }
  } else {
    res.status(403).json({
      message: "email id is not exist"
    })
  }

}

exports.logout=(req,res)=>{
  res.clearCookie('admin').json({
      success:true,
       message:'logout successfully '
  })
}