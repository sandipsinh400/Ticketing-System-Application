const bcrypt= require('bcryptjs')

exports.plainToHash=async(password)=>{
    const salt= await bcrypt.genSalt(10)
    const hashpass= await bcrypt.hash(password,salt)
    return hashpass
}
exports.hashToplain=async(password,hash_password)=>{
    const match_pass=await bcrypt.compare(password,hash_password)
    return match_pass
}