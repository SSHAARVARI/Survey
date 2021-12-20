const mysql=require('mysql')

const pool=mysql.createPool({
    connectionLimit:100,
    host:'sql6.freesqldatabase.com',
    database:'sql6458924',
    user:'sql6458924',
    password:'37Uyj4gxTP',
})

module.exports=pool;