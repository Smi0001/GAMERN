import * as actionType from './ActionType';


// const setIsImageLoaded = 

export const AppActions = {

  getImageList: (searchString, options) => {
    return {
      type: actionType.GET_IMAGE_LIST,
      payload: {
        searchString,
        options
      }
    }
  },

  setImageList: (imageList) => {
    return {
      type: actionType.SET_IMAGE_LIST,
      payload: {
        imageList
      }
    }
  },

  useImage: (imageThumbnail, imageUrl, imageId) => {
    return {
      type: actionType.USE_IMAGE,
      payload: {
        imageThumbnail,
        imageUrl,
        imageId
      }
    }
  },

  toggleEditor: () => {
    return {
      type: actionType.TOGGLE_EDITOR,
    }
  },

  loadSelectedImageURL: (selectedImageURL) => {
    return {
      type: actionType.LOAD_SELECTED_IMAGE_URL,
      payload: {
        selectedImageURL
      }
    }
  },

  unloadSelectedImageURL: () => {
    return {
      type: actionType.UNLOAD_SELECTED_IMAGE_URL
    }
  },

  unloadBrowsedImage: () => {
    return {
      type: actionType.UNLOAD_BROWSED_IMAGE_URL,
    }
  },

  setIsImageLoadStatus: (isImageLoaded) => {
    return {
      type: actionType.SET_IS_IMAGE_LOADED,
      payload: {
        isImageLoaded
      }
    }
  },

  openImageAlertModal: ({openAdditionalImageAlertModal, canvasSize, largestImageSize}) => {
    return {
      type: actionType.OPEN_IMAGE_ALERT_MODAL,
      payload: {
        openAdditionalImageAlertModal,
        canvasSize,
        largestImageSize
      }
    }
  },
  

}
