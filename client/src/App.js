import React, { Component } from 'react';
import SpeechList from './components/SpeechList'
import AddSpeech from './components/AddSpeech'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import SETTINGS from './settings'
import ImageEditor from './components/ImageEditor'

// apollo client setup
const client = new ApolloClient({
  uri: SETTINGS.graphqlURL
})


class App extends Component {
  
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
            <h2 className="text-center"> Meme Team</h2>
            <SpeechList />
            <AddSpeech />
            <ImageEditor
              imageStyle
            />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
