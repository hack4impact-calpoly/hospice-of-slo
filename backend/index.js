/* eslint-disable */


const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('Test')
})
  
app.listen(3001, () => {
    console.log('Listening')
})