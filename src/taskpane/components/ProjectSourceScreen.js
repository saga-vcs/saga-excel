import * as React from "react";
import { PrimaryButton } from '@fluentui/react';
import {runCreateSaga, runCreateFromURL, createRemoteURL}  from "../../saga/create";
import Taskpane from "./Taskpane";
import { headerSize, operationStatus, taskpaneStatus } from "../../constants";

/* global */
  

// Login Form Component
export default class LoginScreen extends React.Component {
    constructor(props) {
        super(props); 
        this.createSagaProject = this.createSagaProject.bind(this);
        this.downloadSagaProject = this.downloadSagaProject.bind(this);
    }

    async createSagaProject(e) {
        e.preventDefault();
        this.props.nextStep();
        //Create the Saga project
        const remoteURL = await createRemoteURL();
        console.log(remoteURL);

        if (!remoteURL) {
            this.props.offline();
            return;
        }

        // TODO: save email in database
        const email = this.props.email;

        // Create the project with this remote URL and email
        const result = await runCreateSaga(remoteURL, email);

        console.log(result);

        // if creation was successful, move to share screen
        if (result.status === operationStatus.SUCCESS) {
            console.log("successful");

            // update the state of react component
            this.props.setURL(remoteURL);
            this.props.nextStep();
        } else {
            // TODO: revert state to pre creation state encase saga project was created
            window.app.setStep(1);
        }
 
    }

    async downloadSagaProject(e) {
        e.preventDefault();
        // Download the project from the url
        this.props.nextStep();

        const url = document.getElementById('url-input').value;
        const result = await runCreateFromURL(url, this.props.email);

        // if download was successful, move to share screen
        if (result.status === operationStatus.SUCCESS) {
            this.props.setURL(url);
            this.props.nextStep();
        } else {
            // TODO: revert state to pre creation state encase saga project was created
            window.app.setStep(1);
        }
    }

    render () {
        return (
            <Taskpane header={headerSize.LARGE} title="Choose your project creation method.">
                <div className="card-div">     
                    <p className="creation-option">Start a new project </p>     
                    <div className="floating-card create-project-card" >
                        <div className="subtext-div-half"> 
                            <p className="subtext">Turn your current workbook into a Saga project </p>
                        </div>
                        <div className="subtext-div-half"> 
                            <PrimaryButton className="submit-button center" onClick={this.createSagaProject}>Create</PrimaryButton>
                        </div>
                    </div>
                </div>
                <div className="card-div">   
                    <p className="creation-option">Download existing Saga project </p>     
                    <div className="floating-card">
                        <div className="new-project-text-div"> 
                            <p className="new-project-text subtext center">Enter the url of an existing Saga project </p>
                        </div>
                        <div className="create-project-card">
                            <form className="form" onSubmit={this.downloadSagaProject}>
                                <input className="input" id="url-input" placeholder="https://excel.sagacollab.com/project/1234-12313-123123" ></input>
                                <PrimaryButton className="download-button" type="submit">Download</PrimaryButton>
                            </form>
                        </div>
                    </div>
                </div>
            </Taskpane>
        );  
    }
}