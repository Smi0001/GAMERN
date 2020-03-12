import React from 'react'
import ImageEditor from "@toast-ui/react-image-editor";
import store from '../reduxStore';
import { AppActions } from '../actions';
import {
    imageEditorConfig, MODALS, INTENTIONAL_NULL_VALUE, XTRA,
    // MODALS,
    // INTENTIONAL_NULL_VALUE
} from '../constants/constants';
import UTILS from '../utils/common-utils';
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
    imageSizeAllowed,
} = imageEditorConfig

class ImageEditorWrapper extends React.Component {

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

    isImageValidInSize(file) {
        return file.size <= imageSizeAllowed
    }
    imageLoadWrapper = file => {
        let isBaseImageLoaded = !!file
        if (isBaseImageLoaded) {
            if (this.isImageValidInSize(file)) {
                if (this.props.componentId === XTRA) {
                    UTILS.scrollToHiddenElementById('xtra-image')
                } else {
                    UTILS.scrollToHiddenElementById('cream-your-meme')
                }
                this.state.originalLoadCode(file)
            } else {
                store.dispatch(
                    AppActions.openModal(
                        MODALS.imageLoadFail,
                        INTENTIONAL_NULL_VALUE,
                        { imageSize: file.size + ' Bytes' }
                    )
                )
            }
        } else { // file already selected
            isBaseImageLoaded = !!this.state.imageEditorInst.getImageName()
        }
        store.dispatch(AppActions.setIsBaseImageLoadStatus(isBaseImageLoaded))
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

export default ImageEditorWrapper