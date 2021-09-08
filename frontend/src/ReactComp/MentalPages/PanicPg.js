import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import './MentalPg.css'

import {Button} from "@material-ui/core";

import TopBar from "../Shared/Topbar/topbar";
import {_images} from "../Shared/data/data";
import {checkSetLogIn} from "../../Actions/APIwrapper";


export default function PanicPage() {
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

            <div className="M_secTitle"> Panic Disorder</div>
            <div className="subTitle"> Overview </div>
            <div className="illnessDetail">
                <div>Panic disorder refers to recurrent, unexpected panic attacks (e.g., heart palpitations, sweating, trembling) followed by <br/> at least one month of:
                constant concern about having another panic attack or the consequences of a panic attack (e.g., having a heart attack), and/or
                significant behaviour changes related to the attacks (e.g., avoiding exercise or places for fear of having a panic attack).
                <br />A panic attack is a sudden feeling of intense fear or discomfort that peaks within minutes. It includes stressful physical and cognitive symptoms as well as behavioural signs. </div>
            </div>

            <div className="subTitle"> Signs and Symptoms </div>
            <div className="illnessDetail">
                <div>Physical symptoms include: </div>
                <ul>
                    <li>pounding heart</li>
                    <li>sweating</li>
                    <li>trembling or shaking</li>
                    <li>shortness of breath</li>
                    <li>feelings of choking</li>
                    <li>chest pain or discomfort</li>
                    <li>dizziness or nausea</li>
                    <li>sensations of heat or cold</li>
                    <li>numbness or tingling</li>
                    <li>sensations of heat or cold</li>
                    <li>feelings of unreality or being detached</li>
                </ul>
                <div>Cognitive symptoms include thoughts such as: </div>
                <ul>
                    <li>“I’m having a heart attack.”</li>
                    <li>"I’m suffocating.”</li>
                    <li>"I'm losing control."</li>
                    <li>"I'm going crazy."</li>
                </ul>
                <div>Behavioural signs include: </div>
                <ul>
                    <li>avoiding places where the person had anxiety symptoms in the past or similar places</li>
                    <li>avoiding travel, malls, line-ups</li>
                    <li>avoiding strenuous activities (e.g., exercise)</li>
                </ul>
                <a className="webLink" href='https://www.camh.ca/en/health-info/mental-illness-and-addiction-index/panic-disorder'>
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
                    onClick={()=>history.push('/PanicTest')}
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
