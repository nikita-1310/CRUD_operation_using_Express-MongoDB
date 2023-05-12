const express = require("express");
const routerLogin = new express.Router();
const bcrypt = require("bcrypt");
const userData = require("../model/loginSchema");
const cookieParser = require("cookie-parser")
const {createTokens, validateToken} = require('./JWT')

routerLogin.use(cookieParser)
// app.use(cookieParser)

// login data
routerLogin.post("/register",async(req,res)=>{
    try{
        const {username, password} = req.body;
        let changedPassword= await bcrypt.hash(password, 10); //encrypting the password
        let adduser = await userData({
            username:username,
            password:changedPassword});
        adduser.save();
        res.send("USER REGISTERED");
    }
    catch(error){
        res.status(400).json({message:error.message})
    }
})
routerLogin.post('/login', async(req, res)=> {
    const {username, password} = req.body;
    let user =await userData.findOne({username:username});
    try{
        if(user != null){
            if(await bcrypt.compare(password, user.password )) {

                const accessToken = createTokens(user)
                res.cookie("access-token", accessToken, {
                    maxAge : 60 * 60 * 24 * 30 * 1000,
                   httpOnly: true,
                })
                res.send("Logged In");
            }
            else{
                res.send("Password does not match");
            }
        }
        else{
            res.status(400).json({error:"User does not exists"})
        }
     }
    catch(error){ {message: error.message} }
})

routerLogin.get("/login", validateToken, (req,res)=>{
    res.send("User is authenticated")
})
module.exports = routerLogin;