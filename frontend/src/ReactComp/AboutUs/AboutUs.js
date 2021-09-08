import React from 'react';


import TopBar from "../Shared/Topbar/topbar";
import './AboutUs.css'


export default function AboutUs() {

    return (
    <>
        <TopBar />
        <div  className = "AboutUs">
          <div id = "aboutBlank1"/>
          <h1> About Us </h1>
          <div id = "aboutBlank2"/>
          <p id = "pInAboutUs">
            The aim of the project is to build an informational platform
            MindHelp dedicated to improving public mental health.
            This web application provides a tool for anyone with the intention
            to improve or maintain their mental health to gain critical information
            about mental illness and easily identify the mental health resources near them.
             Users can monitor their mental state by taking rudimentary diagnosis
             tests in addition to getting health suggestions and reminders from the website.
              The platform is expected to help users find clinics and/or counsellors
             based on their preferences. Moreover, users may book appointments
             with mental health services as well as leave ratings and comments for others’ references.
           </p>
        </div>
    </>
  );
}
