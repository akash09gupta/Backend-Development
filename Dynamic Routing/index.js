const express = require("express");
const app = express();
const path = require("path");
//for form data handling (Parser)
app.use(express.json());
app.use(express.urlencoded({ extended:true }));
//set ejs as a middleware (its for frontend like html but with dynamic stuff{calculation like})
app.set('view engine', 'ejs');
//joins public folder with current working dir path(static files ko public par dhundna like images videos css etc)
app.use(express.static(path.join(__dirname, 'public')));

// app.get('/', function(req, res) {
//     res.send("chal raha hai");
// })
//render view pages means files which are stored in views folder
// app.get('/', function(req, res) {
//     res.render("index");
// })

//Dynamic Routing
app.get('/profile/:kuchbhi', (req, res)=>{
    console.log(req.params.kuchbhi)
    res.send(req.params.kuchbhi);
})
app.get('/author/:user/:age', (req, res)=>{
    console.log(req.params.user);
    console.log(req.params.age);
    res.send("Chal rha hai");
})

app.listen(3000, function() {
    console.log("its running");
})