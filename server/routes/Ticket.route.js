const router= require('express').Router()
const Ticketcontroller=require('../controller/Ticket.controller')
const { verifytoken, isAdmin, isUser } = require('../middleware/auth')
const upload = require('../middleware/uploadfile')

router.route('/')
.post(upload.array('File',5),Ticketcontroller.store)
.get(Ticketcontroller.viewTicket)

router.put('/:id',Ticketcontroller.updateAction)
router.get('/:id',Ticketcontroller.Singleuser)


module.exports=router