import * as actionType from '../actions/ActionType';
import APIUtils from '../utils/api-utils'
import { EMPTY_STRING, INTENTIONAL_NULL_VALUE, BASE, imageEditorConfig } from '../constants/constants';

const initialState = {
    searchString: EMPTY_STRING,
    imageList: [],
    imageListloading: false,
    isBaseImageLoaded: false,
    openImageSizeModal: false,
    useImageloading: false,
    xtraImageloading: false,
    showXtraEditor: false,
    selectedImageURL: INTENTIONAL_NULL_VALUE,
    xtraImageURL: INTENTIONAL_NULL_VALUE,
    openAdditionalImageAlertModal: false,
    openModalName: INTENTIONAL_NULL_VALUE,
    imageSize: INTENTIONAL_NULL_VALUE,
    xtraImageSize: {},
    baseImageSize: {},
    xtraEditorPosition: imageEditorConfig.menuBarPosition,
    baseEditorPosition: imageEditorConfig.menuBarPosition,
    addMoreImageAlertStates: {},
    imageLoadModalStates: {},
    selectedImageId: INTENTIONAL_NULL_VALUE,
    resultCount: 0,
    options: {
        page: 1,
    }
}


const reducerState = (prevState = {}, action) => {

    switch (action.type) {

        case actionType.UPDATE_SEARCH_STRING: {
            let {
                searchString,
            } = action.payload
            return {
                ...prevState,
                searchString,
            }
        }

        case actionType.UPDATE_SEARCH_OPTIONS: {
            let {
                options
            } = action.payload
            return {
                ...prevState,
                options,
            }
        }

        case actionType.GET_IMAGE_LIST: {
            let {
                searchString,
                options
            } = prevState
            APIUtils.getSearchResults(
                searchString,
                options
            )
            // APIUtils.getGoogleResultsFromUI(
            //     searchString,
            //     options
            // )
            return {
                ...prevState,
                imageList: [],
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
                imageId,
                xtraImage
            } = action.payload
            APIUtils.checkImageExists(imageThumbnail, imageUrl, xtraImage)
            let imageStateObject = {
                selectedImageId: imageId,
            }
            if (xtraImage) {
                imageStateObject.xtraImageloading = true
                imageStateObject.showXtraEditor = true
            } else {
                imageStateObject.useImageloading = true
                imageStateObject.showXtraEditor = false
            }
            return  {
                ...prevState,
                ...imageStateObject,
            }
        }

        case actionType.LOAD_SELECTED_IMAGE_URL: {
            let {
                selectedImageURL,
                xtraImage
            } = action.payload
            const imageStateObject = {}
            if (xtraImage) {
                imageStateObject.xtraImageURL = selectedImageURL
                imageStateObject.xtraImageloading = false
                imageStateObject.showXtraEditor = true
            } else {
                imageStateObject.selectedImageURL = selectedImageURL
                imageStateObject.useImageloading = false
                imageStateObject.isBaseImageLoaded = true
                imageStateObject.showXtraEditor = false
            }
            return  {
                ...prevState,
                ...imageStateObject,
            }
        }

        case actionType.SET_IS_IMAGE_LOADED: {
            let {
                isBaseImageLoaded,
            } = action.payload
            return {
                ...prevState,
                isBaseImageLoaded,
            }
        }

        case actionType.OPEN_MODAL: {
            return {
                ...prevState,
                ...action.payload,
            }
        }

        case actionType.TOGGLE_XTRA_EDITOR: {
            let {
                showXtraEditor
            } = action.payload
            return {
                ...prevState,
                showXtraEditor,
            }
        }

        case actionType.SET_MENU_BAR_POSITION: {
            let {
                editorName,
                editorPosition
            } = action.payload
            let navMenuObject = {}
            if (editorName === BASE) {
                navMenuObject.baseEditorPosition = editorPosition
            } else {
                navMenuObject.xtraEditorPosition = editorPosition
            }
            return {
                ...prevState,
                ...navMenuObject,
            }
        }

        default:
            return {...initialState}
    }
}

export default reducerState;