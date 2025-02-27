const router = require('express').Router()
const admincontroller=require('../controller/Admin.controller')

router.post('/signup',admincontroller.signup)
router.post('/login',admincontroller.login)
router.post('/logout',admincontroller.logout)


module.exports=router