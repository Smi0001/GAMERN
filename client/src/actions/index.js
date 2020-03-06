import * as actionType from './ActionType';

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

	loadSelectedImageURL: (selectedImageURL) => {
		return {
			type: actionType.LOAD_SELECTED_IMAGE_URL,
			payload: {
				selectedImageURL
			}
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
