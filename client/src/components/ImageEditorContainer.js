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
import ImageEditorWrapper from "./ImageEditorWrapper";
import { MODALS, INTENTIONAL_NULL_VALUE, BASE, XTRA } from "../constants/constants";

class ImageEditorContainer extends React.Component {

	constructor(props) {
		super(props)
		this.baseImageEditorRef = React.createRef()
		this.xtraImageEditorRef = React.createRef()
	}

	closeModal() {
		this.props.closeModal()
	}

	browseImage() {
		const baseImageEditorRef = this.baseImageEditorRef.current
		if (baseImageEditorRef) {
			baseImageEditorRef.browseImage()
		}
	}

	showHideXtraEditor(showXtraEditor) {
		this.props.showHideXtraEditor(showXtraEditor)
	}

	loadExtraEditor(event) {
		const files = event.target.files
        if (files.length > 0) {
			this.showHideXtraEditor(true)
			const xtraImageEditorRef = this.xtraImageEditorRef.current
			if (xtraImageEditorRef) {
				xtraImageEditorRef.imageLoadWrapper(event.target.files[0])
			}
		}
	}

	saveImageToDisk() {
		const baseImageEditorRef = this.baseImageEditorRef.current
		if (baseImageEditorRef) {
			baseImageEditorRef.saveImageToDisk()
		}
	}
	checkCanvasSize() {
		const xtraImageSize = this.xtraImageEditorRef.current.imageEditor.current.imageEditorInst.getCanvasSize()
		const baseImageSize = this.baseImageEditorRef.current.imageEditor.current.imageEditorInst.getCanvasSize()
		if (xtraImageSize.width > baseImageSize.width) {
			this.props.openModal(
				MODALS.addMoreImageAlert,
				{
					xtraImageSize,
					baseImageSize,
				}
			)
		} else {
			this.finallyAddEditedImage()
		}
	}
	finallyAddEditedImage() {
		const data = this.xtraImageEditorRef.current.imageEditor.current.imageEditorInst.toDataURL()
		this.baseImageEditorRef.current.imageEditor.current.imageEditorInst.addImageObject(data)
		this.closeModal()
		this.showHideXtraEditor(false)
	}

	getXtraImageAlertJSX(xtraImageSize, baseImageSize) {
		return (
			<MDBModalBody className="text-center">
				<MDBContainer>
					<MDBRow>
						<div>
							<MDBIcon icon="exclamation-triangle" className="text-color-yellow"/>
							<strong><i> You are going to overflow the cream on your cone</i></strong>
						</div>
						<p>
							I mean, the edited image {`(${xtraImageSize.width}x${xtraImageSize.height})`}
							is still bigger than the bottom canvas {`(${baseImageSize.width}x${baseImageSize.height})`}. 
							You may find it difficult in handling. 
						</p>
						<div><strong>Tips if you continue:</strong></div>
						<ul className="text-left">
							<li>Drag down the bigger image to find its corner and resize it</li>
							<li>
								<i>Undo</i> one-by-one
							</li>
							<li>
								Select &amp; <i>Delete</i> one-by-one
							</li>
							<li>
								(<i>Worst case</i>) Restart with bigger bottom image
							</li>
						</ul>
					</MDBRow>
				</MDBContainer>
				<MDBContainer>
					<MDBBtn color="default" onClick={this.finallyAddEditedImage.bind(this)}>
						<span>Add it anyway</span>
						<MDBIcon icon="check" className="text-color-green ml-2"/>
					</MDBBtn>
					<MDBBtn color="secondary" onClick={this.closeModal.bind(this)}>
						<span>Stop! Let me crop more</span>
						<MDBIcon icon="times" className="text-color-red ml-2" />
					</MDBBtn>
				</MDBContainer>
			</MDBModalBody>

		)
	}
	getImageLoadFailJSX(imageSize) {
		const msgContent = `The image is not able to load due to ${
			imageSize
			?
				'upload size limit 6 MB'
			:
				'some server error'
		}.`
		return (
			<MDBModalBody className="text-center">
				<MDBContainer>
					<MDBRow>
						<p>
							<MDBIcon icon="exclamation-triangle" className="text-color-red"/>
							<strong>Sorry! <i>{msgContent}</i></strong>
						</p>
					</MDBRow>
				</MDBContainer>
				<MDBContainer>
					<MDBBtn color="secondary" onClick={this.closeModal.bind(this)}>Close</MDBBtn>
				</MDBContainer>
			</MDBModalBody>
		)
	}
	getXtraImageEditorJSX(xtraImageloading, showXtraEditor, xtraImageURL) {
		const dynamicClass = 'container-fluid p-0 ' + (showXtraEditor?'':' hidden')
		return (
			<div id="xtra-image" className={dynamicClass}>
				<h3 className="center pos-rel">
					<label className="editor-title">Edit </label>
					<label className="powered-text">Powered by Toast UI Image Editor</label>
				</h3>
				<div className="load-download">
					<MDBBtn title="Add this image" className="btn-round" circle color="white"
						onClick={this.checkCanvasSize.bind(this)} >
						<MDBIcon icon="check" size="2x" className="text-color-green" />
					</MDBBtn>
					<MDBBtn onClick={this.showHideXtraEditor.bind(this, false)} className="btn-round" circle color="white" title="Cancel">
						<MDBIcon icon="times" size="2x" className="text-color-red" />
					</MDBBtn>
				</div>
				{
					xtraImageloading
					?
						<Loader icon={'spinner'} pulse={true}  />
					:					
						<ImageEditorWrapper
							componentId={XTRA}
							ref={this.xtraImageEditorRef}
							selectedImageURL={xtraImageURL}
						/>
				}
			</div>
		)
	}

