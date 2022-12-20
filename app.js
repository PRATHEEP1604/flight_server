const express = require("express");
const mysql2 = require("mysql2");
const dotenv = require("dotenv");
const path = require("path");
const hbs = require("hbs");
const app = express();
dotenv.config({
    path:"./.env"
})
const db = mysql2.createConnection(
    {
        host:process.env.DATABASE_HOST,
        user:process.env.DATABASE_USER,
        password:process.env.DATABASE_PASS,
        database:process.env.DATABASE 
    }
);
db.connect((err)=>
{
    if(err)
    {
        console.log(err);
    }
    else{
        console.log("connection was successfull")
    }
});
app.use(express.urlencoded({extended:false}));
//console.log(__dirname);
const location = path.join(__dirname,"./public");
app.use(express.static(location));
app.set('view engine',"hbs");
app.use("/" ,require("./routes/pages"));
app.use("/auth",require("./routes/auth"));

app.listen(8000,()=>
{
    console.log("server started");
})

