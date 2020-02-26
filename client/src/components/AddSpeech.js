import React, { Component } from 'react';
import { graphql } from 'react-apollo'
import { getCharacterListQuery, addCharacterMutation, addSpeechMutation, getSpeechListQuery } from '../queries/queries'
import * as compose from 'lodash.flowright'

const ADD_NEW_CHARCTER = 'addNewCharacter'
const SELECT_CHARACTER = 'selectCharacter'
class AddSpeech extends Component {

    constructor(props) {
        super(props)
        this.state = {
            selectedCharacterId: null,
            addNewCharacter: false,
            currentDialogue: null,
            dialogue: null,
            characterName: null,
            characterTags: null,
            disableSubmit: true,
        }
    }

    handleCharacterSelection(event) {
        event.stopPropagation()
        let characterSelectionObject;
        let selectedCharacterId =  event.target.value
        if (selectedCharacterId === ADD_NEW_CHARCTER) {
            characterSelectionObject = {
                addNewCharacter: true,
            }
        } else {
            characterSelectionObject = {
                selectedCharacterId,
                addNewCharacter: false,
            }
        }
        this.setState(
            characterSelectionObject,
            () => this.setDisableSubmitValue()
        )
    }

    setDisableSubmitValue() {
        const { addNewCharacter, dialogue, selectedCharacterId, characterName } = this.state
        const addNewCharacterCaseInvalid = !(characterName && characterName.trim())
        const addSpeechCaseInvalid = !(
            dialogue && dialogue.trim()
            && selectedCharacterId
            && selectedCharacterId !== SELECT_CHARACTER
            && selectedCharacterId !== ADD_NEW_CHARCTER
        )
        let disableSubmit = true
        if (addNewCharacter) {
            disableSubmit = addNewCharacterCaseInvalid
        } else {
            disableSubmit = addSpeechCaseInvalid
        }
        this.setState({
            disableSubmit
        })
    }
    handleDialogue(event) {
        let dialogue = event.target.value
        this.setState({     
            dialogue,
        }, () => this.setDisableSubmitValue())
    }

    handleCharacterName(event) {
        let characterName = event.target.value
        this.setState({
            characterName,
        }, () => this.setDisableSubmitValue())
    }

    handleCharacterTags(event) {
        let characterTags = event.target.value
        this.setState({
            characterTags
        })
    }

    displayCharacterList() {
        const data = this.props.getCharacterListQuery
        if (data.loading) {
            return (
                <option>Loading Characters...</option>
            )
        } else if (data.characterList && data.characterList.length > 0) {
            return (
                data.characterList.map( character => (
                    <option key={character.id}
                        value={character.id}
                    >
                        {character.name}
                    </option>
                ))
            )
        } else {
            return <option disabled>No characters yet!</option>
        }
    }

    submitForm(event) {
        event.preventDefault()
        const { characterName, characterTags, dialogue, selectedCharacterId } = this.state
        if (selectedCharacterId === ADD_NEW_CHARCTER && characterName && characterName.trim()) {
            this.props.addCharacterMutation({
                variables: {
                    name: characterName,
                    tags: characterTags
                }
            })
        } else  if (dialogue && dialogue.trim() && selectedCharacterId !== SELECT_CHARACTER) {
            this.props.addSpeechMutation({
                variables: {
                    dialogue,
                    characterId: selectedCharacterId
                },
                refetchQueries: [
                    {query: getSpeechListQuery}
                ]
            })
        } else {
            console.log('dont call mutation')
        }
    }

    render() {
        const { addNewCharacter, disableSubmit } = this.state
        return (
            <div className="add-speech-container container">
                <form id="add-speech-form" onSubmit={this.submitForm.bind(this)}>
                    { !addNewCharacter &&
                        <div className="field">
                            <label >Dialogue:</label>
                            <input type="text" required onKeyUp={this.handleDialogue.bind(this)} />
                        </div>
                    }
                    <div className="field">
                        <label >Character:</label>
                        <select onChange={this.handleCharacterSelection.bind(this)}>
                            <option defaultValue value={SELECT_CHARACTER}>Select one</option>
                            {this.displayCharacterList()}
                            <option value={ADD_NEW_CHARCTER} className="">+Add new character</option>
                        </select>
                    </div>

                    { addNewCharacter && (
                        <div>
                            <div className="field">
                                <label >Character Name:</label>
                                <input type="text" required onBlur={this.handleCharacterName.bind(this)} />
                            </div>
                            <div className="field">
                                <label >Character Tags (comma separated)</label>
                                <textarea type="text" onBlur={this.handleCharacterTags.bind(this)}></textarea>
                            </div>
                        </div>
                        
                    )}

                    <button className={'add-speech-btn ' + (disableSubmit? ' disable-btn': '')} disabled={disableSubmit ? true : null}>+</button>

                </form>
            </div>
        );
    }
}

export default compose(
    graphql(getCharacterListQuery, { name: 'getCharacterListQuery' }),
    graphql(addCharacterMutation, { name: 'addCharacterMutation' }),
    graphql(addSpeechMutation, { name: 'addSpeechMutation' })
)(AddSpeech);
