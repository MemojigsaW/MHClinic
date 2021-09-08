import React, {useEffect, useState} from "react";
import {Redirect} from "react-router-dom";


import ReactScoreIndicator from 'react-score-indicator'
import {Form} from 'react-bootstrap'
import {CardHeader, CardBody, CardTitle, Row, Col} from "reactstrap";
import {Card, Container, Typography, Button, makeStyles} from '@material-ui/core';

import TopBar from "../Shared/Topbar/topbar";
import LoadingScreen from "../Shared/LoadingScreen/LS";

import {municipalities, _images, defaultAvataroid} from '../Shared/data/data'
import {checkSetLogIn, setGetUser, getAvatar, getMentalScore} from "../../Actions/APIwrapper";
import {toast} from "react-toastify";

toast.configure();

const useStyles = makeStyles({

    root: {
        padding: '3%',
    },

    userCard: {
        width: '100%',
        margin: 'auto',
    },

    mentalHealthCard: {
        width: "100%",
    },

    userCardBackground: {
        width: '100%',
        height: '40vh',
        objectFit: 'cover',
        borderRadius: '2.5%'
    },

    userName: {
        position: " relative",
        bottom: "55px"
    },

    quote: {
        position: "relative",
        top: "-30px",
        padding: "10px"
    },

    userProfilePic: {
        width: '10%',
        height: '10%',
        border: '5px solid white ',
        margin: "auto",
        position: "relative",
        bottom: "60px",
        borderRadius: "50%",
        display: "flow-root"
    },

    gridContainer: {
        padding: "20px"
    },

    EditProfileCard: {
        width: '100%'
    },
    col: {
        margin: '5%'
    }
})

