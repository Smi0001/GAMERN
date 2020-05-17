const express = require('express')
const app = express()
const graphqlHTTP = require('express-graphql')
const schema = require('./schema/schema')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config();
const bodyParser= require('body-parser')
const path = require("path")
// google image search setup
const GOOGLE_SEARCH_IMAGES = require('image-search-google')
// cseID https://cse.google.com/cse/setup/basic?cx=004973649819293208902%3Akfq78axqpes
const CSE_ID = '004973649819293208902:kfq78axqpes'
// gAPI key https://console.developers.google.com/apis/credentials?project=maximal-quanta-173719
const G_API_KEY = 'AIzaSyDFArRGA3jheuBJbVCdeOpL2WsAyo0ybrk'
const GOOGLE = new GOOGLE_SEARCH_IMAGES(CSE_ID, G_API_KEY)

//allow cross-origin requests
app.use(cors())
.use(express.static("public"))
.use(bodyParser.urlencoded({extended: true}))

// Mongoose connection to mLab DB to use MoongoDB
mongoose.set('useUnifiedTopology', true)
mongoose.set('useNewUrlParser', true)
mongoose.connect(process.env.MONGODB_MEME_URI
//    , (err, db) => !err && console.log("We are connected")
)
mongoose.connection.once('open', () => console.log('Mongoose connected to mLab'))


app
.use(
    '/graphql',
    graphqlHTTP({
        schema,
        graphiql: true
    })
)
.use(
    '/search',
    function(req, res) {
        const searchString = req.query.q
        let optionsObj = req.query.options
        optionsObj = JSON.parse(optionsObj)
        const options = optionsObj ? optionsObj : { page:1 }
        console.log('searchString', searchString, options )
        GOOGLE.search(searchString, options).then( response => {
            console.log('Found image search Result: ', response.length)
            res.status(200)
            res.send(response)
        })
    }
)
.use('/static',express.static(path.join(__dirname + '/public/static')))
.get('/testing', (req, res) => {   
    res.send({success: true, message: 'URL is active'});
})
// .get('*',
//     function(req, res) {
//         res.sendFile(path.join(__dirname + '/public/index.html'))
// })

.listen(process.env.PORT, () => {
    console.log(`Express server listening to port ${process.env.PORT}`)
}) 