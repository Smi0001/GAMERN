import React from "react";
import "tui-image-editor/dist/tui-image-editor.css";
import {
	MDBBtn,
	MDBModal,
	MDBModalBody,
	MDBIcon,
	MDBContainer,
	MDBCol
} from "mdbreact";
import { connect } from "react-redux";
import { AppActions } from "../actions";
import { MODALS, INTENTIONAL_NULL_VALUE, BYTES_TO_MB_DIVIDER, } from "../constants/constants";

class ModalsAlerts extends React.Component {

	constructor(props) {
		super(props)
		this.addEditedImageFn = props.addEditedImageFn
	}
	closeModal(modalStateObjects) {
		this.props.openModal(
			INTENTIONAL_NULL_VALUE,
			modalStateObjects
		)
	}

	getXtraImageAlertJSX(
		xtraImageSize,
		 baseImageSize) {
		return (
			<MDBModalBody className="text-left">
				<MDBContainer>
					<MDBCol>
						<div>
							<MDBIcon icon="exclamation-triangle" className="text-color-yellow mr-2"/>
							<strong><i> You are going to overflow the cream on your cone</i></strong>
						</div>
						<p>
							I mean the edited image { `(${String(xtraImageSize.width)} x ${String(xtraImageSize.height)}) ` }
							is still bigger than the bottom canvas { `(${String(baseImageSize.width)} x ${String(baseImageSize.height)})` }. 
							You may find it difficult in handling. 
						</p>
						<div><strong>Tips :</strong></div>
						<ul className="text-left">
							<li><b>Crop</b> the image more</li>
							<li>Continue and drag down the image to find its corner and resize it</li>
							<li><b>Undo</b>/<b>Delete</b> one-by-one</li>
							<li>Restart with bigger bottom image</li>
						</ul>
					</MDBCol>
				</MDBContainer>
				<MDBContainer className="text-center">
					<MDBBtn color="default" className="text-trans-none" onClick={this.closeModal.bind(this, { })}>
						<span>Back to edit</span>
						<MDBIcon icon="edit" className="text-color-secondary ml-2" />
					</MDBBtn>
					<MDBBtn color="secondary" onClick={this.addEditedImageFn} className="text-trans-none">
						<span>Add it anyway</span>
						<MDBIcon icon="check" className="text-color-green ml-2"/>
					</MDBBtn>
				</MDBContainer>
			</MDBModalBody>

		)
	}

	closeImageLoadFailModal() {
		let modalStateObjects = {
			showXtraEditor: false,
			imageSize: INTENTIONAL_NULL_VALUE,
		}
		const { showXtraEditor } = this.props
		if (!showXtraEditor) {
			modalStateObjects.isBaseImageLoaded = false // set isBaseImageLoaded = false
		}
		this.closeModal(modalStateObjects)
	}
	getImageLoadFailJSX(imageSize) {
		let fileSize = 0
		if (imageSize) {
			fileSize = Number.parseFloat(imageSize/BYTES_TO_MB_DIVIDER).toFixed(2)
		}
		const msgContent = `The image is not able to load due to ${
			imageSize
			?
				`size ${fileSize} MB, where upload size limit 6 MB`
			:
				'some server error'
		}.`
		return (
			<MDBModalBody className="text-center">
				<MDBContainer>
					<p>
						<MDBIcon icon="exclamation-triangle" className="text-color-red mr-2"/>
						<strong>Sorry! <i>{msgContent}</i></strong>
					</p>
				</MDBContainer>
				<MDBContainer>
					<MDBBtn color="secondary"
						onClick={this.closeImageLoadFailModal.bind(this)}
					>
						Close
					</MDBBtn>
				</MDBContainer>
			</MDBModalBody>
		)
	}

  	render() {
		const {
			openModalName,
			xtraImageSize,
			baseImageSize,
			imageSize,
		} = this.props
		const isAddMoreImageAlert = openModalName === MODALS.addMoreImageAlert && !!(xtraImageSize && xtraImageSize.width)
		const isImageLoadFailModal = openModalName === MODALS.imageLoadFail
		const modalPosition = isAddMoreImageAlert || isImageLoadFailModal ? 'top' : 'center'

		return (
			<MDBModal
				isOpen={isAddMoreImageAlert || isImageLoadFailModal}
				toggle={this.closeModal.bind(this)} frame position={modalPosition}
			>
				{ isAddMoreImageAlert && this.getXtraImageAlertJSX(
					xtraImageSize, baseImageSize
				)}
				{ isImageLoadFailModal && this.getImageLoadFailJSX(imageSize) }
			</MDBModal>
		)
	}
}

export default connect(
  // mapStatesToProps
	state => {
		return {
			openModalName: state.reducerState.openModalName,
			imageSize: state.reducerState.imageSize,
			xtraImageSize: state.reducerState.xtraImageSize,
			baseImageSize: state.reducerState.baseImageSize,
			showXtraEditor: state.reducerState.showXtraEditor,
		}
  	},
  // mapDispatchToProps
	dispatch => {
		return {
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
		}
	}
)(ModalsAlerts);