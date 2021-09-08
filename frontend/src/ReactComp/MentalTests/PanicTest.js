import React, {useEffect, useState} from 'react';
import {Card, Button, CssBaseline, makeStyles, Container} from '@material-ui/core';
import {ToggleButton, ToggleButtonGroup} from '@material-ui/lab';
import BackgroundSlider from 'react-background-slider'

import './MentalTest.css';

import TopBar from "../Shared/Topbar/topbar";
import {_images} from "../Shared/data/data";
import {checkSetLogIn, setGetUser} from "../../Actions/APIwrapper";
import {toast} from "react-toastify";
toast.configure();

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(10),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        opacity: '1',
    },
    submit: {
        margin: theme.spacing(1),
    },

    next: {
        margin: theme.spacing(4),
    },

    result: {
        marginTop: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        opacity: '1',
    },
}))
const cardStyle = {
    display: 'block',
    transitionDuration: '0.3s',
}


export default function PanicTest() {
    const [isLogIn, setIsLogin] = useState(false);
    const [user, setUser] = useState(null);
    const [loaded, setLoaded] = useState(false);

    useEffect(async ()=>{
        const token_data = await checkSetLogIn(setIsLogin);
        if (token_data!==null){
            const n_user = await setGetUser(token_data.uid.id, setUser);
            setUser(n_user);
        }
        setLoaded(true);
    }, []);

    async function submitScore(){
        try{
            const uid = user._id;
            const path = '/api/mental/'+uid;
            const json_body = {
                "panic":score
            }
            const res = await fetch(path,{method:'GET'});
            if (res.ok){
                const res2 = await fetch(path, {
                    method:'PATCH',
                    headers: {'Content-Type': 'application/json'},
                    body:JSON.stringify(json_body)
                })
                if (res2.ok){
                    toast.info("Score Patch", {position:toast.POSITION.TOP_CENTER});
                }else{
                    console.log("Patch failed");
                    toast.error("Score patch failed", {position:toast.POSITION.BOTTOM_CENTER});
                }
            }else{
                const res3 = await fetch(path, {
                    method:'POST',
                    headers: {'Content-Type': 'application/json'},
                    body:JSON.stringify(json_body)
                });
                if (res3.ok){
                    toast.info("Score Posted", {position:toast.POSITION.TOP_CENTER});
                }else{
                    console.log("Post failed");
                    toast.error("Score post failed", {position:toast.POSITION.BOTTOM_CENTER});
                }
            }
        }catch (e) {
            console.log(e);
            toast.error("An error has occurred", {position:toast.POSITION.BOTTOM_CENTER});
        }
    }

    const classes = useStyles();

    // displayMode == 0: disclaimer; 
    // displayMode == 1: big leading question; 
    // displayMode == 2: specific question; 
    // displayMode == 3: result
    const [displayMode, setDisplayMode] = useState(0)
    const [buttonClicked, setButtonClicked] = useState('none')
    const [curQuestion, setCurQuestion] = useState(1)
    const [questionText, setQuestionText] = useState('How many panic attacks did you have during the last week?')
    const [buttonText, setButtonText] = useState('Next Question')
    const [score, setScore] = useState(0)
    const [toggle1, setToggle1] = useState('None')
    const [toggle2, setToggle2] = useState('One')
    const [toggle3, setToggle3] = useState('Two')
    const [toggle4, setToggle4] = useState('Three or Four')
    const [toggle5, setToggle5] = useState('Five or More')

    function handleDisplay() {
    	if (displayMode == 0) {
    		setDisplayMode(1)
    	} else if (displayMode == 1) {
    		setDisplayMode(2)
    	}
	}

    function handleChange(event, newButtonClicked) {
    	setButtonClicked(newButtonClicked)
    }

    function handleNext() {
    	setCurQuestion(prevQuestion => prevQuestion + 1)
    	if (buttonClicked == 'none') {
    		alert('You must choose one option.')
    		return
    	} else if (buttonClicked == 'one') {
    		setScore(prevScore => prevScore)
    	} else if (buttonClicked == 'two') {
    		setScore(prevScore => prevScore + 1)
    	} else if (buttonClicked == 'three') {
    		setScore(prevScore => prevScore + 2)
    	} else if (buttonClicked == 'four') {
    		setScore(prevScore => prevScore + 3)
    	} else if (buttonClicked == 'five') {
            setScore(prevScore => prevScore + 4)
        } 
    	setButtonClicked('none')
    	if (curQuestion == 1) {
    		setQuestionText('If you had any panic attacks during the past week, how distressing were they while they were happening?')
            setToggle1("Not at all distressing")
            setToggle2("Mildly distressing")
            setToggle3("Moderately distressing")
            setToggle4("Severely distressing")
            setToggle5("Extremely distressing")
    	} else if (curQuestion == 2) {
    		setQuestionText('During the past week, how much have you worried or felt anxious about when your next panic attack would occur?')
            setToggle1("Not at all")
            setToggle2("Occasionally")
            setToggle3("Frequently")
            setToggle4("Very frequently")
            setToggle5("Nearly constantly")
    	} else if (curQuestion == 3) {
    		setQuestionText('During the past week how often did you avoid a place or situation because you were afraid of having a panic attack?')
            setToggle1("Never")
            setToggle2("Once or twice")
            setToggle3("Three or four times")
            setToggle4("Five or six times")
            setToggle5("Every day")
    	} else if (curQuestion == 4) {
    		setQuestionText("During the past week, were there any activities that you avoided because they caused physical sensations like those you feel during panic attacks?")
            setToggle1("None")
            setToggle2("One or two")
            setToggle3("Three or four")
            setToggle4("Five or six")
            setToggle5("Seven or more")
    	} else if (curQuestion == 5) {
    		setQuestionText('During the past week, to what extent did panic attacks - or the fear of an attack - interfere with your ability to work or carry out your responsibilities at home?')
            setToggle1("Not at all")
            setToggle2("Once or twice")
            setToggle3("Three or four times")
            setToggle4("Five or six times")
            setToggle5("Every day")
    	} else if (curQuestion == 6) {
            setButtonText('Finish')
    		setQuestionText('During the past week, to what extent did panic attacks - or the fear of panic attacks - interfere with your social life?')
            setToggle1("Not at all")
            setToggle2("Once or twice")
            setToggle3("Three or four times")
            setToggle4("Five or six times")
            setToggle5("Every day")
    	} else if (curQuestion == 7) {
    		setDisplayMode(3)
            //todo submit here, but wait for display mode set to complete first.
            //todo use some async logic
            console.log(score, "Panic");
    	}
    }

    let display
    if (displayMode == 0) {
    	display = <Card className={classes.root} variant="outlined">

                        <div className="cardText">
                            By clicking "I Agree" below you acknowledge that this is not a diagnostic instrument and 
                            is only to be used by you if you are 18 years or older. 
                            You agree that this application is for information purposes only and 
                            is not intended to replace a consultation with your doctor or a mental health professional. 
                            We disclaim any liability, loss, 
                            or risk incurred as a consequence, directly or indirectly, from the use and application of this test. 
                            <br/><br/> If you are in need of immediate assistance, 
                            please dial <b> 911 </b> or the Canada Suicide Prevention Lifeline at <b> 1-833-456-4566</b>.
                        </div>

                        <Button
                            size="large"
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={handleDisplay}
                        >
                            I Agree
                        </Button>
                               
                    </Card>
    } else if (displayMode == 1) {
    	display = <Card className={classes.root} variant="outlined">


                        <div className="cardText">
                            For the following questions a panic attack is defined as a sudden rush of fear or discomfort accompanied 
                            by symptoms such as rapid or pounding heartbeat, chest pain or discomfort, sweating, nausea, or fear of losing control. 
                            Tap “Continue” to start.
                        </div>

                        
                        <Button
                            size="large"
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={handleDisplay}
                        >
                            Continue
                        </Button>
                               
                    </Card>
    } else if (displayMode == 2) {
    	display = <Card className={classes.root} variant="outlined">

                        <div className="questionText">
                            {questionText}
                        </div>

                        <ToggleButtonGroup size="large" value={buttonClicked} exclusive onChange={handleChange}>
				            <ToggleButton
				            	value="one"
				            >
				               {toggle1}
				            </ToggleButton>
				            <ToggleButton 
				            	value="two"
				            >
				                {toggle2}
				            </ToggleButton>
				            <ToggleButton 
				            	value="three"
				            >
				                {toggle3}
				            </ToggleButton>
				            <ToggleButton 
				            	value="four"
				            >
				                {toggle4}
				            </ToggleButton>	
                            <ToggleButton 
                                value="five"
                            >
                                {toggle5}
                            </ToggleButton> 			          
				        </ToggleButtonGroup>
                        
                        <Button
                            size="large"
                            type="next"
                            variant="contained"
                            color="primary"
                            className={classes.next}
                            onClick={handleNext}
                        >
                            {buttonText}
                        </Button>
                               
                    </Card>
    } else if (displayMode == 3) {
        submitScore();
        let riskLevel;
        let resultExplain;
        if (score < 2) {
            riskLevel = 'Very Low Risk'
            resultExplain = "Your results indicate that you have none, or only one, symptom of panic disorder."
        } else if (score < 6) {
            riskLevel = 'Minimal Risk'
            resultExplain = "Your results indicate that you are at minimal risk of having Panic Disorder. While your symptoms are not likely having a major impact on your life, it is important to monitor them."
        } else if (score < 10) {
            riskLevel = 'Mild Risk'
            resultExplain = "Your results indicate that you are at mild risk of having Panic Disorder. If you notice that your symptoms aren't improving, you may want to bring them up with a mental health professional or someone who is supporting you."
        } else if (score < 14) {
            riskLevel = 'Moderate Risk'
            resultExplain = "Your results indicate that you have moderate risk of having Panic Disorder. Based on your answers, your symptoms are likely making it difficult for you to function normally and carry out your day-to-day activities."
        } else if (score >= 14) {
            riskLevel = 'Severe Risk'
            resultExplain = "Your results indicate that you are at severe risk for Panic Disorder Based on your answers, your symptoms are likely making it extremely difficult for you to function normally and carry out your day-to-day activities."
        }
    	display = <Card className={classes.result} style={cardStyle} variant="outlined">
                    <div className="cardText">
                        Your result is <b> {riskLevel} </b> with a score of <b>{score}</b> out of 28
                    </div>
                    <div className="cardText">
                        {resultExplain}
                    </div>
                    <div className="explainText">
                        These results are based on PDSS Panic Disorder scale, they do not mean that you have panic disorder, but it may be time to start a conversation with a mental health professional. 
                        Finding the right treatment plan and working with a healthcare provider or support person can help you feel more like you again.
                        Panic Disorder is often associated with other disorders such as Depression, Social Anxiety, and Agoraphobia.
                        This screen is not meant to be a diagnosis. Diagnosis and care of mental health conditions can be difficult. 
                        Having symptoms of panic disorder is different than having panic disorder. 
                        In addition, symptoms of panic disorder can be caused by other mental health conditions or other health problems.
                        Only a trained professional, such as a doctor or a mental health provider, can make this determination.
                        However, by printing the results and bringing it to a mental health professional, you can open up the conversation.
                    </div>
                    <div className="moreTests">
                        Anxiety Diosrder is often associated with other mental health conditions. <br/>You may also want to test for these issues.<br/>
                    <Button
                    id="test2First"
                        href={'/Anxiety'}
                        variant='contained'
                        color="primary">
                        Anxiety Test
                    </Button>
                    <Button
                    id="test2Second"
                        href={'/Depression'}
                        variant='contained'
                        color="primary">
                        Depression Test
                    </Button>
                    </div>
                    </Card>
    }
    const error_page =
            <div>
                <h3> Not enough permissions to access this page. </h3>
                <Button variant="contained" href={'/'}>
                    Go back
                </Button>
            </div>
    const test_page = <div>
                        <div>
                            <BackgroundSlider
                                images={[_images.background1, _images.background2]}
                                duration={700} transition={2} />

                        </div>
                        <TopBar />
                        <div>
                            <Container component="main" maxWidth="md">
                                <CssBaseline />
                                {display}
                            </Container>
                        </div>

                    </div>
    return (<div>
            {isLogIn ? test_page : error_page}
            </div>)
}
