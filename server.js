const express = require('express')
const hbs = require('hbs')
const fs = require('fs')

const port = 3000


let app = express()

hbs.registerPartials(__dirname + '/views/partials')

app.set('view engine', 'hbs')

app.use((req, res, next) => {  //express middleware, must call next
    let now= new Date().toString()
    let log = (`Date is ${now}, ${req.method}, ${req.url}`)
    console.log(log)
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log(`Unable to append to server.log: ${err}`)
        }       
    })
    next()
})

app.use(express.static(__dirname + '/public'))

// app.use((req, res, next) => {
//     res.render('mantenance.hbs', {
//         pageTitle: "Mantenance"
//     })
// })



hbs.registerHelper('getCurrentYear', () => new Date().getFullYear())
hbs.registerHelper('capitalise', (text) => text.toUpperCase())


app.get('/', (req, res) => { //handler
    res.render("home.hbs", {
        pageTitle: "Home",
        message: "Welcome to my website",

    })

})     

app.get('/about', (req, res) => {
    res.render("about.hbs", {
        pageTitle: 'About Page',
    })
})

app.get('/bad', (req, res) => {
    res.send({
        error: "Bad request",
        code: 400
    })
})
app.listen(port)