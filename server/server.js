const express = require('express')
const db = require('./config/db')
const dotenv = require('dotenv').config();
const app = express()
const port = 3000
const Ticketapi = require('./routes/Ticket.route')
const adminroute = require('./routes/Admin.route')
const cookieParser = require('cookie-parser')


const cors = require("cors")
// const allowedOrigin = "https://localhost:5173/"


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.get('/', (req, res) => res.send('Hello World!'))

//db connect
db();

/// call api
app.use('/api/ticket', Ticketapi)
app.use('/api/admin', adminroute)

app.listen(port, () => console.log(`Example app listening on port http://localhost:${port}`))