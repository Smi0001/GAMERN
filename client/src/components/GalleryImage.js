import React from 'react'
import { connect } from 'react-redux';
import { AppActions } from '../actions';
import { MDBIcon } from 'mdbreact'

class GalleryImage extends React.Component {
    getTruncateText(text) {
        return text.substr(0, 20)+'...'
    }
    render() {
        const { imageThumbnail, imageUrl, imageTitle, imageId, selectedImageId, useImage } = this.props
        return (
            <div id={imageId} className={"image-div " + (selectedImageId===imageId?' selected': '')}
                title={this.getTruncateText(imageTitle)}
                onClick={event => event.stopPropagation()}
            >
                <img src={imageUrl} alt="unavailable"  />
                <span className="image-title">{this.getTruncateText(imageTitle)}</span>
                <div className="actions">
                    <div href="#" className="hover-text"
                        onClick={useImage.bind(this, imageThumbnail, imageUrl, imageId)}>
                        <MDBIcon icon="check-circle" />
                        <span className="m-l-10">Click to use this image {imageId + 1}</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(
    state => {
        return {
            selectedImageId: state.reducerState.selectedImageId,
        }
    },
    
    dispatch => {
        return {
            useImage: (imageThumbnail, imageUrl, imageId) => {
                dispatch(AppActions.useImage(imageThumbnail, imageUrl, imageId))
            },
        }
    }
)(GalleryImage)