const mysql2 = require("mysql2");
const bcrypt = require("bcryptjs");
const db = mysql2.createConnection(
    {
        host:process.env.DATABASE_HOST,
        user:process.env.DATABASE_USER,
        password:process.env.DATABASE_PASS,
        database:process.env.DATABASE 
    }
);
exports.register =(req,res)=>
{
   const {name,email,password,confirm_password} = req.body;
   
  db.query('SELECT EMAIL FROM users WHERE EMAIL = ?',[email],
   async (error,result)=>{
    if(error)
    {
        console.log(err);
    }
    if(!name || !email|| !password|| !confirm_password)
    {
        return res.render("register",{msg:"FILL ALL DETAILS"});
    }
    if (result.length>0)
    {
        return res.render("register",{ msg: "Email Taken Already"});
    }
    else if(password!==confirm_password)
    {
        return res.render("register",{msg:"Password do not match"});
    }
    let hashedPassword = await bcrypt.hash(password,8);
    console.log(hashedPassword);
    db.query(
        'insert into users set ?',
        {NAME:name,EMAIL:email,PASS:hashedPassword},(error,result)=>
    {
        if(error)
        {
            console.log(error);
        }
        else{
            console.log(result);
            return res.render("register",{msg : "successfull"});
        }
    }
    )

   })
   
}