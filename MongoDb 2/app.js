const express = require("express");
const app = express();
const path = require("path");
const userModel = require('../MongoDb 2/models/user');

//setting view engine for ejs (embedded java script)
app.set("view engine", "ejs");
app.use(express.json());//make it data available from form for req.body
app.use(express.urlencoded({ extended: true }));// middleware for reading data from forms and make it available req.body
app.use(express.static(path.join(__dirname, "public")));//for static files


app.get('/', (req, res)=>{
    res.render("index");
})
app.post('/create', async (req, res)=>{
    let {name, email, image} = req.body;
    let createdUser = await userModel.create({
        name,
        email,
        image
    })
    res.redirect("/read");
})
app.get('/read', async (req, res)=>{
    let users = await userModel.find()
    res.render("read", {users});
})
app.get('/edit/:userid', async (req, res)=>{
    let user = await userModel.findOne({ _id: req.params.userid });
    res.render("edit", {user});
})
app.post('/update/:userid', async (req, res)=>{
    let {name, email, image} = req.body;
    let user = await userModel.findOneAndUpdate({ _id: req.params.userid }, {name, email, image}, {new:true});
    res.redirect('/read');
})
app.get('/delete/:id', async (req, res)=>{
    let deletedUser = await userModel.findOneAndDelete({ _id: req.params.id });
    res.redirect("/read");
    console.log(deletedUser);
})

app.listen(3000);