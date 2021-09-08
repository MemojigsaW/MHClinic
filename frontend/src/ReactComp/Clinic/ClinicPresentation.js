import React, {useContext, useState} from "react";
import {useHistory} from "react-router-dom";

import {
    Card,
    CardActions,
    CardContent,
    CardMedia,
    makeStyles,
    CardHeader,
    Typography,
    Button,
    TextField
} from "@material-ui/core";
import {Rating} from "@material-ui/lab";

import LoadingScreen from "../Shared/LoadingScreen/LS";

const useStyles = makeStyles({
    actions: {
        display: 'block',
        marginBottom: '3%',
        marginTop: '3%',
        marginLeft: '5%',
        marginRight: '5%',
        borderStyle: 'solid',
    },
    textarea: {
        width: '100%',
        borderStyle: 'solid',
    }
})

function ClinicPresentation({clinic, user, submitReview}) {
    const history = useHistory();

    const [rating, setRating] = useState(3);
    const [review, setReview] = useState("");

    const classes = useStyles();

    function handleChange(e){
        setReview(e.target.value);
    }

    function handleSubmit(){
        submitReview(review, rating);
    }

    const commentForm = (
        <div id={'C_form'}>
            <Rating value={rating} onChange={(e, newValue) => {
                setRating(newValue)
            }}/>
            <TextField
                className={classes.textarea}
                fullWidth={true}
                multiline={true}
                variant={'outlined'}
                minRows={10}
                maxRows={10}
                inputProps={{maxLength: 350}}
                onChange={handleChange}
            />
            <Button fullWidth={false} onClick={handleSubmit}>Submit</Button>
        </div>
    )

    return (
        <>
            {clinic ? <Card id={'C_Card'}>
                <div className={'C_boxH'}>
                    <CardMedia
                        component={'img'}
                        image={clinic.view}
                    />
                </div>
                <div className={'C_boxH'}>
                    <CardContent>
                        <Typography>{clinic.title}</Typography>
                        <Typography>{clinic.city + " " + clinic.address}</Typography>
                        <Typography>{clinic.description}</Typography>
                        <Rating value={clinic.rating}/>
                    </CardContent>
                    <CardActions className={classes.actions}>
                        {user ? commentForm :
                            <Button fullWidth={true} onClick={()=>{history.push('/Login')}}>Log in to comment</Button>
                        }
                    </CardActions>
                </div>
            </Card> : <LoadingScreen/>}
        </>
    )
}

export default ClinicPresentation