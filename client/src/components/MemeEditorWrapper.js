import React from 'react'
import ImageEditor from "@toast-ui/react-image-editor";
import store from '../reduxStore';
import { AppActions } from '../actions';
import { imageEditorConfig } from '../constants/constants';
const download = require("downloadjs")

const {
    myTheme,
    imageDefaultName,
    menuFeatures,
    initMenu,
    uiSize,
    menuBarPosition,
    cssMaxHeight,
    cssMaxWidth,
    selectionStyle,
    usageStatistics,
} = imageEditorConfig

class MemeEditorWrapper extends React.Component {

    constructor(props) {
        super(props)
        this.imageEditor = React.createRef()
        this.state = {
            selectedImageURL: props.selectedImageURL,
        }
    }

    componentDidMount() {
        this.bindImageLoadWrapperFn()
    }

    componentDidUpdate(prevProps) {
        const updatedProps = this.props
        const updateStateObject = {}
        if (updatedProps.selectedImageURL !== prevProps.selectedImageURL) {
            updateStateObject.selectedImageURL = updatedProps.selectedImageURL
        }
        if (Object.keys(updateStateObject).length > 0) {
            this.setState(
                {...updateStateObject}
            )
        }
    }
    imageLoadWrapper = file => {
        let fileSelected = !!file
        if (fileSelected) {
            this.state.originalLoadCode(file)
        } else { // file already selected
            fileSelected = !!this.state.imageEditorInst.getImageName()
        }
        store.dispatch(AppActions.setIsImageLoadStatus(fileSelected))
    }

    bindImageLoadWrapperFn() {
        const imageEditorInst = this.imageEditor.current.imageEditorInst
        this.setState({
            imageEditorInst,
            originalLoadCode: imageEditorInst.ui._actions.main.load,
        },
        () => imageEditorInst.ui._actions.main.load = this.imageLoadWrapper
        )
    }

    browseImage() {
        document.querySelector('input.tui-image-editor-load-btn').click()
    }

    addMoreImage(event) {
        const files = event.target.files
        if (files.length > 0) {
            const { imageEditorInst } = this.state
            imageEditorInst.addImageObject(URL.createObjectURL(event.target.files[0]))
            .then(additionalImage => {
                var canvasSize = imageEditorInst.getCanvasSize();
                var largestImageSize = this.state.largestImageSize
                if (!largestImageSize || largestImageSize.width < additionalImage.width) {
                    largestImageSize = additionalImage
                }
                if (largestImageSize.width > canvasSize.width) {
                    store.dispatch(
                        AppActions.openImageAlertModal({
                            openAdditionalImageAlertModal: true,
                            canvasSize,
                            largestImageSize,
                        })
                    )
                }
            });
        }
    }

    saveImageToDisk() {
        const { imageEditorInst } = this.state
        const data = imageEditorInst.toDataURL()
        if (data) {
        const mimeType = data.split(";")[0];
        const extension = data.split(";")[0].split("/")[1];
        download(data, `image.${extension}`, mimeType);
        // send the data to DB it can be restored and used as source for img tag
        //sessionStorage.setItem('image', data)
        }
    }
    render() {
        const imageEditorProps = {
            includeUI: {
                loadImage: {
                    path: this.state.selectedImageURL,
                    name: imageDefaultName,
                },
                theme: myTheme,
                menu: menuFeatures,
                initMenu,
                uiSize,
                menuBarPosition,
            },
            cssMaxHeight,
            cssMaxWidth,
            selectionStyle,
            usageStatistics,
            ref: this.imageEditor,
        }
        return (
            <div id="tui-image-editor">
                <ImageEditor {...imageEditorProps} />
            </div>
        )
    }
}

export default MemeEditorWrapper