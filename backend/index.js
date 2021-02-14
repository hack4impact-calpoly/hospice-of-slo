/*tslint:disabled*/
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cookieParser())

const { sendEmail } = require('../src/components/authentication/functions/mail')
app.get('/', (req, res) => {
    res.send('Test')
})

app.post("/api/sendMail", (req, res) =>{
    console.log(req.body)
    
    sendEmail(req.body.email, req.body.name, "welcome")
  })
  
app.listen(3001, () => {
    console.log('Listening')
})