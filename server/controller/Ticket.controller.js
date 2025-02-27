const Ticket = require('../model/Ticket.model')

exports.store = async (req, res) => {
    console.log(req.body);
    console.log(req.files);
    try {
        var arr = [];
        req.files.forEach((image) => {
            arr.push(image.filename)
        })

        const { Subject, Category, Sub_Category, Description, actions } = req.body
        if (!Subject || !Category || !Sub_Category || !Description) {
            res.status(400).json({
                success: true,
                message: "all field are required"
            })
        }

        await Ticket.create({
            Subject, Category, Sub_Category, Description, File: arr, actions: actions || "assign",
        })

        res.status(200).json({
            success: true,
            message: "form submited"
        })
    } catch (error) {
        res.status(400).json()
        console.log(error);
        
    }
}

exports.viewTicket = async (req, res) => {
   try {
     const ticket = await Ticket.find()
     if (ticket.length > 0) {
         res.json({
             success: true,
             ticket
         })
     } else {
         res.status(200).json({
             success: true,
             message: "ticket record not here"
         })
     }
   } catch (error) {
    res.json(error)
   }
}


exports.updateAction = async (req, res) => {
  try {
 
      const { actions } = req.body
      await Ticket.findByIdAndUpdate( req.params.id , {
          actions: actions
      }, { new: true }
      )
  
      res.json({
          success:true,
          message:'Actions Approved'
      })
  } catch (error) {
    res.json()
  }


}

exports.Singleuser=async(req,res)=>{
   try {
     const {id}=req.params
     const singleuser=await Ticket.findById(id)
     res.status(200).json({
         success:true,
         singleuser
     })
   } catch (error) {
    res.json()
   }
}

