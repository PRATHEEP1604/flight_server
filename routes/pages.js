const express = require("express");
const router = express.Router();
router.get("/",(req,res)=>
{
    res.render("home")
});
router.get("/book",(req,res)=>
{
    res.render("book");
});
router.get("/login",(req,res)=>
{
    res.render("index");
});
router.get("/register",(req,res)=>
{
    res.render("register")
});
router.get("/profile",(req,res)=>
{
    res.render("profile");
});
router.get("/seat",(req,res)=>
{
    res.render("seat");
});
router.get("/contact",(req,res)=>
{
    res.render("contac");
});
router.get("/options",(req,res)=>
{
    res.render("options");
}
);
module.exports = router;
