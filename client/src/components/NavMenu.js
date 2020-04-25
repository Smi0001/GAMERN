import React from 'react'
import { MENU_BAR_POSITION, imageEditorConfig } from '../constants/constants'
import {
    MDBIcon,
	MDBPopoverHeader,
} from "mdbreact";
import store from '../reduxStore'
import { AppActions } from '../actions'

class NavMenu extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            editorName: props.editorName,
            menuExpand: false,
        }
    }
    componentDidUpdate(prevProps) {
        const updatedProps = this.props
        if (updatedProps.selectedImageURL !== prevProps.selectedImageURL) {
            this.setState({
                selectedImageURL: updatedProps.selectedImageURL
            })
        }
    }
    closeMenuBar() {
        if(this.state.menuExpand) {
            this.setState({
                menuExpand: false
            }, console.log('closed'))
        }
    }
    toggleMenuBarPosition() {
        const { menuExpand } = this.state
        this.setState({
            menuExpand: !menuExpand
        })
    }
    moveEditor(editorName, editorPosition) {
        store.dispatch(
            AppActions.setMenuBarPosition(
                editorName,
                editorPosition
            )
        )
        // as the state change is not going to be an async call we can directly toggle back here
        // instead of calling it in callback, in case when we will store this activity in user's DB
        // then we need to call this toggle after the async call completes
        this.toggleMenuBarPosition()
    }

    render() {
        const { editorName, menuExpand } = this.state
        const toggleClass = menuExpand?'expand':''
        return (            
            <div title="Editor Nav Menu" className="nav-menu" onClick={this.toggleMenuBarPosition.bind(this)} >
                <MDBIcon icon="ellipsis-v" className="" />
                <div className={'nav-menu-hidden ' + toggleClass}>
                    {/* <label >Menu bar position</label> */}
                    <MDBPopoverHeader>Menu bar position</MDBPopoverHeader>
                    <ul>
                        <li onClick={this.moveEditor.bind(this, editorName, imageEditorConfig.menuBarPosition)}>
                            <MDBIcon icon="undo" className="nav-menu-icons" />
                            <span>Reset</span>
                        </li>
                        <li onClick={this.moveEditor.bind(this, editorName, MENU_BAR_POSITION.UP)}>
                            <MDBIcon icon="arrow-up" className="nav-menu-icons" />
                            <span>Move to Up</span>
                        </li>
                        <li onClick={this.moveEditor.bind(this, editorName, MENU_BAR_POSITION.DOWN)}>
                            <MDBIcon icon="arrow-down" className="nav-menu-icons" />
                            <span>Move to Down</span>
                        </li>
                        <li onClick={this.moveEditor.bind(this, editorName, MENU_BAR_POSITION.LEFT)}>
                            <MDBIcon icon="arrow-left" className="nav-menu-icons" />
                            <span>Move to Left</span>
                        </li>
                        <li onClick={this.moveEditor.bind(this, editorName, MENU_BAR_POSITION.RIGHT)}>
                            <MDBIcon icon="arrow-right" className="nav-menu-icons" />
                            <span>Move to Right</span>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default NavMenu