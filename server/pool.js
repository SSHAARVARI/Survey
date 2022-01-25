const mysql=require('mysql')

const pool=mysql.createPool({
    connectionLimit:100,
    host:'sql6.freesqldatabase.com',
    database:'sql6467920',
    user:'sql6467920',
    password:'5VSIA7UYhX',
    // connectionLimit:100,
    // host:'localhost',
    // database:'phishin',
    // user:'root',
    // password:'1234'

})

module.exports=pool;