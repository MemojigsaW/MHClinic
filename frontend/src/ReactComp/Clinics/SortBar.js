import React, {useState} from 'react';
import {Menu, MenuItem, Button} from "@material-ui/core";

import {municipalities} from "../Shared/data/data";

function SortBar(props) {
    const [mAnchor, setmAnchor] = useState(null);

    const handleClick = (e) => {
        setmAnchor(e.currentTarget);
    };

    function handleClose(e, index) {
        setmAnchor(null);
        const loc = municipalities[index];
        props.handleSortbyUpdate(loc);
    }


    return (
        <div id={'SortBarContainer'}>
            <div id='SortBarWrapper'>
                <div className='CL_SortBartitle'>
                    {props.searchText ? 'Showing Clinics at ' + props.searchText : "Showing all logged clinics"}
                </div>

                <div className="CL_SortArea">
                    <div id={'CL_SortAreaCenter'}>
                        <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                            Sort By
                        </Button>
                        <Menu
                            open={Boolean(mAnchor)}
                            anchorEl={mAnchor}
                            keepMounted={true}
                            onClose={handleClose}
                        >
                            {municipalities.map((element, index) => {
                                return <MenuItem value={element} onClick={(e)=>handleClose(e,index)}>{element}</MenuItem>
                            })}
                        </Menu>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SortBar