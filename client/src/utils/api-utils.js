import axios from 'axios'
import { AppActions } from '../actions';
import store from '../reduxStore'
import { MODALS, INTENTIONAL_NULL_VALUE } from '../constants/constants'

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
            store.dispatch(
                AppActions.setImageList(response.data)
            )
        })
        .catch(error => console.log(error))
    },

    // first checks for imageURL(higher dimension)
    // if fails then checks for imageThumbnail(smaller dimension)
    // if still fails displays alert modal
    checkImageExists: function(imageThumbnail, imageURL, xtraImage) {
        const _this = this
        axios.get(imageURL)
        .then(() => {
            store.dispatch(
                AppActions.loadSelectedImageURL(imageURL, xtraImage)
            )
        })
        .catch(error => {
            console.log('could not fetch imageURL', error)
            imageThumbnail
            ?
                _this.checkImageExists(INTENTIONAL_NULL_VALUE, imageThumbnail, xtraImage)
            :
                store.dispatch(
                    AppActions.openModal(
                        MODALS.imageLoadFail,
                        {
                            xtraImageloading: false,
                            useImageloading: false
                        }
                    )
                )
        })
    },

    
}

export default APIUtils