import {gql} from 'apollo-boost'

const getSpeechListQuery = gql`
{
    speechList {
        id
        dialogue
    }
}
`

// {
//     speechList {
//         id
//         dialogue
//         character {
//             id
//             name
//             speechList {
//                 id
//                 dialogue
//             }
//         }
//     }
// }
const getCharacterListQuery = gql`
{
    characterList {
        id
        name
        tags
    }
}
`

const addSpeechMutation = gql`
mutation($dialogue: String!, $characterId: ID!) {
    addSpeech( dialogue: $dialogue, characterId: $characterId){
        id
        dialogue
        character {
            name
        }
    }
}
`

const addCharacterMutation = gql`
mutation($name: String!, $tags: String!) {
    addCharacter( name: $name, tags: $tags){
        id
        name
    }
}
`

export {
    getSpeechListQuery,
    getCharacterListQuery,
    addCharacterMutation,
    addSpeechMutation
}
