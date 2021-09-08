import React, {useEffect, useState} from "react";
import {_images} from "../Shared/data/data";
import {Avatar, Grid, makeStyles, Paper, Typography} from "@material-ui/core";
import {Rating} from "@material-ui/lab";

import LoadingSpinner from "../Shared/LoadingScreen/LoadingSpinner";

const useStyles = makeStyles({
    grid: {
    },
    paper: {
        marginLeft: '2.5%',
        marginRight: '2.5%',
        marginTop: '1%',
        padding: '1%'
    }
})


const Comment = ({element}) => {
    const [noCollapse, setNoCollapse] = useState(true);
    const [user, setUser] = useState(null);

    const classes = useStyles();

    useEffect(async () => {
        console.log("execute");
        try {
            const path = '/api/user/' + element.uid;
            const res = await fetch(path, {method: "GET"});
            if (!res.ok) {
                console.log("load user in comment failed");
                return
            }
            const r_user = await res.json();
            const i_path = '/api/user/avatar/' + r_user.avatar;
            const res2 = await fetch(i_path, {method: "GET"});
            let i_url = _images.defaultavatar;
            if (res.ok) {
                const blob = await res2.blob();
                i_url = URL.createObjectURL(blob);
            }
            r_user.avatar = i_url;
            setUser(r_user);
            console.log("user should been set");
        } catch (e) {
            console.log(e);
        }
    }, []);


    return (
        <>
            {user ? <div className={'CommentWrapper'}>
                    <Paper className={classes.paper}>
                        <Grid container wrap="nowrap" spacing={2} zeroMinWidth className={classes.grid}>
                            <Grid item className={classes.grid}>
                                <Avatar src={user.avatar}/>
                            </Grid>
                            <Grid container direction={'column'} zeroMinWidth className={classes.grid}>
                                <Grid item xs zeroMinWidth className={classes.grid}>
                                    <Typography noWrap>{user.username}</Typography>
                                </Grid>
                                <Grid item xs zeroMinWidth className={classes.grid}>
                                    <Rating value={element.rating} readOnly/>
                                </Grid>
                                <Grid item xs zeroMinWidth>
                                    <Typography
                                        noWrap={noCollapse}
                                        style={{overflowWrap: 'break-word'}}
                                        onClick={e => setNoCollapse(!noCollapse)}
                                    >{element.text}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                </div>
                : <LoadingSpinner/>}
        </>
    )
}


export default Comment;