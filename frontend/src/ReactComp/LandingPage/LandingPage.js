//React
import React, {useEffect, useState} from "react";


//Mat-UI comp
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import {Link} from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from '@material-ui/icons/Search';

import './LandingPage.css'
//Component
import Section from '../Shared/Sections/section'
import TopBar from '../Shared/Topbar/topbar';

import {checkSetLogIn} from "../../Actions/APIwrapper";

const _images = {
    depressionImage: process.env.PUBLIC_URL + '/image/LandingPage/Depression.png',
    depressionHover: process.env.PUBLIC_URL + '/image/LandingPage/Depression-hovered.png',
    anxietyImage: process.env.PUBLIC_URL + '/image/LandingPage/Anxiety.png',
    anxietyHover: process.env.PUBLIC_URL + '/image/LandingPage/Anxiety-hovered.png',
    panicImage: process.env.PUBLIC_URL + '/image/LandingPage/Panic.png',
    panicHover: process.env.PUBLIC_URL + '/image/LandingPage/Panic-hovered.png',
    landingPageBG1: process.env.PUBLIC_URL + './image/LandingPage/landingBackground1.png',
    accept: process.env.PUBLIC_URL + './image/LandingPage/accept.png',
    bulletinBoard: process.env.PUBLIC_URL + './image/LandingPage/bulletin-board-crCatkuro.png'
}

function LandingPage() {
    const [isLogIn, setIsLogIn] = useState(false);
    const [searchText, setSearchText] = useState("");

    useEffect(()=>{
        checkSetLogIn(setIsLogIn);
    }, [])

    function handleChange(e){
        setSearchText(e.target.value);
    }

    function showImg(e, img_url) {
        e.stopPropagation();
        e.target.src = img_url;
    }

    function showHoverImg(e, img_url) {
        e.stopPropagation();
        e.target.src = img_url;
    }

    function handleLogOut(){
        localStorage.removeItem("MHtoken");
        window.location.reload();
    }

    const logout_button = <Button
        className='LogInButton'
        variant="contained"
        color="primary"
        onClick={handleLogOut}
    >
        Log Out
    </Button>

    const login_button = <Button
        className='LogInButton'
        variant="contained"
        color="primary"
        href="./Login"
    >
        Log In / Sign Up
    </Button>

    return (
        <>
            <TopBar/>
            <div className="LP_Banner" style={{backgroundImage: 'url(' + _images.landingPageBG1 + ')'}}>
                <h1 className="LP_Prompt">FIND OUT IF YOU HAVE</h1>
                <h1 className="LP_Prompt" style={{textAlign: 'center'}}>A MENTAL HEALTH ISSUE</h1>
                <div className="LP_Banner_overlap">
                    <div className="testImages">
                        <div className={'LP_Banner_boxH'}>
                            <Link to={'/Depression'}>
                                <img
                                    className="depressionImg"
                                    src={_images.depressionImage}
                                    onMouseOver={e => showHoverImg(e, _images.depressionHover)}
                                    onMouseLeave={e => showImg(e, _images.depressionImage)}
                                />
                            </Link>
                        </div>

                        <div className={'LP_Banner_boxH'}>
                            <div className={'LP_Banner_boxV'}>
                                <Link to={'/Anxiety'}>
                                    <img
                                        className="anxietyImg"
                                        src={_images.anxietyImage}
                                        onMouseOver={e => showHoverImg(e, _images.anxietyHover)}
                                        onMouseLeave={e => showImg(e, _images.anxietyImage)}
                                    />
                                </Link>
                            </div>

                            <div className={'LP_Banner_boxV'}>
                                <Link to={'/Panic'}>
                                    <img
                                        className="panicImg"
                                        src={_images.panicImage}
                                        onMouseOver={e => showHoverImg(e, _images.panicHover)}
                                        onMouseLeave={e => showImg(e, _images.panicImage)}
                                    />
                                </Link>
                            </div>
                        </div>

                    </div>
                    <div className="secondPrompt"> OR GET IMMEDIATE HELP</div>
                    <div className="secondPrompt2">search for a clinic in your area</div>
                    <form
                        className="secondSearch"
                        noValidate autoComplete="off">
                        <TextField
                            id="outlined-basic"
                            label="Enter a location and get help"
                            variant="filled"
                            fullWidth="true"
                            onChange={handleChange}
                        />
                        <Link to={{
                            pathname:'/Clinics',
                            searchText:searchText
                        }}>
                            <IconButton
                                id="secondIcon"
                                aria-label="search">
                                <SearchIcon/>
                            </IconButton>
                        </Link>
                    </form>
                </div>
            </div>
            <Section
                header={" "}
                title="Mental Health"
                sectionText="Mental health includes our emotional, psychological, and social well-being.
                It affects how we think, feel, and act. It also helps determine how we handle stress,
                relate to others, and make choices. Mental health is important at every stage of life,
                from childhood and adolescence through adulthood."
                textClass='SecContent'
                pictureSrc={_images.accept}
                pictureClass="SecPic"
            />
            {/*cr MentalHealth.gov*/}
            {isLogIn ? logout_button : login_button}
            {/* get announcement content from server; code below requires server call*/}
            <Section header="Latest News & Features"
                     title="Announcement"
                     sectionText="Filler to be changed"
                     textClass='SecContent'
                     pictureSrc={_images.bulletinBoard}
                     pictureClass="SecPic"
            />
            {/*cr WHO*/}
        </>
    );
}

export default LandingPage;