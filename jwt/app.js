const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
// const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

app.use(cookieParser());

//encryption hash the plain password in other form to store or comapare (decrypt) the hash password with your plain pwd
// const saltRound = 10;
// const myPlainpassword = "akashAnshu";
//  bcrypt.genSalt(saltRound, function(err, salt) {
//     bcrypt.hash(myPlainpassword, salt, function(err, hash) {
//         console.log(hash);
//         bcrypt.compare(myPlainpassword, hash, function(err, result){
//             console.log("Result : ", result);
            
//         })
//     })
//  })

//jwt practice
app.get('/', (req, res)=>{
    const token = jwt.sign({email: "akash@gmail.com"}, "secret");
    //cookie(name, token)
    res.cookie("Token",token);
    console.log(token);
    res.send("done");
})


//setting cookies
// app.get('/', (req, res)=>{
//     res.cookie("Akash", "anshu");
//     res.send('Done');
// })
app.get('/read', (req, res)=>{
    let data = jwt.verify(req.cookies.Token, "secret");
    console.log(data);
})
// app.get('/read', (req, res)=>{
//     console.log(req.cookies.token);
//     res.send('Read Page');
// })

app.listen(3000);