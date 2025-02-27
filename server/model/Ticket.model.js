const { Schema, model } = require("mongoose");
const { common } = require("../utils/common");

const Ticketschema=new Schema({
    Subject:common,
    Category:{
        ...common,
        enum:['Administrator','Analyst','Developer','Support'],
        default:"Developer"
    },
    Sub_Category:{
        ...common,
        enum:['Administrator','Analyst','Developer','Support'],
        default:"developer"
    },
    Description:common,
    File:{
        type:[],
        require:false
    },
    actions:{
        type:String,
        enum:['complete','rejected','assign'],
        default:"assign"
    }
    
},{
    timestamps:true
})

const Ticket= model('Ticket',Ticketschema)
module.exports=Ticket