function ProfilePage() {
    //todo messy page needs fixing


    const [isLogin, setIsLogin] = useState(false);
    const [user, setUser] = useState(null);
    const [profilepic, setProfilePic] = useState(process.env.PUBLIC_URL + '/image/Carl.png');
    const [formState, setFormState] = useState({
        username: "",
        email: "",
        firstName: "",
        lastName: "",
        gender: "",
        age: "",
        m_status: "",
        location: ""
    });
    const [gender, setGender] = useState("");
    const [age, setAge] = useState("");
    const [m_status, setM_status] = useState("");
    const [location, setLocation] = useState("");
    const [mental, setMental] = useState({
        anxiety: -1,
        depression: -1,
        panic: -1
    })
    const [loaded, setLoaded] = useState(false);

    const [file, setFile] = useState(null);

    useEffect(async () => {
        const data = await checkSetLogIn(setIsLogin);
        if (data !== null) {
            await setGetUser(data.uid.id, setUser);
            const n_mental = await getMentalScore(data.uid.id);
            setMental(n_mental);
        } else {
            setLoaded(true);
        }
    }, []);

    useEffect(async () => {
        if (user === null) return
        //async and await within
        const blob = await getAvatar(user.avatar);
        if (blob !== null) {
            setProfilePic(URL.createObjectURL(blob));
        }
        const n_FormState = {
            username: user.username,
            email: user.email,
            password: "",
            r_password: "",
            firstName: user.firstName,
            lastName: user.lastName,
            gender: user.gender,
            age: user.age,
            m_status: user.maritalStatus,
            location: user.location
        }
        setFormState(n_FormState);
        setGender(n_FormState.gender);
        setAge(n_FormState.age);
        setM_status(n_FormState.m_status);
        setLocation(n_FormState.location);
        setLoaded(true);
    }, [user])

    const handleChange = (e) => {
        const n_FormState = formState;
        n_FormState[e.target.name] = e.target.value;
        setFormState(n_FormState);
    }

    const handleOptionChange = (e, action) => {
        action(e.target.value);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        let pw;
        if (formState.password !== "" && (formState.password === formState.r_password)) {
            pw = formState.password;
        } else if (formState.password !== "" && (formState.password !== formState.r_password)) {
            toast.error("Pw does not match", {position: toast.POSITION.BOTTOM_CENTER});
            return;
        } else {
            pw = null
        }

        try {
            const path = '/api/user/' + user._id;
            const res = await fetch(path,
                {
                    method: 'PATCH',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        password: pw,
                        email: formState.email,
                        firstName: formState.firstName,
                        lastName: formState.lastName,
                        gender: gender,
                        age: age,
                        maritalStatus: m_status,
                        location: location
                    })
                });
            if (res.ok) {
                window.location.reload();
            } else {
                console.log("patch user failed");
                return
            }
        } catch (e) {
            console.log("patch failed:", e);
            return
        }
    }

    async function handleUpload(e) {
        if (file === null) {
            toast.error("no file uploaded", {position: toast.POSITION.BOTTOM_CENTER});
            return
        }

        const fdata = new FormData();
        fdata.append("image", file);
        try {
            const res = await fetch('/api/user/avatar',
                {
                    method: 'POST',
                    body: fdata
                });
            if (!res.ok) {
                console.log("post avatar failed")
                toast.error("post avatar failed", {position: toast.POSITION.BOTTOM_CENTER});
                return
            }

            const _d = await res.json();

            const n_oid = _d.oid;
            const o_oid = user.avatar;

            const path = '/api/user/av/' + user._id;
            const res2 = await fetch(path,
                {
                    method: 'PATCH',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        avatar: n_oid
                    })
                });

            if (!res2.ok) {
                console.log("Patch avatar failed");
                toast.error("Upload failed", {position: toast.POSITION.BOTTOM_CENTER});
                return
            }

            if (o_oid !== defaultAvataroid) {
                const path = '/api/user/avatar/' + o_oid;
                const res3 = await fetch(path, {
                    method: "DELETE"
                });
                if (!res3.ok) console.log("delete old failed");
            }
            window.location.reload();

        } catch (e) {
            console.log(e);
            toast.error("Upload failed", {position: toast.POSITION.BOTTOM_CENTER});
            return
        }
    }

    function handleFileChange(e) {
        setFile(e.target.files[0]);
    }


    // const backgroundpic = randomBackgroundPics();
    const backgroundpic = _images.defaultBackground;
    const classes = useStyles();
    const color_arrays = [
        '#d12000',
        '#ed8d00',
        '#f1bc00',
        '#84c42b',
        '#53b83a',
        '#3da940',
        '#3da940',
        '#3da940',
    ].reverse();

    const content = (
        <>
            <TopBar/>
            <Container className={classes.root} maxWidth={"lg"}>
                <Row>
                    <Card className={classes.userCard} variant="outlined">
                        <img
                            className={classes.userCardBackground}
                            alt="..."
                            src={backgroundpic}
                        />

                        <img alt src={profilepic}
                             className={classes.userProfilePic}/>
                        <Typography className={classes.userName} align={"center"} variant={"h4"}
                                    color={"primary"}>{formState.username}</Typography>
                        <div>
                            <Typography className={classes.quote} align={"center"} variant={"body1"}
                                        gutterBottom>
                                "The greatest glory in living lies not in never falling, but in rising every
                                time we fall."
                            </Typography>
                            <Typography className={classes.quote} align={"center"} variant={"body2"}
                                        gutterBottom> - Nelson Mandela </Typography>

                        </div>
                    </Card>
                </Row>
                <Row key={formState}>
                    <Card className={classes.EditProfileCard}>

                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignContent: 'center'
                        }}>
                            <div>
                                <CardHeader>
                                    <CardTitle tag="h5">Edit Profile</CardTitle>
                                </CardHeader>
                                <CardBody>
                                    <Col className={classes.col} md="5">
                                        <input type="file" name="file" onChange={handleFileChange}/>
                                    </Col>
                                    <Col className={classes.col} md="5">
                                        <Button fullWidth={true} variant={'text'} onClick={handleUpload}>Update profile
                                            avatar</Button>
                                    </Col>
                                    <Col className={classes.col} md="5">
                                        <Form>
                                            <Form.Label>Username</Form.Label>
                                            <Form.Control
                                                readOnly
                                                value={formState.username}
                                                disabled
                                            />
                                        </Form>
                                    </Col>
                                    <Col className={classes.col} md="7">
                                        <Form>
                                            <Form.Label>Email address</Form.Label>
                                            <Form.Control
                                                placeholder={formState.email}
                                                onChange={handleChange}
                                                name="email"
                                            />
                                        </Form>
                                    </Col>
                                    <Col className={classes.col} md="6">
                                        <Form>
                                            <Form.Label>New Password</Form.Label>
                                            <Form.Control
                                                type="password"
                                                placeholder="Enter if changing password"
                                                onChange={handleChange}
                                                name="password"
                                            />
                                        </Form>
                                    </Col>
                                    <Col className={classes.col} md="6">
                                        <Form>
                                            <Form.Label>Repeat Password</Form.Label>
                                            <Form.Control
                                                type="password"
                                                name="r_password"
                                                onChange={handleChange}
                                                placeholder="Enter if changing password"
                                            />
                                        </Form>
                                    </Col>
                                    <Col className={classes.col} md="6">
                                        <Form>
                                            <Form.Label>First Name</Form.Label>
                                            <Form.Control
                                                placeholder={formState.firstName}
                                                name="firstName"
                                                onChange={handleChange}
                                            />
                                        </Form>
                                    </Col>
                                    <Col className={classes.col} md="6">
                                        <Form>
                                            <Form.Label>Last Name</Form.Label>
                                            <Form.Control
                                                placeholder={formState.lastName}
                                                name="lastName"
                                                onChange={handleChange}
                                            />
                                        </Form>
                                    </Col>
                                    <Col className={classes.col} md="4">
                                        <Form>
                                            <Form.Label>Gender</Form.Label>
                                            <Form.Control
                                                as={'select'}
                                                custom
                                                value={gender}
                                                onChange={(e) => {
                                                    handleOptionChange(e, setGender)
                                                }}
                                                name="gender"
                                            >
                                                <option value={"Male"}>Male</option>
                                                <option value={"Female"}>Female</option>
                                                <option value={"Others"}>Others</option>
                                            </Form.Control>
                                        </Form>
                                    </Col>
                                    <Col className={classes.col} md="4">
                                        <Form>
                                            <Form.Label>Age</Form.Label>
                                            <Form.Control
                                                as={'select'}
                                                custom
                                                value={age}
                                                onChange={(e) => {
                                                    handleOptionChange(e, setAge)
                                                }}
                                                name="age"
                                            >
                                                <option value={"50 or Older"}>50 or Older</option>
                                                <option value={"35 ~ 50"}>35 ~ 50</option>
                                                <option value={"18 ~ 34"}>18 ~ 34</option>
                                                <option value={"Under 18"}>Under 18</option>
                                            </Form.Control>
                                        </Form>
                                    </Col>
                                    <Col className={classes.col} md="4">
                                        <Form>
                                            <Form.Label>Civil Status</Form.Label>
                                            <Form.Control
                                                as={'select'}
                                                custom
                                                value={m_status}
                                                name="m_status"
                                                onChange={(e) => {
                                                    handleOptionChange(e, setM_status)
                                                }}
                                            >
                                                <option value={"Married"}>Married</option>
                                                <option value={"Single"}>Single</option>
                                                <option value={"Divorced"}>Divorced</option>
                                                <option value={"Separate"}>Separate</option>
                                                <option value={"Widowed"}>Widowed</option>
                                            </Form.Control>
                                        </Form>
                                    </Col>
                                    <Col className={classes.col} md="8">
                                        <Form>
                                            <Form.Label>Municipality</Form.Label>
                                            <Form.Control
                                                as={'select'}
                                                custom
                                                value={location}
                                                name="location"
                                                onChange={e => {
                                                    handleOptionChange(e, setLocation)
                                                }}
                                            >
                                                {municipalities.map((city) => (
                                                    <option value={city}>
                                                        {city}
                                                    </option>
                                                ))}
                                            </Form.Control>
                                        </Form>
                                    </Col>
                                    <Col className={classes.col} md="4">
                                        <Form>
                                            <Form.Label>Province</Form.Label>
                                            <Form.Control
                                                disabled
                                                readOnly
                                                placeholder="Province"
                                                value={"Ontario"}
                                            />
                                        </Form>
                                    </Col>
                                    <br/>
                                    <div style={{display: 'flex', justifyContent: 'center', margin: '5%'}}>
                                        <Button
                                            variant='outlined'
                                            color="primary"
                                            type="submit"
                                            onClick={handleSubmit}
                                        >
                                            Update Profile
                                        </Button>
                                    </div>
                                </CardBody>
                            </div>
                        </div>
                    </Card>

                </Row>
                <Row>
                    <Card className={classes.mentalHealthCard}>
                        <CardHeader>
                            <CardTitle tag="h4">MentalHealth Test Result</CardTitle>
                        </CardHeader>
                        <CardBody>
                            <Row>
                                <Col md="4">
                                    <h5>Depression</h5>
                                    {mental.depression !== -1
                                        ? <ReactScoreIndicator
                                            // Depression
                                            value={mental.depression}
                                            maxValue={27}
                                            lineWidth={40}
                                            lineGap={5}
                                            stepsColors={color_arrays}
                                            fadedOpacity={20}/>
                                        :
                                        <div><ReactScoreIndicator
                                            // Depression
                                            value={""}
                                            maxValue={27}
                                            lineWidth={40}
                                            lineGap={5}
                                            stepsColors={color_arrays}
                                            fadedOpacity={20}/>
                                            <h6 style={{textAlign: "center"}}>No Result Available</h6>
                                            <div className="update ml-auto mr-auto" style={{textAlign: "center"}}>
                                                <Button
                                                    href={'/Depression'}
                                                    variant='contained'
                                                    color="primary">
                                                    Depression Test
                                                </Button>
                                            </div>
                                        </div>
                                    }
                                </Col>
                                <Col md="4">
                                    <h5>Anxiety</h5>
                                    {mental.anxiety !== -1
                                        ? <ReactScoreIndicator
                                            // Anxiety
                                            value={mental.anxiety}
                                            maxValue={21}
                                            lineWidth={40}
                                            lineGap={5}
                                            fadedOpacity={20}
                                            stepsColors={color_arrays}/>
                                        : <div>
                                            <ReactScoreIndicator
                                                // Anxiety
                                                value={""}
                                                maxValue={21}
                                                lineWidth={40}
                                                lineGap={5}
                                                fadedOpacity={20}
                                                stepsColors={color_arrays}/>
                                            <h6 style={{textAlign: "center"}}>No Result Available</h6>
                                            <div className="update ml-auto mr-auto" style={{textAlign: "center"}}>
                                                <Button
                                                    href={'/Anxiety'}
                                                    variant='contained'
                                                    color="primary">
                                                    Anxiety Test
                                                </Button>
                                            </div>
                                        </div>
                                    }
                                </Col>
                                <Col md="4">
                                    <h5>Panic</h5>
                                    {mental.panic !== -1
                                        ? <ReactScoreIndicator
                                            value={mental.panic}
                                            maxValue={28}
                                            lineWidth={40}
                                            lineGap={5}
                                            stepsColors={color_arrays}
                                            fadedOpacity={20}/>
                                        : <div><ReactScoreIndicator
                                            value={""}
                                            maxValue={28}
                                            lineWidth={40}
                                            lineGap={5}
                                            stepsColors={color_arrays}
                                            fadedOpacity={20}/>
                                            <h6 style={{textAlign: "center"}}>No Result Available</h6>
                                            <div className="update ml-auto mr-auto" style={{textAlign: "center"}}>
                                                <Button
                                                    href={'/Panic'}
                                                    variant='contained'
                                                    color="primary">
                                                    Panic Test
                                                </Button>
                                            </div>
                                        </div>
                                    }
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Row>
            </Container>
        </>
    )

    return (
        <>
            {loaded ? <>
                {isLogin ? content : <Redirect to={'/Login'}/>}
            </> : <LoadingScreen/>}
        </>

    );
}

export default ProfilePage;
