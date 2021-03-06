import * as actionType from './ActionType';
import { INTENTIONAL_NULL_VALUE } from '../constants/constants';

export const AppActions = {

	updateSearchString: (searchString) => {
		return {
			type: actionType.UPDATE_SEARCH_STRING,
			payload: {
				searchString,
			}
		}
	},

	updateSearchOptions: (options) => {
		return {
			type: actionType.UPDATE_SEARCH_OPTIONS,
			payload: {
				options,
			}
		}
	},

	getImageList: (searchString, options) => {
		return {
			type: actionType.GET_IMAGE_LIST,
			payload: {
				searchString,
				options,
			}
		}
	},

	setImageList: (imageList) => {
		return {
			type: actionType.SET_IMAGE_LIST,
			payload: {
				imageList,
			}
		}
	},

	useImage: (imageThumbnail, imageUrl, imageId, xtraImage) => {
		return {
			type: actionType.USE_IMAGE,
			payload: {
				imageThumbnail,
				imageUrl,
				imageId,
				xtraImage,
			}
		}
	},

	loadSelectedImageURL: (selectedImageURL, xtraImage) => {
		return {
			type: actionType.LOAD_SELECTED_IMAGE_URL,
			payload: {
				selectedImageURL,
				xtraImage,
			}
		}
	},

	setIsBaseImageLoadStatus: (isBaseImageLoaded) => {
		return {
			type: actionType.SET_IS_IMAGE_LOADED,
			payload: {
				isBaseImageLoaded,
			}
		}
	},

	openModal: (
		openModalName,
		modalStateObjects,
	) => {
		return {
			type: actionType.OPEN_MODAL,
			payload: {
				openModalName: openModalName || INTENTIONAL_NULL_VALUE,
				...modalStateObjects || {},
			}
		}
	},

	showHideXtraEditor: (showXtraEditor) => {
		return {
			type: actionType.TOGGLE_XTRA_EDITOR,
			payload: {
				showXtraEditor,
			}
		}
	},

	setMenuBarPosition: (editorName, editorPosition) => {
		return {
			type: actionType.SET_MENU_BAR_POSITION,
			payload: {
				editorName,
				editorPosition,
			}
		}
	},

}
