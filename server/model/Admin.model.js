const { Schema, model } = require("mongoose");
const { common } = require("../utils/common");

const adminschema= new Schema({
    q_username:{
        ...common,
        unique:[true,"username should be unique"]
    },
    q_email:{
        ...common,
        unique:[true,"Email should be unique"]
    },
    q_password:common,
    q_role_id:{
        type:String,
        default:"user",
        enum:["user","admin"]
    }
},{
    timestamps:true
})

exports.Admin = model("Admin",adminschema)
