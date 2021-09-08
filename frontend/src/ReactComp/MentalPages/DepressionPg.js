import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import './MentalPg.css'

import {Button} from "@material-ui/core";

import TopBar from "../Shared/Topbar/topbar";
import {_images} from "../Shared/data/data";
import {checkSetLogIn} from "../../Actions/APIwrapper";


export default function DepressionPage() {
    const [isLogIn, setIsLogin] = useState(false);
    const history = useHistory();

    useEffect(()=>{
        const token_data = checkSetLogIn(setIsLogin);
    }, [])

    const logInPrompt = (<div className="loginSign">
                <div className = 'loginmsg'>
                    Ops! Looks like you are not logged in!
                </div>
                <div className = 'loginbt'>
                    <Button variant="contained"
                        id="loginButton"
                        color="secondary"
                        href="./Login">
                        Log in/ Sign up
                    </Button>
                </div>
            </div>)


    return (
    <>
        <TopBar />
      
        <div className="illnessSection">

            <div className="M_secTitle"> Depression</div>
            <div className="subTitle"> Overview </div>
            <div className="illnessDetail">
                <div>Depression is much more than simple unhappiness. <br/>
                    Clinical depression, sometimes called major depression, is a complex mood disorder caused by various factors, 
                    including genetic predisposition, personality, stress and brain chemistry. While it can suddenly go into remission,  
                    depression is <b>not something that people can “get over” by their own effort </b>. </div>
            </div>

            <div className="subTitle"> Signs and Symptoms </div>
            <div className="illnessDetail">
                <div>The main symptom of depression is a sad, despairing mood that: </div>
                <ul>
                    <li>Is present most days and lasts most of the day</li>
                    <li>Lasts for more than two weeks</li>
                    <li>Impairs the person’s performance at work, at school or in social relationships</li>
                </ul>
                <div>Other symptoms of depression include: </div>
                <ul>
                    <li>Changes in appetite and weight</li>
                    <li>Sleep problems</li>
                    <li>Loss of interest in work, hobbies, people or sex</li>
                    <li>Withdrawal from family members and friends</li>
                    <li>Feeling useless, hopeless, excessively guilty, pessimistic or having low self-esteem</li>
                    <li>Agitation or feeling slowed down</li>
                    <li>Irritability</li>
                    <li>Fatigue</li>
                    <li>Trouble concentrating, remembering or making decisions</li>
                    <li>Crying easily, or feeling like crying but being not able to</li>
                    <li>Thoughts of suicide (which should always be taken seriously)</li>
                    <li>A loss of touch with reality, hearing voices (hallucinations) or having strange ideas (delusions)</li>
                </ul>
                <a className="webLink" href='https://www.camh.ca/en/health-info/mental-illness-and-addiction-index/depression'>
                Read more
                </a>
            </div>
        </div>

        <div className="M_section">
            <div className={'M_boxH'}>
                <div className="M_secTitle"> Diagnosis Test</div>
                {isLogIn ? <Button
                    id="startButton"
                    variant="contained"
                    color="primary"
                    onClick={()=>history.push('/DepressionTest')}
                >
                    Start
                </Button> : logInPrompt}
            </div>
            <div className={'M_boxH'}>
                <img className="testImage" src={_images.anxiety}/>
                {/* test_help.jpg by Dimitri Houtteman from https://unsplash.com/photos/2P6Q7_uiDr0 */}
            </div>
        </div>
    </>
  );
}
