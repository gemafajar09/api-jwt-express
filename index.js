const express = require('express')
const bodyParser = require('body-parser');
const cors = require("cors");
const { logger } = require('./utils/logger');
const io = require("./router/socket.io");

require('dotenv').config();

const app = express()
const PORT = process.env.PORT;

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

io.on("connection", (socket) => {
    logger.info(`User connected : ${socket.id}`)
})

app.listen(PORT, () => {
    logger.info(`Running on PORT ${PORT}`);
})