const mysql=require('mysql')

const pool=mysql.createPool({
    connectionLimit:100,
    host:'sql6.freesqldatabase.com',
    database:'sql6460488',
    user:'sql6460488',
    password:'InCYKalDGP',

})

module.exports=pool;