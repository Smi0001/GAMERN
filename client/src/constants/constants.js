import { defaultTheme, defaultTheme2 } from './tui-default-theme'
import whiteTheme from './tui-white-theme'
import blackTheme from './tui-black-theme'


export const BYTES_TO_MB_DIVIDER = 1000000
export const INTENTIONAL_NULL_VALUE = null // unintentional vallue is set as undefined
export const EMPTY_STRING = ''
export const BASE = 'base'
export const XTRA = 'xtra'

export const imageEditorConfig = {
    defaultTheme,
    defaultTheme2,
    blackTheme,
    whiteTheme,
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
    imageSizeAllowed: (6 * BYTES_TO_MB_DIVIDER), // 6MB
}

export const MODALS = {
    addMoreImageAlert: 'addMoreImageAlert',
    imageLoadFail: 'imageLoadFail',
    addImageEditor: 'addImageEditor',
}
