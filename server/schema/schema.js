const graphql = require('graphql')
const _ = require('lodash')
const SpeechModel = require('../models/speech')
const CharacterModel = require('../models/character')

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = graphql

// dummy data
/*
var speechList = [
    {id: 1, dialogue: '..pehli fursat me nikal', characterId: 1},
    {id: 2, dialogue: 'Desh me ho rhe bhrastachaar ko mitaane k liye hm aapko aage aana pdega..', characterId: 2},
    {id: 3, dialogue: 'bhai land kra de', characterId: 3},
    {id: 4, dialogue: 'jadugar h?', characterId: 1},
    {id: 5, dialogue: 'malum na fir kaise tapa-tap tapa-tap', characterId: 1},
    {id: 6, dialogue: 'bhai 100-200 le le magar land kra de', characterId: 3},
    {id: 7, dialogue: 'aur inn aasmaan ki uchaiyo me.. kohra hi kohra', characterId: 3},
    {id: 8, dialogue: 'pehle gaddha surakshit krao..', characterId: 2},
]

var characterList = [
    {id: 1, name: 'Hindustani Bhau', tags: 'Youtube, roasting'},
    {id: 2, name: 'Municipality Bhai', tags: 'Youtube, tik-tok, municipality, bhrastachar'},
    {id: 3, name: 'Paragliding Bhai', tags: 'Youtube, Paragliding, land-kara-de'},
]

// queries for graphiQL
# {
#   character(id: "5e550e9b33340b26711283e6") {
#     name
#     speechList {
#       dialogue
#       id
#     }
#   }
# }

# {
#   speech(id: "5e5512493d8f1028069e5e3e") {
# 		dialogue
#     character {
#       name
#       speechList {
#         dialogue
#       }
#     }
#   }
# }

# {
#   characterList{
#     id
#     name
#   	tags
#     speechList {
#       dialogue
#     }
# 	}
# }

# {
#   speechList {
#     dialogue
#     character {
#       name
#       id
#     }
#   }
# }

# mutation {
#   addSpeech( dialogue: "Ooo bhaiii maro mujhe maaro", characterId: "5e555fbe3fd30433e6cbaba2"){
#     dialogue
#     character {
#       name
#       speechList {
#         dialogue
#       }
#     }
# 	}
# }

# mutation {
#   addCharacter( name: "Pak cricker fan", tags: "youtube, memes, tik-tok"){
# 		id
#     name
# 	}
# }

*/

const SpeechType = new GraphQLObjectType({
    name: 'Speech',
    fields: () => ({
        id: {type: GraphQLID},
        dialogue: {type: GraphQLString},
        character: {
            type: CharacterType,
            resolve(parent, args) {
                // console.log(parent, args)
                // return _.find(characterList, {id: parent.characterId })
                return CharacterModel.findById(parent.characterId)
            }
        }
    })
})

const CharacterType = new GraphQLObjectType({
    name: 'Character', // person
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString}, // name of person
        tags: {type: GraphQLString}, // person is tagged by
        speechList: { // speeches of person
            type: new GraphQLList(SpeechType),
            resolve(parent, args){
                // return _.filter(speechList, {characterId: parent.id })
                return SpeechModel.find({characterId: parent.id})
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        speech: {
            type: SpeechType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                // code to get data from db/other source
                // return _.find(speechList, {id: args.id})
                return SpeechModel.findById(args.id)
            }
        },
        character: {
            type: CharacterType,
            args: { id: {type: GraphQLID}},
            resolve(parent, args) {
                // return _.find(characterList, {id: args.id})
                return CharacterModel.findById(args.id)
            }
        },
        speechList: {
            type: new GraphQLList(SpeechType),
            resolve(parent, args) {
                // return speechList
                return SpeechModel.find({})
            }
        },
        characterList: {
            type: new GraphQLList(CharacterType),
            resolve() {
                // return characterList
                return CharacterModel.find({})
            }
        }
    }
})

// Mutation to create/update DB
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        // Fn to add speech
        addSpeech: {
            type: SpeechType,
            args: {
                dialogue: {type: new GraphQLNonNull(GraphQLString)},
                characterId: {type: new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent, args) {
                let newSpeech = new SpeechModel({
                    dialogue: args.dialogue,
                    characterId: args.characterId
                })
                return newSpeech.save()
            }
        },
        // Fn to add character 
        addCharacter: {
            type: CharacterType,
            args: {
               name: {type: new GraphQLNonNull(GraphQLString)},
               tags: {type: new GraphQLNonNull(GraphQLString)}
            },
            resolve(parent, args) {
                let newCharacter = new CharacterModel({
                    name: args.name,
                    tags: args.tags
                })
                return newCharacter.save()
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})