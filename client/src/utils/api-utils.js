import axios from 'axios'
import { AppActions } from '../actions';
import store from '../reduxStore'

const baseUrl = 'http://localhost:4000/'

const URL = {
    getSearchResults: `search?q=searchString&options=optionsObject`,
}

const APIUtils = {
    getSearchResults: (searchString, options) => {
        const url = baseUrl
            +   URL.getSearchResults
            .replace('searchString', searchString)
            .replace('optionsObject', JSON.stringify(options))
        axios.get(url)
        .then(response => {
            console.log(response)
            store.dispatch(
                AppActions.setImageList(response.data)
            )
        })
        .catch(error => console.log(error))
    },

    checkImageExists: (imageThumbnail, imageUrl) => {
        let url = imageUrl
        axios.get(url)
        .then(response => {
            // console.log(response)
            store.dispatch(
                AppActions.loadSelectedImageURL(imageUrl) // higher dimension
            )
        })
        .catch(error => {
            console.log('could not fetch imageUrl', error)
            store.dispatch(
                AppActions.loadSelectedImageURL(imageThumbnail) // smaller dimension
            )
        })
    },

    
}

export default APIUtils