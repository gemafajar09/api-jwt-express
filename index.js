const express           = require('express')
const bodyParser        = require('body-parser');
const cors              = require("cors");

require('dotenv').config();

const app = express()
const port = process.env.PORT;
const secret_key = process.env.SECRET_KEY;

var corsOptions = {
    origin: "http://localhost:3000"
};
  
app.use(cors(corsOptions));

// permintaan dari content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// permintaan dari content-type - application/json
app.use(bodyParser.json())

// memanggil router
const routers = require('./router/router')

// menggunakan middleware
app.use('/api/', routers) 

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})