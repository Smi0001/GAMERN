import React, { Component } from 'react'

const bg = require('./profilePic.jpg')

class ImageBackground extends Component {
  
    render() {
        const { /*source,*/ customClass, imageTitle } = this.props
        const fields = {
            className: (customClass ? customClass : '') + ' image-component',
            title: imageTitle,
        }
        const style = {
            width: "100%",
            height: "100px",
            // backgroundImage: `url("${bg}")`,
            // backgroundColor: '#cccccc',
            // background: `lightblue url(${bg}) no-repeat fixed center`,
            position: 'relative'
          }
          console.log(bg)
        return (
            <div style={ style } { ...fields } >
                sample text
            </div>
        )
    }
}
  
export default ImageBackground;