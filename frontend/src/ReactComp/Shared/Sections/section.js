import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';

import './section.css'

class Section extends React.Component {
    state = {
        searchtext: ""
    }

    handlesearchcontext(e){
        const value = e.target.value
        this.setState({
            searchtext: value
        })
    }

    renderHeader() {
        const {header} = this.props
        if (header) {
            return (
                <div className = "Header"> {header} </div>
            )
        } else {
            return null;
        }
    }

    renderContent() {
        const {sectionText, textClass} = this.props
        if (sectionText) {
            return (
                <div className = {textClass}>
                    {sectionText}
                </div>
            )
        } else {
            return null;
        }
    }

    render() {
        const {title, pictureSrc, pictureClass} = this.props

        return(
            <div className = "Section">
                <div className={"LP_S_boxH"}>
                    {this.renderHeader()}

                    <div className = "SecTitle"> {title}</div>
                    {this.renderContent()}
                </div>
                <div className={"LP_S_boxH"}>
                    <img
                        src = {pictureSrc}
                        className = {pictureClass}
                    />
                </div>
            </div>
        )
    }
}

export default Section
