const express = require('express')
const graphqlHTTP = require('express-graphql')
const schema = require('./schema/schema')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

//allow cross-origin requests
app.use(cors())

// Mongoose connection to mLab DB to use MoongoDB
mongoose.set('useUnifiedTopology', true)
mongoose.set('useNewUrlParser', true)
mongoose.connect('mongodb://smi:smi123@ds125526.mlab.com:25526/meme-dialogues')
mongoose.connection.once('open', () => {
    console.log('Mongoose connected to mLab')
})


app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

app.listen(4000, () => {
    console.log('Express server listening to port 4K')
}) 