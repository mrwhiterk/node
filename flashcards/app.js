const express = require('express')

const app = express()

app.get('/', (req, res) => {
    res.send('<h1>I love treehouse</h1>')
})

app.get('/hello', (req, res) => {
    res.send('<h1>hello javascript developer</h1>')
})

app.listen(process.env.PORT, () => {
    console.log("The application is running on " + process.env.PORT)
})