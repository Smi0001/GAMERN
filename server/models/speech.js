const mongoose = require('mongoose')
const Schema = mongoose.Schema

const speechSchema = new Schema({
    dialogue: String,
    characterId: String
})

module.exports = mongoose.model('Speech', speechSchema)