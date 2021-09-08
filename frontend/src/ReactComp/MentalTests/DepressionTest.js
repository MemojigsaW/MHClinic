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


export default function DepressionTest() {
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
                "depression":score
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
    const [questionText, setQuestionText] = useState('Little interest or pleasure in doing things?')
    const [buttonText, setButtonText] = useState('Next Question')
    const [score, setScore] = useState(0)

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
    	} 
    	setButtonClicked('none')
    	if (curQuestion == 1) {
    		setQuestionText('Feeling down, depressed, or hopeless?')
    	} else if (curQuestion == 2) {
    		setQuestionText('Trouble falling or staying asleep, or sleeping too much?')
    	} else if (curQuestion == 3) {
    		setQuestionText('Feeling tired or having little energy?')
    	} else if (curQuestion == 4) {
    		setQuestionText('Poor appetite or overeating?')
    	} else if (curQuestion == 5) {
    		setQuestionText('Feeling bad about yourself — or that you are a failure or have let yourself or your family down?')
    	} else if (curQuestion == 6) {
    		setQuestionText('Trouble concentrating on things, such as reading the newspaper or watching television?')
    	} else if (curQuestion == 7) {
    		setQuestionText('Moving or speaking so slowly that other people could have noticed? Or so fidgety or restless that you have been moving a lot more than usual?')
    	} else if (curQuestion == 8) {
            setButtonText('Finish')
    		setQuestionText('Thoughts that you would be better off dead, or thoughts of hurting yourself in some way?')
    	} else if (curQuestion == 9) {
    		setDisplayMode(3)
            //todo submit here, but wait for display mode set to complete first.
            //todo use some async logic
            console.log(score, "Depression");
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
                            Over the last 2 weeks, how often have you been bothered by any of the following problems? <br/>Tap “Continue” to start.
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
				                Not at all
				            </ToggleButton>
				            <ToggleButton 
				            	value="two"
				            >
				                Several days
				            </ToggleButton>
				            <ToggleButton 
				            	value="three"
				            >
				                More than half the days
				            </ToggleButton>
				            <ToggleButton 
				            	value="four"
				            >
				                Nearly every day
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
        if (score < 5) {
            riskLevel = 'Very Low Risk'
            resultExplain = "Your results indicate that you have none, or very few symptoms of depression."
        } else if (score < 10) {
            riskLevel = 'Low Risk'
            resultExplain = "Your results indicate that you may be experiencing symptoms of mild depression. While your symptoms are not likely having a major impact on your life, it is important to monitor them."
        } else if (score < 15) {
            riskLevel = 'Moderate Risk'
            resultExplain = "Your results indicate that you may be experiencing symptoms of moderate depression. Based on your answers, living with these symptoms could be causing difficulty managing relationships and even the tasks of everyday life."
        } else if (score < 20) {
            riskLevel = 'High Risk'
            resultExplain = "Your results indicate that you may be experiencing symptoms of moderately severe depression. Based on your answers, living with these symptoms is causing difficulty managing relationships and even the tasks of everyday life."
        } else if (score >= 20) {
            riskLevel = 'Severe Risk'
            resultExplain = "Your results indicate that you may be experiencing symptoms of severe depression. Based on your answers, these symptoms seem to be greatly interfering with your relationships and the tasks of everyday life."
        }
    	display = <div className="finalResult">
                    <Card className={classes.result} style={cardStyle} variant="outlined">
                    <div className="cardText">
                        Your result is <b> {riskLevel} </b> with a score of <b>{score}</b> out of 27
                    </div>
                    <div className="cardText">
                        {resultExplain}
                    </div>
                    <div className="explainText">
                        These results are based on PHQ-9 Depression test, they do not mean that you have depression, but it may be time to start a conversation with a mental health professional. 
                        Finding the right treatment plan and working with a healthcare provider or support person can help you feel more like you again.
                        The depression symptoms you are experiencing may also indicate other mental health issues like Anxiety, 
                        Borderline Personality Disorder, and PTSD.
                        This screen is not meant to be a diagnosis. Diagnosis and care of mental health conditions can be difficult. 
                        Having symptoms of depression is different than having depression. 
                        In addition, symptoms of depression can be caused by other mental health conditions, 
                        such as Borderline Personality Disorder, or other health problems, like a thyroid disorder. 
                        Only a trained professional, such as a doctor or a mental health provider, can make this determination.
                        However, by printing the results and bringing it to a mental health professional, you can open up the conversation.
                    </div>
                    <div className="moreTests">
                        Depression is often associated with other mental health conditions. <br/>You may also want to test for these issues.<br/>
                    <Button
                    id="test2First"
                        href={'/Anxiety'}
                        variant='contained'
                        color="primary">
                        Anxiety Test
                    </Button>
                    <Button
                    id="test2Second"
                        href={'/Panic'}
                        variant='contained'
                        color="primary">
                        Panic Test
                    </Button>
                    </div>
                    </Card>
                  </div>
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
