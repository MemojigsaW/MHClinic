import {React, useEffect, useState} from 'react';
import {IconButton, Button, ButtonGroup, Menu, MenuItem, Tooltip, Avatar} from '@material-ui/core';
import {Link} from 'react-router-dom';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import './topbar.css'
import {checkSetLogIn, setGetUser, getAvatar} from "../../../Actions/APIwrapper";

import {_images} from "../data/data";

function TopBarUser() {
    const [isLogin, setIsLogin] = useState(false);
    const [user, setUser]= useState(null);
    const [userImg, setUserImg] = useState(_images.defaultavatar);

    useEffect(async ()=>{
        const val_data = await checkSetLogIn(setIsLogin);
        if (val_data!==null){
            const uid = val_data.uid.id;
            await setGetUser(uid, setUser);
        }
    }, [])

    useEffect(async ()=>{
        if (user!==null){
            const blob = await getAvatar(user.avatar);
            try{
                const url_obj = URL.createObjectURL(blob);
                setUserImg(url_obj);
            }catch (e) {
                console.log(e);
            }
        }
    }, [user])


    const LoggedInIcon = (
        <div className='topicon'>
            <a href={'./Profile'}>
                <Tooltip
                    arrow
                    title="View My Profile">
                    <img alt src={userImg} className='topavatar'/>
                </Tooltip>
            </a>
        </div>
    )


    const notLoggedInIcon =(
        <Link
            to="./Login"
        >
            <div className="loginTop">
                <div className="loginPrompt">LOG IN</div>
                <div id="logInIconWrapper">
                    <IconButton
                        style={{backgroundColor: 'transparent'}}
                        id="accountIcon"
                        aria-label="AccountCircle">
                        <AccountCircleIcon/>
                    </IconButton>
                </div>
            </div>
        </Link>
        )

    return (
        <>
            {isLogin?LoggedInIcon:notLoggedInIcon}
        </>
    )

}

function TopBar() {
    const [anchorEl, setAnchorEl] = useState(null);

    function handleClick(e) {
        setAnchorEl(e.currentTarget);
    }

    function handleClose() {
        setAnchorEl(null);
    }

    return (
        <nav className="TopBar">
            <div id='heartlogocontainer'>
                <Link to='/'>
                    <Tooltip
                        arrow
                        title="Home Page">
                        <img className="logo"
                             src={_images.heartlogo}
                             id="heartLogo"
                             alt="heartlogo"/>
                    </Tooltip>
                </Link>
            </div>

            <div id='buttongroupcontainer'>
                <ButtonGroup
                    size="large"
                    variant="text"
                    color="primary"
                    fullWidth={true}
                    aria-label="text primary button group">
                    <Button
                        aria-controls="simple-menu"
                        aria-haspopup="true"
                        onClick={handleClick}
                    >
                        Mental Health
                    </Button>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                        variant="selectedMenu"
                    >
                        <Link to={'/Depression'}>
                            <MenuItem onClick={handleClose}>Depression</MenuItem>
                        </Link>
                        <Link to={'/Anxiety'}>
                            <MenuItem onClick={handleClose}>Anxiety Disorder</MenuItem>
                        </Link>
                        <Link to={'/Panic'}>
                            <MenuItem onClick={handleClose}>Panic Disorder</MenuItem>
                        </Link>
                    </Menu>
                    <Button href="/GetHelp"> Get Help </Button>
                    <Button href="/AboutUs"> About Us </Button>
                </ButtonGroup>
            </div>

            <div id='usericon'>
                <TopBarUser/>
            </div>

        </nav>
    )
}

export default TopBar

