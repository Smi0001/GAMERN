import React from 'react'
import ImageEditor from "@toast-ui/react-image-editor";
import store from '../reduxStore';
import { AppActions } from '../actions';
import {
    imageEditorConfig,
    MODALS,
    XTRA,
} from '../constants/constants';
import UTILS from '../utils/common-utils';
const download = require("downloadjs")

const {
    defaultTheme,
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
            myTheme: props.myTheme,
            componentId: props.componentId,
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
                        { imageSize: file.size }
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
        const { myTheme, componentId } = this.state
        const imageEditorProps = {
            includeUI: {
                loadImage: {
                    path: this.state.selectedImageURL,
                    name: imageDefaultName,
                },
                theme: myTheme ? myTheme : defaultTheme,
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
            <div id={"tui-image-editor-" + componentId}>
                <ImageEditor {...imageEditorProps} />
            </div>
        )
    }
}

export default ImageEditorWrapper