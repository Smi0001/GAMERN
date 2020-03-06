import React from 'react'
import { MDBIcon } from 'mdbreact'

class Loader extends React.Component {

    render() {
        const { size, pulse, spin, icon, inverse, customClass, iconClass } = this.props
        return (
            <div className={"loader-div center " + (customClass?customClass:'')}>
              <MDBIcon
                className={iconClass?iconClass:'text-color-white'}
                icon={icon?icon:'spinner'}
                pulse={!!pulse}
                spin={!!spin}
                inverse={!!inverse}
                size={size?size:'2x'}/>
            </div>
        )
    }
}

export default Loader