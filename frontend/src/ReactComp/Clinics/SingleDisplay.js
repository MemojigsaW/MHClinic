import React, {useState} from 'react';
import {Link} from "react-router-dom";

import {
    Card,
    CardActions,
    CardActionArea,
    CardContent,
    CardMedia,
    CardHeader,
    Typography,
    withStyles
} from "@material-ui/core"

import {Rating} from "@material-ui/lab";


const Styles ={
    action:{
      float:'right',
      marginRight:'3vw',
    },
    media:{
        height:'40vh',
        width:'40vw',
    },
    content:{
        marginRight:'3vw'
    }
}


class SingleDisplay extends React.Component {

    render() {
        const {data} = this.props;
        const {classes} = this.props;
        return (
            <Card id={'C_Card'}>
                <div className={'C_boxH'}>
                    <CardActions className={classes.action}>
                        <CardMedia
                            component={'img'}
                            className={classes.media}
                            image={process.env.PUBLIC_URL + data.view}
                        />
                    </CardActions>
                </div>
                <div className={'C_boxH'}>
                    <CardContent className={classes.content}>
                        <Link to={'/Clinic/'+data._id}>
                            <Typography>{data.title}</Typography>
                        </Link>
                        <Typography>{data.address+" "+data.city+" "+data.postal}</Typography>
                        <Rating value={data.rating}/>
                        <Typography>{data.description}</Typography>
                    </CardContent>
                </div>
            </Card>
        )
    }
}

export default withStyles(Styles)(SingleDisplay)