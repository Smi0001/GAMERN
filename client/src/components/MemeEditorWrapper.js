import React from 'react'
import ImageEditor from "@toast-ui/react-image-editor";
import store from '../reduxStore';
import { AppActions } from '../actions';

const icona = require("tui-image-editor/dist/svg/icon-a.svg")
const iconb = require("tui-image-editor/dist/svg/icon-b.svg")
const iconc = require("tui-image-editor/dist/svg/icon-c.svg")
const icond = require("tui-image-editor/dist/svg/icon-d.svg")
const download = require("downloadjs")
const myTheme = {
  "menu.backgroundColor": "white",
  "common.backgroundColor": "#151515",
  "downloadButton.backgroundColor": "white",
  "downloadButton.borderColor": "white",
  "downloadButton.color": "black",
  "menu.normalIcon.path": icond,
  "menu.activeIcon.path": iconb,
  "menu.disabledIcon.path": icona,
  "menu.hoverIcon.path": iconc,
}

class MemeEditorWrapper extends React.Component {

    constructor(props) {
        super(props)
        this.imageEditor = React.createRef()
        this.state = {
            loadFirstEditor: props.loadFirstEditor,
            selectedImageURL: props.selectedImageURL,
        }
    }

    componentDidMount() {
        // console.log('mount', this.state)
        this.bindImageLoadWrapperFn()
    }
    componentWillUnmount() {
        // console.log('unmount', this.state)
    }

    componentDidUpdate(prevProps) {
        const updatedProps = this.props
        // console.log('child componentDidUpdate', prevProps, updatedProps, this)
        const updateStateObject = {}
        let updateState = false
        if (updatedProps.loadFirstEditor !== prevProps.loadFirstEditor) {
            updateStateObject.loadFirstEditor = updatedProps.loadFirstEditor
            updateState = true
        }
        if (updatedProps.selectedImageURL !== prevProps.selectedImageURL) {
            updateStateObject.selectedImageURL = updatedProps.selectedImageURL
            updateState = true
        }
        if (updateState) {
            // console.log('updating state in didUpdate')
            this.setState(
                {...updateStateObject}
                // , this.bindImageLoadWrapperFn
            )
        }
    }
    imageLoadWrapper = file => {
        if (!!file) {
          this.state.originalLoadCode(file)
        }
        store.dispatch(AppActions.setIsImageLoadStatus(!!file))
    }

    bindImageLoadWrapperFn() {
        // console.log('child bindLoader')
        const imageEditorInst = this.imageEditor.current.imageEditorInst
        this.setState({
            imageEditorInst,
            originalLoadCode: imageEditorInst.ui._actions.main.load,
        },
        () => imageEditorInst.ui._actions.main.load = this.imageLoadWrapper
        )
    }

    getNewImageEditorInstance() {
        return new ImageEditor(
            document.querySelector('#tui-image-editor>div'),
            {
                includeUI: {
                    loadImage: {
                        path: this.state.selectedImageURL,
                        name: "image",
                    },
                    theme: myTheme,
                    menu: ["crop", "flip", "rotate", "draw", "shape", "text", "filter"],
                    initMenu: "",
                    uiSize: {
                        height: `calc(100vh - 160px)`,
                    },
                    menuBarPosition: "top",
                },
                cssMaxHeight: window.innerHeight,
                cssMaxWidth: window.innerWidth,
                selectionStyle:{
                    cornerSize: 20,
                    rotatingPointOffset: 70,
                }
            }
        )
    }

    unloadImage() {
        // this.state.imageEditorInst.destroy()
        store.dispatch(
            AppActions.toggleEditor()
        )
        // const t = this.getNewImageEditorInstance()
        // this.imageEditor = {
        //     current: t,
        // }
        // console.log('current', this.imageEditor.current, t)
        // this.setState({
        //     imageEditorInst: t
        // }
        // // , this.bindImageLoadWrapperFn
        // )
    }

    browseImage() {
        document.querySelector('input.tui-image-editor-load-btn').click()
    }

    addMoreImage(event) {
        const files = event.target.files
        if (files.length > 0) {
            // const imageEditorInst = this.imageEditor.current.imageEditorInst
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
        const { loadFirstEditor, selectedImageURL } = this.state
        // console.log('child render state.loadFirstEditor', loadFirstEditor)
        return (
            <div id="tui-image-editor">
            {
                loadFirstEditor
                ?
                <ImageEditor
                    includeUI={{
                        loadImage: {
                            path: selectedImageURL,
                            name: "image",
                        },
                        theme: myTheme,
                        menu: ["crop", "flip", "rotate", "draw", "shape", "text", "filter"],
                        initMenu: "",
                        uiSize: {
                            height: `calc(100vh - 160px)`,
                        },
                        menuBarPosition: "bottom",
                    }}
                    cssMaxHeight={window.innerHeight}
                    cssMaxWidth={window.innerWidth}
                    selectionStyle={{
                        cornerSize: 20,
                        rotatingPointOffset: 70,
                    }}
                    usageStatistics={false}
                    ref={this.imageEditor}
                />
                :
                <ImageEditor
                    id="tui-image-editor"
                    includeUI={{
                        loadImage: {
                            path: selectedImageURL,
                            name: "image",
                        },
                        theme: myTheme,
                        menu: ["crop", "flip", "rotate", "draw", "shape", "text", "filter"],
                        initMenu: "",
                        uiSize: {
                            height: `calc(100vh - 160px)`,
                            },
                        menuBarPosition: "bottom",
                    }}
                    cssMaxHeight={window.innerHeight}
                    cssMaxWidth={window.innerWidth}
                    selectionStyle={{
                        cornerSize: 20,
                        rotatingPointOffset: 70,
                    }}
                    usageStatistics={false}
                    ref={this.imageEditor}
                />
            }
            </div>
        )
    }
}

export default MemeEditorWrapper