const icona = require('tui-image-editor/dist/svg/icon-a.svg')
const iconb = require('tui-image-editor/dist/svg/icon-b.svg')
const iconc = require('tui-image-editor/dist/svg/icon-c.svg')
const icond = require('tui-image-editor/dist/svg/icon-d.svg')

export const imageEditorConfig = {
    myTheme: {
        'menu.backgroundColor': 'white',
        'common.backgroundColor': '#151515',
        'downloadButton.backgroundColor': 'white',
        'downloadButton.borderColor': 'white',
        'downloadButton.color': 'black',
        'menu.normalIcon.path': icond,
        'menu.activeIcon.path': iconb,
        'menu.disabledIcon.path': icona,
        'menu.hoverIcon.path': iconc,
    },
    imageDefaultName: 'image',
    menuFeatures: ['crop', 'flip', 'rotate', 'draw', 'shape', 'text', 'filter'],
    initMenu: '',
    uiSize: {
        height: `calc(100vh - 160px)`,
    },
    menuBarPosition: 'bottom',
    cssMaxHeight: window.innerHeight,
    cssMaxWidth: window.innerWidth,
    selectionStyle: {
        cornerSize: 20,
        rotatingPointOffset: 70,
    },
    usageStatistics: false,
    imageSizeAllowed: (6 * 1000000), // 6MB
}

export const INTENTIONAL_NULL_VALUE = null // unintentional vallue is set as undefined
export const EMPTY_STRING = ''
export const BASE = 'base'
export const XTRA = 'additional'

export const MODALS = {
    addMoreImageAlert: 'addMoreImageAlert',
    imageLoadFail: 'imageLoadFail',
    addImageEditor: 'addImageEditor',
}
