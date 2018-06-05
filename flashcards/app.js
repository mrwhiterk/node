const express = require('express')

const app = express()

app.set('view engine', 'pug')

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/hello', (req, res) => {
    res.send('<h1>hello javascript developer</h1>')
})

app.listen(process.env.PORT, () => {
    console.log("The application is running on " + process.env.PORT)
})