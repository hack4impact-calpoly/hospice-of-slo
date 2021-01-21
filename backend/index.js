const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://dbUserCole:BP1fgVHMqPtodWI2@cluster0.4uwkp.mongodb.net/hospice-of-slo?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(() => console.log('Connected to MongoDB'))

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