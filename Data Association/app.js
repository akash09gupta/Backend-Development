const express = require("express");
const app = express();
const userModel = require("../Data Association/models/user");
const postModel = require("../Data Association/models/post");

app.get('/', (req, res)=>{
    res.send('Hello World!');
})

app.get('/create', async (req,res)=>{
    let user = await userModel.create({
        username: 'John Doe',
        email: 'johndoe@example.com',
        age: 15,
    })
    res.send(user);
})
app.get('/post/create', async (req,res)=>{
    let post = await postModel.create({
        postdata: "hello sarree log",
        user: '67b821145d33bee8fc36693b',
    })
    let user = await userModel.findOne({_id:'67b821145d33bee8fc36693b'});
    user.posts.push(post._id);
    await user.save();
    res.send({post, user});
})


app.listen(3000);