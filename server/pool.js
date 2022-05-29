const mysql=require('mysql')

const pool=mysql.createPool({
    connectionLimit:100,
    host:'sql6.freesqldatabase.com',
    database:'sql6494773',
    user:'sql6494773',
    password:'djsQPrPJfW',
    // connectionLimit:100,
    // host:'localhost',
    // database:'phishin',
    // user:'root',
    // password:'1234'

})

module.exports=pool;
