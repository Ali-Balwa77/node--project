require('dotenv').config();
const express = require("express");
const app = express();
const path = require('path');
const hbs = require('hbs');
require('./db/conn');
const cookieParser = require('cookie-parser');
const emprouter = require('./router/emp');

const port = process.env.PORT || 5000

const static_path = path.join(__dirname,"../public")
const template_path = path.join(__dirname,"../templates/views")
const partials_path = path.join(__dirname,"../templates/partials")

app.use(express.json())
app.use(cookieParser())
app.use(emprouter)
app.use(express.static(static_path))
app.set("view engine", 'hbs')
app.set("views", template_path)
hbs.registerPartials(partials_path)


app.listen(port,() =>{
    console.log(`server is running at port no ${port}`)
})