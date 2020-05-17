import axios from 'axios'
import { AppActions } from '../actions';
import store from '../reduxStore'
import { MODALS, INTENTIONAL_NULL_VALUE } from '../constants/constants'
import GOOGLE_IMAGE_API from './google-image-utils'

const BASE_API_DOMAIN = 'http://localhost:4000/'
const baseUrl = process.env.NODE_ENV === "development" ? BASE_API_DOMAIN : '/'
const URL = {
    getSearchResults: `search?q=searchString&options=optionsObject`,
}

const APIUtils = {
    getSearchResults: (searchString, options) => {
        const url = baseUrl +
            URL.getSearchResults
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

    getGoogleResultsFromUI: async (searchString, optionsObj) => {
        // parameter page is actually startIndex
        const options = optionsObj ? optionsObj : { page: 1 }
        try {
            const resultList = await GOOGLE_IMAGE_API(searchString, options)
            resultList &&
                store.dispatch(
                    AppActions.setImageList(resultList)
                )
        } catch (error) {
            console.log('Error in getGoogleResultsFromUI:', error)
        }
    },

}

export default APIUtils