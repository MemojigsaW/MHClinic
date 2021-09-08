//React
import React from "react";
import {BrowserRouter, Route, Switch} from 'react-router-dom'


import './App.css';
import SearchIcon from '@material-ui/icons/Search';

//Components
import LandingPage from "./ReactComp/LandingPage/LandingPage";
import GetHelpPage from "./ReactComp/GetHelp/GetHelp";
import ClinicList from './ReactComp/Clinics/Clinics';
import ClinicLogic from "./ReactComp/Clinic/ClinicLogic";
import AboutUs from "./ReactComp/AboutUs/AboutUs";
import AnxietyPage from "./ReactComp/MentalPages/AnxietyPg";
import DepressionPage from "./ReactComp/MentalPages/DepressionPg";
import PanicPage from "./ReactComp/MentalPages/PanicPg";
import AnxietyTest from "./ReactComp/MentalTests/AnxietyTest";
import DepressionTest from "./ReactComp/MentalTests/DepressionTest";
import PanicTest from "./ReactComp/MentalTests/PanicTest";
import Login from "./ReactComp/Login/Login";
import SignUpContainer from "./ReactComp/SignUp/SignUpContainer";
import ProfilePage from "./ReactComp/User/UserContainer";

function App() {
  return (
      <BrowserRouter>
          <Switch>
              <Route path={'/Signup'} component={SignUpContainer}/>
              <Route path={'/Login'} component={Login}/>
              <Route path={'/'} exact component={LandingPage}/>
              <Route path={'/Profile'} component={ProfilePage}/>
              <Route path={'/AboutUs'} component={AboutUs}/>
              <Route path={'/Anxiety'} component={AnxietyPage}/>
              <Route path={'/Depression'} component={DepressionPage}/>
              <Route path={'/Panic'} component={PanicPage}/>
              <Route path={'/AnxietyTest'} component={AnxietyTest}/>
              <Route path={'/DepressionTest'} component={DepressionTest}/>
              <Route path={'/PanicTest'} component={PanicTest}/>
              <Route path={'/GetHelp'} component={GetHelpPage}/>
              <Route path={'/Clinics'} exact component={ClinicList}/>
              <Route path={'/Clinic/:id'} component={ClinicLogic}/>
          </Switch>
      </BrowserRouter>
  );
}

export default App;
