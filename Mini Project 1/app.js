const express = require("express");
const app = express();
const userModel = require("../Mini Project 1/models/user");
const postModel = require("../Mini Project 1/models/post");
const path = require("path");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const upload = require('../Mini Project 1/config/multerconfig');

app.set("view engine", 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());


app.get('/', (req, res)=>{
    res.render("index");
})
app.get('/profile/upload', (req, res)=>{
    res.render("profileupload");
})

app.post('/upload', isLoggedIn, upload.single("image"), async (req, res)=>{
    console.log(req.file);
    const user = await userModel.findOne({ email: req.user.email });
    user.profilepic = req.file.filename;
    await user.save();
    res.redirect('/profile');
})

app.post('/register', async (req, res)=>{
    let {name, username, password, age, email} = req.body;

    let user = await userModel.findOne({email});
    if(user) return res.status(500).send("User already registered");

    bcrypt.genSalt(10, (err, salt)=>{
        bcrypt.hash(password, salt, async (err, hash)=>{
            let user = await userModel.create({
                name,
                username,
                password: hash,
                age,
                email
            });
            let token = jwt.sign({email, userid: user._id}, "secret");
            res.cookie("token", token);
            res.send("registered");
        })
    })
})

app.get('/login', (req, res)=>{
    res.render("login");
})
app.get('/profile', isLoggedIn, async (req, res)=>{
    const user = await userModel.findOne({ email : req.user.email }).populate('posts');
    console.log(user);
    res.render("profile", {user});
})
app.get('/like/:id', isLoggedIn, async (req, res)=>{
    const post = await postModel.findOne({ _id : req.params.id }).populate('user');
    if(post.likes.indexOf(req.user.userid) === -1) {
        post.likes.push(req.user.userid);
    }
    else {
        post.likes.splice(post.likes.indexOf(req.user.userid), 1);
    } 

    await post.save();

    res.redirect('/profile')
})
app.get('/edit/:id', isLoggedIn, async (req, res)=>{
    const post = await postModel.findOne({ _id : req.params.id }).populate('user');
    res.render("edit", {post});
})
app.post('/update/:id', isLoggedIn, async (req, res)=>{
    await postModel.findOneAndUpdate(
        { _id: req.params.id },  
        { content: req.body.content }
    );
     res.redirect('/profile');
})
app.post('/post', isLoggedIn, async (req, res)=>{
    const user = await userModel.findOne({ email : req.user.email });
    let {content} = req.body;
    let post = await postModel.create({
        user: user._id,
        content,
    });
    user.posts.push(post._id);
    await user.save();
    res.redirect('/profile');
})

app.post('/login', async (req, res)=>{
    let {email, password} = req.body;

    let user = await userModel.findOne({email});
    if(!user) return res.status(500).send("Something went wrong");
    
    bcrypt.compare(password, user.password, (err, result)=>{
        
        if(result) {
            let token = jwt.sign({email, userid: user._id}, "secret");
            res.cookie("token", token);
            res.status(200).redirect('/profile');
        }
        else res.redirect('/login');

    });
})

app.get('/logout', (req, res)=>{
    res.cookie("token", "");
    res.redirect('/login');
})

function isLoggedIn (req, res, next){
    const token = req.cookies.token;
    if(!token) {
        res.redirect('/login');
    }
    else {
        let data = jwt.verify(req.cookies.token, "secret");
        req.user = data;
        next();
    }
}

app.listen(3000);