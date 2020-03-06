import * as actionType from '../actions/ActionType';
import APIUtils from '../utils/api-utils'

const initialState = {
    searchString: '',
    imageList: [],
    imageListloading: false,
    isImageLoaded: false,
    useImageloading: false,
    selectedImageURL: null,
    openAdditionalImageAlertModal: false,
    canvasSize: {},
    largestImageSize: {},
    selectedImageId: null,
    resultCount: 0,
    options: {
        page: 1,
    }
}


const reducerState = (prevState = {}, action) => {

    switch (action.type) {

        case actionType.GET_IMAGE_LIST: {
            let {
                searchString,
                options
            } = action.payload
            APIUtils.getSearchResults(
                searchString,
                options
            )
            return {
                ...prevState,
                imageListloading: true,
            }
        }
        
        case actionType.SET_IMAGE_LIST: {
            let {
                imageList
            } = action.payload
            return  {
                ...prevState,
                imageList,
                imageListloading: false,
                resultCount: imageList.length,
                selectedImageId: null,
            }
        }

        case actionType.USE_IMAGE: {
            let {
                imageThumbnail,
                imageUrl,
                imageId
            } = action.payload
            APIUtils.checkImageExists(imageThumbnail, imageUrl)
            return  {
                ...prevState,
                useImageloading: true,
                selectedImageId: imageId,
            }
        }

        case actionType.LOAD_SELECTED_IMAGE_URL: {
            let {
                selectedImageURL,
            } = action.payload
            return  {
                ...prevState,
                selectedImageURL,
                useImageloading: false,
                isImageLoaded: true,
            }
        }

        case actionType.SET_IS_IMAGE_LOADED: {
            let {
                isImageLoaded
            } = action.payload
            return {
                ...prevState,
                isImageLoaded
            }
        }

        case actionType.OPEN_IMAGE_ALERT_MODAL: {
            let {
                openAdditionalImageAlertModal,
                canvasSize,
                largestImageSize
            } = action.payload
            const canvasObject = {}
            if (canvasSize) {
                canvasObject.canvasSize = canvasSize
            }
            if (largestImageSize) {
                canvasObject.largestImageSize = largestImageSize
            }
            return {
                ...prevState,
                openAdditionalImageAlertModal,
                ...canvasObject
            }
        }

        default:
            return {...initialState}
    }
}

export default reducerState;