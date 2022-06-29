const express = require('express');
const routes = require('./router')
//create a server
let app = express();
app.use('/test',routes);

//define port
app.listen(3000,()=> {
    console.log("server running on 3000");
});

module.exports = app;
