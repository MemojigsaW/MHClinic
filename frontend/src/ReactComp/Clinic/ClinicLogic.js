import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";

import TopBar from "../Shared/Topbar/topbar";
import LoadingScreen from "../Shared/LoadingScreen/LS";
import ClinicPresentation from "./ClinicPresentation";
import CommentsPresentation from "./CommentsPresentation";

import {toast} from "react-toastify";

import {checkSetLogIn, setGetUser} from "../../Actions/APIwrapper";

import {_images} from "../Shared/data/data";

toast.configure();

function ClinicLogic({match}) {
    const _id = match.params.id;

    const history = useHistory();
    const [isLogIn, setIsLogIn] = useState(false);
    const [clinic, setClinic] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(async () => {
        try{
            const path = '/api/clinic/id/'+_id;
            const res = await fetch(path, {method:'GET'});
            if (!res.ok){
                console.log("Clinic failed to load");
                history.push('/Clinics');
            }
            const result = await res.json();
            const i_path = '/api/clinic/image/'+result.view;
            const i_res = await fetch(i_path, {method:'GET'});
            let i_view;
            if (!i_res.ok){
                i_view = _images.heartlogo;
            }else{
                const blob = await i_res.blob();
                i_view = URL.createObjectURL(blob);
            }
            result.view = i_view;
            setClinic(result);

            const token_data = await checkSetLogIn(setIsLogIn);
            if (token_data){
                await setGetUser(token_data.uid.id, setUser);
            }
        }catch (e) {
            console.log(e);
        }
    }, []);

    async function submitReview(review, rating){
        if (review===""){
            toast.info("Please leave a comment to review", {position:toast.POSITION.BOTTOM_CENTER});
            return
        }

        const res = await fetch('/api/review/',
            {
                method:'POST',
                headers: {'Content-Type': 'application/json'},
                body:JSON.stringify({
                    uid: user._id,
                    cid: clinic._id,
                    rating: rating,
                    text: review
                })
            });
        if (!res.ok){
            console.log("Post review failed");
            toast.error("Post Review Failed", {position:toast.POSITION.BOTTOM_CENTER});
            return
        }else{
            toast.info("Review success", {position:toast.POSITION.BOTTOM_CENTER});
            window.location.reload();
            return
        }
    }

    return (
        <>
            <TopBar/>
            <ClinicPresentation clinic={clinic} user={user} submitReview={submitReview}/>
            {clinic?<CommentsPresentation clinic={clinic}/>:<></>}
        </>
    )
}

export default ClinicLogic;