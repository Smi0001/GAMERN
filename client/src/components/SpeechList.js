import React, { Component } from 'react';
import { graphql } from 'react-apollo'
import { getSpeechListQuery } from '../queries/queries'

class SpeechList extends Component {

    displaySpeechList() {
        const data = this.props.data
        if (data.loading) {
            return (
                <div>Loading Speeches...</div>
            )
        } else if (data.speechList && data.speechList.length > 0) {
            return (
                <ul className="speech-list">
                    {
                        data.speechList.map( speech => (
                            <li key={speech.id}>{speech.dialogue}</li>
                        ))
                    }
                </ul>
            )
        } else {
            return <div>No Speeches yet!</div>
        }
    }

    render() {
        return (
            <div className="container-fluid speech-list-container">
                {this.displaySpeechList()}
            </div>
        );
    }
}

export default graphql(getSpeechListQuery)(SpeechList);
