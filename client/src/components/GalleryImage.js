import React from 'react'
import { connect } from 'react-redux';
import { AppActions } from '../actions';
import { MDBIcon } from 'mdbreact'
import UTILS from '../utils/common-utils';

class GalleryImage extends React.Component {
    getTruncateText(text) {
       return UTILS.getTruncateText(text)
    }

    searchedImageClick(imageThumbnail, imageUrl, imageId, xtraImage) {
        if (xtraImage) {
            this.props.showHideXtraEditor(true)
            UTILS.scrollToHiddenElementById('xtra-image')
        } else {
            this.props.showHideXtraEditor(false)
            UTILS.scrollToHiddenElementById('cream-your-meme')
        }
        this.props.useImage(imageThumbnail, imageUrl, imageId, xtraImage)
    }

    render() {
        const { imageThumbnail, imageUrl, imageTitle, imageId, selectedImageId, isBaseImageLoaded } = this.props
        return (
            <div id={imageId} className={"image-div " + (selectedImageId===imageId?' selected': '')}
                title={this.getTruncateText(imageTitle)}
                onClick={event => event.stopPropagation()}
            >
                <img src={imageThumbnail} alt="unavailable"  />
                <span className="image-title">{this.getTruncateText(imageTitle)}</span>
                <span className="actions">
                    <div className="hover-text" onClick={this.searchedImageClick.bind(this, imageThumbnail, imageUrl, imageId, false)}>
                        <MDBIcon icon="image" />
                        <span className="m-l-10">Use as base image</span>
                    </div>
                    <div className={"hover-text " + (isBaseImageLoaded?'':' disabled')}
                        onClick={ isBaseImageLoaded ? this.searchedImageClick.bind(this, imageThumbnail, imageUrl, imageId, true) : null}>
                        <MDBIcon icon="images" />
                        <span className="m-l-10">Add over existing</span>
                    </div>
                </span>
            </div>
        )
    }
}

export default connect(
    state => {
        return {
            selectedImageId: state.reducerState.selectedImageId,
            isBaseImageLoaded: state.reducerState.isBaseImageLoaded,
        }
    },
    
    dispatch => {
        return {
            useImage: (imageThumbnail, imageUrl, imageId, xtraImage) => {
                dispatch(AppActions.useImage(imageThumbnail, imageUrl, imageId, xtraImage))
            },
            showHideXtraEditor: (showXtraEditor) => {
				dispatch(
					AppActions.showHideXtraEditor(showXtraEditor)
				)
			},
        }
    }
)(GalleryImage)