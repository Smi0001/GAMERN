import React, { Component } from 'react'
import ImageBackground from './ImageBackground'
import Text from './Text'
// const backupImageUrl = require('../assets/profilePic.jpg')

class ImageEditor extends Component {
  
    render() {
        const {
            imageUrl,
            imageStyle,
            imageClass,
            imageAltName,
            imageTitle,
            textContent,
            textStyle,
            textClass,
            textTitle,
        } = this.props
        const imageDefaultStyle = {
            height: 100,
            width: 100,
            position: 'relative', // because it's parent
            top: 2,
            left: 2
        }
        const textDefaultStyle = {
            fontWeight: 'bold',
            color: 'white',
            position: 'absolute', // child
            bottom: 0, // position where you want
            left: 0
        }
        return (
            <div className="container">
                <ImageBackground
                    source={ imageUrl || 'backupImageUrl' }
                    style={ Object.assign({}, imageStyle, imageDefaultStyle) }
                    customClass={ imageClass || ''}
                    alternateName={ imageAltName }
                    imageTitle={ imageTitle || '' }
                >
                    <Text
                        textContent={ textContent || 'testing'}
                        style={  Object.assign({}, textStyle, textDefaultStyle) }
                        customClass={ textClass || ''}
                        textTitle={ textTitle || 'hello'}
                    >
                        Hello World
                    </Text>
                </ImageBackground>
            </div>
        )
    }
  }
  
  export default ImageEditor;

