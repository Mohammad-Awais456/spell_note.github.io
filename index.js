const express = require("express");
const path = require("path");
const hbs = require("hbs");
const app = express();
const port = process.env.PORT || 5000;
// relative paths 
let css=path.join(__dirname,"./front_end/css");
let front_end=path.join(__dirname,"./front_end/");
let partials=path.join(__dirname,"./front_end/partials");
let views=path.join(__dirname,"./front_end/index");

//______________________________________
// middleswares
app.use(express.json());
app.use(express.static(css));
app.use(express.static(front_end));
app.use(require("./back_end/router"));
//______________________________________
// set view engine
app.set("views",views);
app.set("view engine","hbs");
hbs.registerPartials(partials);
require("./back_end/db_connection");
//______________________________________


app.listen(port,(err)=>{
    if(err){ return err}
    console.log("server is running at port no."+port);
})