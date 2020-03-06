import React, { Component } from 'react';
// import SpeechList from './components/SpeechList'
// import AddSpeech from './components/AddSpeech'
import MemeEditor from './components/MemeEditor';
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import SETTINGS from './settings'

// css stylesheets
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import './css/mdb-style.css';
import './css/App.css';
import GoogleImageResult from './components/GoogleImageResult';

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
					<GoogleImageResult />
					<MemeEditor />
					{/* <SpeechList /> */}
					{/* <AddSpeech /> */}
				</div>
			</ApolloProvider>
		);
	}
}

export default App;