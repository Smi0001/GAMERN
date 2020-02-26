import React, { Component } from 'react'


class Text extends Component {
  
    render() {
        const { textContent, style, customClass, textTitle,  } = this.props
        const fields = {
            style,
            className: (customClass + ' text-component'),
            title: textTitle,
        }
        return (
            <label {...fields} >{ textContent }</label>
        )
    }


}
  
export default Text;