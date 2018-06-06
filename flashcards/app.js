const express = require('express')

const app = express()

app.set('view engine', 'pug')

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/cards', (req, res) => {
    res.render('card', { prompt: "Who is buried in Grant's tomb?", hint: "Think about whose tomb it is."})
})

app.listen(process.env.PORT, () => {
    console.log("The application is running on " + process.env.PORT)
})