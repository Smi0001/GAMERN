const icona = require('tui-image-editor/dist/svg/icon-a.svg')
const iconb = require('tui-image-editor/dist/svg/icon-b.svg')
const iconc = require('tui-image-editor/dist/svg/icon-c.svg')
const icond = require('tui-image-editor/dist/svg/icon-d.svg')

const defaultTheme = {
    'menu.backgroundColor': 'white',
    'common.backgroundColor': '#151515',
    'menu.normalIcon.path': icond,
    'menu.activeIcon.path': iconb,
    'menu.disabledIcon.path': icona,
    'menu.hoverIcon.path': iconc,
    'submenu.backgroundColor': '#444242', //dark grey

    // 'downloadButton.backgroundColor': 'white',
    // 'downloadButton.borderColor': 'white',
    // 'downloadButton.color': 'black',

    // 'common.bi.image': 'https://uicdn.toast.com/toastui/img/tui-image-editor-bi.png',
    // 'common.bisize.width': '251px',
    // 'common.bisize.height': '21px',
    // 'common.backgroundImage': 'none',
    // // 'common.backgroundColor': '#1e1e1e',
    // 'common.border': '0px',

    // // header
    // 'header.backgroundImage': 'none',
    // 'header.backgroundColor': 'transparent',
    // 'header.border': '0px',

    // // load button
    // 'loadButton.backgroundColor': '#fff',
    // 'loadButton.border': '1px solid #ddd',
    // 'loadButton.color': '#222',
    // 'loadButton.fontFamily': '\'Noto Sans\', sans-serif',
    // 'loadButton.fontSize': '12px',

    // // download button
    // 'downloadButton.backgroundColor': '#fdba3b',
    // 'downloadButton.border': '1px solid #fdba3b',
    // 'downloadButton.color': '#fff',
    // 'downloadButton.fontFamily': '\'Noto Sans\', sans-serif',
    // 'downloadButton.fontSize': '12px',

    // // main icons
    // 'menu.normalIcon.color': '#8a8a8a !important', //greyish-white
    // 'menu.activeIcon.color': '#e9e9e9 !important', //whitish 
    // 'menu.disabledIcon.color': '#434343 !important', //greyish
    // 'menu.hoverIcon.color': '#e9e9e9 !important', //whitish
    // 'menu.iconSize.width': '24px',
    // 'menu.iconSize.height': '24px',

    // // submenu icons
    // 'submenu.normalIcon.color': '#8a8a8a !important', //greyish-white
    // 'submenu.activeIcon.color': '#e9e9e9 !important', //whitish
    // 'submenu.iconSize.width': '32px',
    // 'submenu.iconSize.height': '32px',

    // // submenu primary color
    // 'submenu.backgroundColor': '#444242', //dark grey
    // 'submenu.partition.color': '#3c3c3c', //greyish

    // // submenu labels
    // 'submenu.normalLabel.color': '#8a8a8a', //greyish-white
    // 'submenu.normalLabel.fontWeight': 'lighter',
    // 'submenu.activeLabel.color': '#fff', //white
    // 'submenu.activeLabel.fontWeight': 'lighter',

    // // checkbox style
    // 'checkbox.border': '0px',
    // 'checkbox.backgroundColor': '#fff', //white

    // // range style
    // 'range.pointer.color': '#fff',
    // 'range.bar.color': '#666',
    // 'range.subbar.color': '#d1d1d1',

    // 'range.disabledPointer.color': '#414141', //greyish
    // 'range.disabledBar.color': '#282828', //blackish-grey
    // 'range.disabledSubbar.color': '#414141', //greyish

    // 'range.value.color': '#fff',
    // 'range.value.fontWeight': 'lighter',
    // 'range.value.fontSize': '11px',
    // 'range.value.border': '1px solid #353535',
    // 'range.value.backgroundColor': '#151515',
    // 'range.title.color': '#fff',
    // 'range.title.fontWeight': 'lighter',

    // // colorpicker style
    // 'colorpicker.button.border': '1px solid #1e1e1e',
    // 'colorpicker.title.color': '#fff'
}

const defaultTheme2 = {
    'menu.backgroundColor': 'white',
    'common.backgroundColor': '#e9e9e9',
    'menu.normalIcon.path': icond,
    'menu.activeIcon.path': iconb,
    'menu.disabledIcon.path': icona,
    'menu.hoverIcon.path': iconc,
    'submenu.backgroundColor': '#444242', //dark grey
}

export {
    defaultTheme,
    defaultTheme2
}