const express = require("express");
const app = express();
const userModel = require("./usermodel");

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.get('/create', async (req, res) => {
    let createdUser = await userModel.create({
        name: "Abdul",
        username: "abdul",
        email: "abdul@example.com",
    })
    res.send(createdUser);
})

app.get('/update', async (req, res) => {
    let upadatedUser = await userModel.findOneAndUpdate({username: "akash097"}, {name: "Akash Gupta"}, {new: true});
    res.send(upadatedUser);
})

app.get('/read', async (req, res) => {
    let users = await userModel.find(); //findOne
    res.send(users);
})

app.get('/delete', async (req, res) => {
    let deletedUser = await userModel.findOneAndDelete({username: "abdul"});
    res.send(deletedUser);
})

app.listen(3000);