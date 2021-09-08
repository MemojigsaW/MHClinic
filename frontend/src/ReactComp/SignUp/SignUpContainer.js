import React, {useEffect, useState} from "react";
import {Redirect} from 'react-router-dom'

import SignUpPresentation from "./SignUpPrep";
import LoadingScreen from "../Shared/LoadingScreen/LS";


function SignUpContainer() {
    const [isLogin, setIsLogin] = useState(false);
    const [loaded, setLoaded] = useState(false);

    function checkLogin() {
        const token = localStorage.getItem("MHtoken");
        if (token === null) {
            setIsLogin(false);
            return
        }

        return fetch('api/user/validate',
            {
                method: 'GET',
                headers: {"x-auth-token": token},
            })
    }

    function handleSubmit(formState) {
        return fetch('/api/user/signup',
            {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    username: formState.username,
                    password: formState.password,
                    email: formState.email,
                    firstName: formState.firstname,
                    lastName: formState.lastname,
                    gender: formState.gender,
                    age: formState.age,
                    maritalStatus: formState.m_status,
                    location: formState.location
                })
            });
    }


    useEffect(async () => {
        try {
            const res = await checkLogin();
            if (res.ok) {
                setIsLogin(true);
            } else {
                setIsLogin(false);
            }
        } catch (e) {
            console.log(e);
            setIsLogin(false);
        }finally {
            setLoaded(true);
        }
    }, [])


    return (
        <>
            {loaded ? <>
                    {!isLogin ? <SignUpPresentation handleSubmitAPI={handleSubmit}/>
                        : <Redirect to={'/'}/>}
                </>
                : <LoadingScreen/>}
        </>
    );
}

export default SignUpContainer;