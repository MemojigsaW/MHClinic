import React, {useEffect, useState} from 'react';
import {useHistory, Redirect} from "react-router-dom";
import {toast} from 'react-toastify';

import {
    Button,
    CssBaseline,
    TextField,
    FormControlLabel,
    Checkbox,
    Link,
    Grid,
    Typography,
    Container,
    Card
} from '@material-ui/core';

import {makeStyles} from "@material-ui/core"
import {_images} from "../Shared/data/data"
import {checkSetLogIn} from "../../Actions/APIwrapper";
import LoadingScreen from "../Shared/LoadingScreen/LS";

toast.configure();
const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '5%',
        overflow: "auto",
        maxHeight: "70vh",
        marginTop: "15vh",
        marginBottom: "15vh",
        opacity: '0.9'
    },

    topLogo: {
        height: '80px',
        width: '320px',
        opacity: '1.0'
    },

    form: {
        marginTop: '3%',
    },

    submit: {
        margin: '1%',
    },

    signInText: {
        fontSize: 25,
        color: '#4352af'
    },

    forgetPassword: {
        marginTop: '5%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
});

const LoginPage = () => {
    const [isLogin, setIsLogin] = useState(false);

    const history = useHistory();
    const [loaded, setLoaded] = useState(false);

    const [formState, setFormState] = useState({username:"", password:""});

    function handleOnChange(e, field){
        const nformState = formState;
        nformState[field] = e.target.value;
        setFormState(nformState);
    }

    async function handlesubmit(e){
        e.preventDefault();
        try{
            const res = await fetch('/api/user/login',
                {method:"POST",
                    headers: {'Content-Type': 'application/json'},
                    body:JSON.stringify({
                        username:formState.username,
                        password:formState.password
                    })
                })
            const data = await res.json();
            if (!res.ok) {throw new Error('fetch failed')};
            localStorage.setItem("MHtoken", data.token);
            history.push('/');
        }catch (e){
            toast.error('Login Failed', {position:toast.POSITION.BOTTOM_CENTER});
        }
    }

    function handleRedirect(path){
        history.push(path);
    }

    useEffect(async ()=>{
        await checkSetLogIn(setIsLogin);
        setLoaded(true);
    }, [])


    const classes = useStyles();
    const content = (
        <Container fixed maxWidth="xs">
            <CssBaseline/>
            <Card className={classes.root} variant="outlined">

                <img src={_images.heartlogo} alt={""} className={classes.topLogo}/>

                <Typography className={classes.signInText}>
                    Log in
                </Typography>

                <form className={classes.form}>

                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        onChange={(e)=>handleOnChange(e, "username")}
                    />

                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={(e)=>handleOnChange(e, "password")}
                    />

                    <Grid container>
                        <Grid item xs>
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary"/>}
                                label="Remember me"
                            />
                        </Grid>
                        <Grid item>

                            <Button
                                size="large"
                                type="submit"
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={handlesubmit}
                            >
                                Log In
                            </Button>
                        </Grid>
                    </Grid>

                    <Button
                        fullWidth
                        variant="contained"
                        color="secondary"
                        className={classes.submit}
                        onClick={()=>handleRedirect('/Signup')}
                    >
                        Not yet a member? Sign up
                    </Button>

                    <Grid>
                        <Link href="/" className={classes.forgetPassword} onClick={()=>handleRedirect('/')}>
                            Back to Home Page
                        </Link>
                    </Grid>
                </form>
            </Card>
        </Container>
    )

    return (
            <>
                {loaded?<>
                    {isLogin?<Redirect to={'/'}/>:content}
                </>:<LoadingScreen/>}
            </>
    );
}

export default LoginPage;
