import React from "react";
import "tui-image-editor/dist/tui-image-editor.css";
import {
	MDBRow,
	MDBBtn,
	MDBModal,
	MDBModalBody,
	MDBIcon,
	MDBContainer
} from "mdbreact";
import Loader from './Loader'
import { connect } from "react-redux";
import { AppActions } from "../actions";
import MemeEditorWrapper from "./MemeEditorWrapper";

class MemeEditor extends React.Component {

	constructor(props) {
		super(props)
		this.memeEditorWrapperRef = React.createRef()
	}

	closeAdditionalImageAlertModal() {
		this.props.closeAdditionalImageAlertModal()
	}

	browseImage() {
		const memeEditorWrapperRef = this.memeEditorWrapperRef.current
		if (memeEditorWrapperRef) {
			memeEditorWrapperRef.browseImage()
		}
	}

	addMoreImage(event) {
		const memeEditorWrapperRef = this.memeEditorWrapperRef.current
		if (memeEditorWrapperRef) {
			memeEditorWrapperRef.addMoreImage(event)
		}
	}

	unloadImage() {
		const memeEditorWrapperRef = this.memeEditorWrapperRef.current
		if (memeEditorWrapperRef) {
			memeEditorWrapperRef.unloadImage()
		}
	}

	saveImageToDisk() {
		const memeEditorWrapperRef = this.memeEditorWrapperRef.current
		if (memeEditorWrapperRef) {
			memeEditorWrapperRef.saveImageToDisk()
		}
	}

  render() {
    const {
		isImageLoaded,
		selectedImageURL,
		useImageloading,
		openAdditionalImageAlertModal,
		canvasSize,
		largestImageSize,
    } = this.props

    return (
		<div className="container-fluid p-0">
			<h3 className="center pos-rel">
			<label className="editor-title">Cream your meme</label>
			<label className="powered-text">Powered by Toast UI Image Editor</label>
			</h3>
			<div className="load-download">
			<MDBBtn color="indigo" circle className="btn-round" title="Select Image"
				onClick={this.browseImage.bind(this)}
			>
				<MDBIcon className="text-color-white" icon="image" size="2x"/>
			</MDBBtn>
			<MDBBtn color="indigo" circle className="btn-round" title="Add image"
				onClick={()=>document.getElementById('addImage').click()} disabled={ isImageLoaded ? null : true }
			>
				<MDBIcon className="text-color-white" icon="images" size="2x"/>
				<input className="hidden" id="addImage" type="file"
				onChange={this.addMoreImage.bind(this)} accept="image/x-png,image/gif,image/jpeg" />
			</MDBBtn>
			<MDBBtn color="indigo" circle className="btn-round" title="Save to disk"
				onClick={this.saveImageToDisk.bind(this)} disabled={ isImageLoaded ? null : true } >
				<MDBIcon className="text-color-white" icon="download" size="2x"/>
			</MDBBtn>
			</div>
			{
			useImageloading
			?
				<Loader icon={'spinner'} pulse={true}  />
			:
				<MemeEditorWrapper
				ref={this.memeEditorWrapperRef}
				selectedImageURL={selectedImageURL}
				/>
			}
			{
				(openAdditionalImageAlertModal && largestImageSize && canvasSize) &&
				<MDBModal isOpen={openAdditionalImageAlertModal} toggle={this.closeAdditionalImageAlertModal.bind(this)} frame position="top">
					<MDBModalBody className="text-center">
					<MDBContainer>
						<MDBRow>
						<p>
							<strong>Oops!! <i> You have added a lot of cream, your cone is overflowing...</i></strong>
						</p>
						<p>
							I mean, you have added an image {`(${largestImageSize.width}x${largestImageSize.height})`}
							which is bigger than the bottom canvas {`(${canvasSize.width}x${canvasSize.height})`}. 
							You may find it difficult in handling. 
							However, you can:
						</p>
						<ul className="text-left">
							<li>Drag down the bigger image to find its corner and resize it</li>
							<li>
								<i>Undo</i> one-by-one
							</li>
							<li>
								Select &amp; <i>Delete</i> one-by-one
							</li>
							<li>
								<i>Reset</i> the whole canvas and restart again
							</li>
						</ul>
						</MDBRow>
					</MDBContainer>
					<MDBContainer>
						<MDBBtn color="secondary" onClick={this.closeAdditionalImageAlertModal.bind(this)}>Okay I'll handle it</MDBBtn>
					</MDBContainer>
					</MDBModalBody>
				</MDBModal>
			}
		</div>
		)
	}
}

export default connect(
  // mapStatesToProps
	state => {
		return {
			isImageLoaded: state.reducerState.isImageLoaded,
			selectedImageURL: state.reducerState.selectedImageURL,
			useImageloading: state.reducerState.useImageloading,
			openAdditionalImageAlertModal: state.reducerState.openAdditionalImageAlertModal,
			canvasSize: state.reducerState.canvasSize,
			largestImageSize: state.reducerState.largestImageSize,
		}
  	},
  // mapDispatchToProps
	dispatch => {
		return {
			closeAdditionalImageAlertModal: () =>{
				dispatch(AppActions.openImageAlertModal(false, null, null))
			},
		}
	}
)(MemeEditor);