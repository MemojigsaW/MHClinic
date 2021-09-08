import React, {useState} from 'react';
import {useHistory} from "react-router-dom";

import {
    Button,
    CssBaseline,
    TextField,
    Grid,
    Typography,
    Container,
    withStyles,
    Card,
    MenuItem,
    FormHelperText,
    FormControlLabel,
    Checkbox,
    Link, makeStyles,

} from '@material-ui/core';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

import TOU from "./TermOfUse";

import {_images, municipalities} from "../Shared/data/data"
import {useDispatch} from "react-redux";
import {setUserAction} from "../../Redux/actions"


toast.configure();

const useStyles = makeStyles ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '5%',
        overflow: "auto",
        maxHeight: "90vh",
        marginTop: "5vh",
        opacity: '0.9'
    },

    topLogo: {
        height: '80px',
        opacity: '1.0'
    },

    signInText: {
        fontSize: 25,
        color: '#4352af'
    },

    form: {
        marginTop: '1%',
    },

    submit: {
        margin: '1%',
    },

    selectBox: {
        minWidth: 90,
    },

    TOU: {
        position: 'relative',
        right: '10px',
        top: '5.5px'
    },

    checkBox: {
        marginBottom: '-10px'
    }

});

function SignUpPresentation(props){
    const classes = useStyles();
    const [formState, setFormState] = useState({
        username:"",
        password:"",
        r_password:"",
        email:"",
        firstname:"",
        lastname:"",
        gender:"",
        age:"",
        m_status:"",
        location:""
    });
    const [chkbox, setChkbox] = useState(false);
    const [openTOU, setOpenTOU] = useState(false);
    const history = useHistory();

    function handleOnChange(e, field){
        const nformState = formState;
        nformState[field] = e.target.value;
        setFormState(nformState);
    }

    async function handleSubmit(e){
        e.preventDefault()
        if (!chkbox){
            toast.error("You must agree to TOU", {position:toast.POSITION.BOTTOM_CENTER});
            return
        }

        if (formState.password !== formState.r_password){
            toast.error("pw does not match", {position: toast.POSITION.BOTTOM_CENTER});
            return
        }

        if (formState.email===""||formState.username==="" || formState.password==="" || formState.firstname==="" || formState.lastname===""){
            toast.error("Need username, pw, email, fist name and last name", {position:toast.POSITION.BOTTOM_CENTER});
            return
        }

        const res = await props.handleSubmitAPI(formState);
        if (res.ok){
            const data = await res.json();
            localStorage.setItem("MHtoken", data.token);
            history.push("/");
            return
        }else{
            console.log("signUp failed flag");
            toast.error("Submit Failed, duplicate email or username", {position: toast.POSITION.BOTTOM_CENTER});
            return
        }
    }

    function handleDialogClose(){
        setOpenTOU(false)
    }

    function handleDialogOpen(e){
        e.preventDefault();
        setOpenTOU(true);
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>

            <Card className={classes.root} variant="outlined">

                <img src={_images.heartlogo} alt={""} className={classes.topLogo}/>

                <Typography className={classes.signInText}>
                    Sign Up
                </Typography>
                <form className={classes.form}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                label="Username"
                                name="username"
                                onChange={e=>handleOnChange(e,"username")}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                onChange={e=>handleOnChange(e,"password")}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="confirmPassword"
                                label="Repeat Password"
                                type="password"
                                onChange={e=>handleOnChange(e, "r_password")}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                onChange={e=>handleOnChange(e,"email")}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="firstName"
                                variant="outlined"
                                fullWidth
                                label="First Name"
                                onChange={e=>handleOnChange(e,"firstname")}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                label="Last Name"
                                name="lastName"
                                onChange={e=>handleOnChange(e,"lastname")}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                className={classes.selectBox}
                                select
                                name="gender"
                                label="Gender"
                                onChange={e=>handleOnChange(e,"gender")}
                            >
                                <MenuItem value={'Male'}>Male</MenuItem>
                                <MenuItem value={'Female'}>Female</MenuItem>
                                <MenuItem value={'Others'}>Others</MenuItem>

                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                className={classes.selectBox}
                                select
                                name="age"
                                label="Age"
                                onChange={e=>handleOnChange(e,"age")}
                            >
                                <MenuItem value={'50 or Older'}>50 or Older</MenuItem>
                                <MenuItem value={'35 ~ 50'}>35 ~ 50</MenuItem>
                                <MenuItem value={'18 ~ 34'}>18 ~ 34</MenuItem>
                                <MenuItem value={'Under 18'}>Under 18</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                className={classes.selectBox}
                                select
                                name="civil_status"
                                label="Status"
                                onChange={e=>handleOnChange(e,"m_status")}
                            >
                                <MenuItem value={'Married'}>Married</MenuItem>
                                <MenuItem value={'Single'}>Single</MenuItem>
                                <MenuItem value={'Separate'}>Separate</MenuItem>
                                <MenuItem value={'Divorced'}>Divorced</MenuItem>
                                <MenuItem value={'Widowed'}>Widowed</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                select
                                name="location"
                                label="Location"
                                onChange={e=>handleOnChange(e,"location")}
                            >
                                {municipalities.map((city) => (
                                    <MenuItem key={city} value={city}>
                                        {city}
                                    </MenuItem>
                                ))}

                            </TextField>
                            <FormHelperText>Where do you live in GTA?</FormHelperText>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                className={classes.checkBox}
                                control={<Checkbox
                                    checked={chkbox}
                                    color="primary"/>}
                                label="I agreed to the "
                                onChange={()=>setChkbox(!chkbox)}
                            />
                            <Link
                                href={'#'}
                                className={classes.TOU}
                                onClick={(e)=>handleDialogOpen(e)}
                            >
                                Terms of Use
                                <TOU dialog_open={openTOU} closeDialog={handleDialogClose} changeChkbox={setChkbox}/>
                            </Link>
                        </Grid>
                    </Grid>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleSubmit}
                    >
                        Sign Up
                    </Button>

                    <Grid container justify="flex-end">
                        <Grid item>
                            <Button>
                                Cancel
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Card>
        </Container>
    )
}

export default SignUpPresentation;