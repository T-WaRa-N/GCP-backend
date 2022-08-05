const express = require("express")
const app = express()


/* To enable this express server to be able to parse and access content in the body we require bordy-parse
middle ware. The body-parse extracts the entire bodyportion of the incoming request and exposes it to req.
body.
 */

//body parser middle-ware
const bodyParser = require("body-parser")
app.use( bodyParser.urlencoded( { extended: true } ) )
app.use( bodyParser.json() )

//file handler middle-ware
const fileHandler = require("fs")

//importing local json file
const testFile = require('./test.json')

//CRUD request come below to handle all requests from the frontend 

//handle GET request
app.get('/customer-list', (req, res) => { 
    fileHandler.readFile('./test.json', (err, content) => {
        if(err) res.send({"message":"file not found"})
        else res.send(`${content}`)
    })

})

//handle POST request
app.post('/customer-enlist', (req, res) =>{ 
    
    let newCustomer = {
        "ilali": req.body.ilali, 
        "emanini": req.body.emanini, 
        "igama": req.body.igama, 
        "umnxeba": req.body.umnxeba,
        "usuku": req.body.usuku
    }

    testFile.push(newCustomer)
    fileHandler.writeFile('./test.json', `${JSON.stringify(testFile, null, 2)}`,(err) =>{
        if(err) throw err
        else res.send({"message":"ungalinda ke ngoku bazofika, usemgceni!"})
    })
 })


//Sorting the listening port to be flexible also on deployment.
const PORT = process.env.PORT || 3001
app.listen( PORT, () => ( console.log( `GCP-server listening on port ${PORT}` ) ) )