  	render() {
		const {
			isBaseImageLoaded,
			selectedImageURL,
			useImageloading,
			xtraImageloading,
			openModalName,
			showXtraEditor,
			xtraImageURL,
			xtraImageSize,
			baseImageSize,
			imageSize,
		} = this.props
		const isAddMoreImageAlert = openModalName === MODALS.addMoreImageAlert && xtraImageSize.width
		const isImageLoadFailModal = openModalName === MODALS.imageLoadFail
		const modalPosition = isAddMoreImageAlert || isImageLoadFailModal ? 'top' : 'center'
		return (
			<div>
				<div id="cream-your-meme"
					className={'container-fluid p-0 ' + (showXtraEditor?' hidden':'')}>
					<h3 className="center pos-rel">
						<label className="editor-title">Cream your meme</label>
						<label className="powered-text">Powered by Toast UI Image Editor</label>
					</h3>
					<div className="load-download">
						<MDBBtn color="white" circle className="btn-round" title="Select Image"
							onClick={this.browseImage.bind(this)}
						>
							<MDBIcon className="text-color-indigo" icon="image" size="2x"/>
						</MDBBtn>
						<MDBBtn color="white" circle className="btn-round" title="Add image"
							onClick={()=>document.getElementById('addImage').click()} disabled={ isBaseImageLoaded ? null : true }
						>
							<MDBIcon className="text-color-indigo" icon="images" size="2x"/>
							<input className="hidden" id="addImage" type="file" 
								onChange={this.loadExtraEditor.bind(this)} accept="image/x-png,image/gif,image/jpeg" />
						</MDBBtn>
						<MDBBtn color="default" circle className="btn-round" title="Save to disk"
							onClick={this.saveImageToDisk.bind(this)} disabled={ isBaseImageLoaded ? null : true } >
							<MDBIcon className="text-color-indigo" icon="download" size="2x"/>
						</MDBBtn>
					</div>
					{
						useImageloading
						?
						<Loader icon={'spinner'} pulse={true}  />
						:
						<ImageEditorWrapper
							componentId={BASE}
							ref={this.baseImageEditorRef}
							selectedImageURL={selectedImageURL}
						/>
					}
				</div>
				{
					this.getXtraImageEditorJSX(xtraImageloading, showXtraEditor, xtraImageURL)
				}
				<MDBModal
					isOpen={isAddMoreImageAlert || isImageLoadFailModal}
					toggle={this.closeModal.bind(this)} frame position={modalPosition}
				>
					{ isAddMoreImageAlert && this.getXtraImageAlertJSX(
						xtraImageSize, baseImageSize
					)}
					{ isImageLoadFailModal && this.getImageLoadFailJSX(imageSize) }
				</MDBModal>
			</div>
		)
	}
}

export default connect(
  // mapStatesToProps
	state => {
		return {
			isBaseImageLoaded: state.reducerState.isBaseImageLoaded,
			selectedImageURL: state.reducerState.selectedImageURL,
			useImageloading: state.reducerState.useImageloading,
			xtraImageloading: state.reducerState.xtraImageloading,
			openModalName: state.reducerState.openModalName,
			imageSize: state.reducerState.imageSize,
			xtraImageSize: state.reducerState.xtraImageSize,
			baseImageSize: state.reducerState.baseImageSize,
			showXtraEditor: state.reducerState.showXtraEditor,
			xtraImageURL: state.reducerState.xtraImageURL,
			addMoreImageAlertStates: state.reducerState.addMoreImageAlertStates,
			imageLoadModalStates: state.reducerState.imageLoadModalStates,
		}
  	},
  // mapDispatchToProps
	dispatch => {
		return {
			closeModal: () =>{
				dispatch(
					AppActions.openModal(
						INTENTIONAL_NULL_VALUE,
						INTENTIONAL_NULL_VALUE
					)
				)
			},
			openModal: (
				openModalName,
				modalStateObjects
			) => {
				dispatch(
					AppActions.openModal(
						openModalName,
						modalStateObjects
					)
				)
			},
			showHideXtraEditor: (showXtraEditor) => {
				dispatch(
					AppActions.showHideXtraEditor(showXtraEditor)
				)
			},
		}
	}
)(ImageEditorContainer);