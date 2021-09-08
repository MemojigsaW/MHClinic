import {CircularProgress} from "@material-ui/core";
import React from "react";

function LoadingSpinner() {
    return (
        <div style={{display: 'flex', justifyContent: 'center', alignContent: 'center', width: '100%'}}>
            <CircularProgress variant={'indeterminate'}/>
        </div>
    )
}

export default LoadingSpinner;