const express = require('express')
const graphqlHTTP = require('express-graphql')
const schema = require('./schema/schema')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

// google image search setup
const GOOGLE_SEARCH_IMAGES = require('image-search-google')
// cseID https://cse.google.com/cse/setup/basic?cx=004973649819293208902%3Akfq78axqpes
const CSE_ID = '004973649819293208902:kfq78axqpes'
// gAPI key https://console.developers.google.com/apis/credentials?project=maximal-quanta-173719
const G_API_KEY = 'AIzaSyDFArRGA3jheuBJbVCdeOpL2WsAyo0ybrk'
const GOOGLE = new GOOGLE_SEARCH_IMAGES(CSE_ID, G_API_KEY)

//allow cross-origin requests
app.use(cors())

// Mongoose connection to mLab DB to use MoongoDB
mongoose.set('useUnifiedTopology', true)
mongoose.set('useNewUrlParser', true)
mongoose.connect('mongodb://smi:smi123@ds125526.mlab.com:25526/meme-dialogues')
mongoose.connection.once('open', () => {
    console.log('Mongoose connected to mLab')
})


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
        const options = optionsObj ? JSON.parse(optionsObj) : { page:1 }
        console.log('searchString', searchString, options )
        GOOGLE.search(searchString, options).then( response => {
            console.log('Found image search Result: ', response.length)
            res.status(200)
            res.send(response)
        })
    }
)

app.listen(4000, () => {
    console.log('Express server listening to port 4K')
}) 