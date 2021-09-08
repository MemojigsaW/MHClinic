import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";

import './MentalPg.css'

import {Button} from "@material-ui/core";

import TopBar from "../Shared/Topbar/topbar";

import {_images} from "../Shared/data/data";
import {checkSetLogIn} from "../../Actions/APIwrapper";


export default function AnxietyPage() {
    const [isLogIn, setIsLogin] = useState(false);
    const history = useHistory();

    useEffect(()=>{
        const token_data = checkSetLogIn(setIsLogin);
    }, [])

    const logInPrompt = (
        <div className="loginSign">
            <span>
                Ops! Looks like you are not logged in!
            </span>
            <Button variant="contained"
                    id="loginButton"
                    color="secondary"
                    href="./Login">
                Log in/ Sign up
            </Button>
        </div>);

    return (
        <>
            <TopBar/>
            <div className="illnessSection">
                <div className="M_secTitle"> Anxiety Disorder</div>
                <div className="subTitle"> Overview</div>
                <div className="illnessDetail">
                    <div>Everyone experiences symptoms of anxiety, but they are generally occasional and short-lived,
                        and do not cause problems. <br/> But when the cognitive, physical and behavioural symptoms of
                        anxiety are persistent and severe,
                        and anxiety causes distress in a person’s life to the point that it negatively affects his or
                        her ability to work or study,
                        socialize and manage daily tasks, it may be beyond the normal range.
                    </div>
                </div>
                <div className="subTitle"> Signs and Symptoms</div>
                <div className="illnessDetail">
                    <div>Each of these anxiety disorders is distinct in some ways, but they all share the same hallmark
                        features:
                    </div>
                    <ul>
                        <li>Irrational and excessive fear</li>
                        <li>Apprehensive and tense feelings</li>
                        <li>Difficulty managing daily tasks and/or distress related to these tasks.</li>
                    </ul>
                    <div>Cognitive, behavioural and physical symptoms include:</div>
                    <ul>
                        <li>Anxious thoughts (e.g., “I’m losing control” )</li>
                        <li>anxious predictions (e.g., “I’m going to fumble my words and humiliate myself”)</li>
                        <li>anxious beliefs (e.g., “Only weak people get anxious”)</li>
                        <li>avoidance of feared situations (e.g., driving)</li>
                        <li>avoidance of activities that elicit sensations similar to those experienced when anxious
                            (e.g., exercise)
                        </li>
                        <li>subtle avoidances (behaviours that aim to distract the person, e.g., talking more during
                            periods of anxiety)
                        </li>
                        <li>safety behaviours (habits to minimize anxiety and feel “safer,” e.g., always having a cell
                            phone on hand to call for help)
                        </li>
                        <li>excessive physical reactions relative to the context (e.g., heart racing and feeling short
                            of breath in response to being at the mall)
                        </li>
                    </ul>
                    <a className="webLink"
                       href='https://www.camh.ca/en/health-info/mental-illness-and-addiction-index/anxiety-disorders'>
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
                    onClick={()=>history.push('/AnxietyTest')}>
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
