//express practice
const express = require('express');
const app = express();

//use func runs first then other routes will gets execute
//Middleware
app.use(function(req, res, next) {
    console.log('middleware chala');
    next();
})
app.use(function(req, res, next) {
    console.log('middleware chala ek aur bar');
    next();
})

//routes
app.get("/", function(req, res){
    res.send("Hello Akash from home route");
});
app.get("/account", function(req, res){
    res.send("Hello Akash from home account");
});

//Error Handling
app.get("/about", function(req, res, next){
    return next(Error("Not Implemented"));
});

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })

app.listen(3000);