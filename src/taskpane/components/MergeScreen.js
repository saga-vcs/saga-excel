import * as React from "react";
import { mergeState } from "../../constants";
import MergeErrorScreen from "./MergeComponents/MergeErrorScreen";
import MergeProgressScreen from "./MergeComponents/MergeProgressScreen";
import MergeForkedScreen from "./MergeComponents/MergeForkedScreen";
import MergeSuccessScreen from "./MergeComponents/MergeSuccessScreen";
import MergeConflictScreen from "./MergeComponents/MergeConflictScreen";
import MergeConflictResolutionErrorScreen from "./MergeComponents/MergeConflictResolutionErrorScreen";


/* global  */

const INTERMEDIATE_MESSAGES = [ 
  "Saga Tip: Merge early, merge often", 
  "Saga Tip: Split work with your teammates so that you aren't editing the same cells",
  "The key to collaboration is preparation",
  "Wow! This seems like a cool project",
  "Oh boy! I can't wait to see the results!",
  "We are hard at work processing your merge",
  "Woah! I didn't know Excel had this many cells",
  "Sit back, relax, and enjoy the merge"
];

function randomMessage() {
  return INTERMEDIATE_MESSAGES[Math.floor(Math.random() * INTERMEDIATE_MESSAGES.length)];
}

export default class MergeScreen extends React.Component {

  constructor(props) {
    super(props); 
    this.state = {
        processingStep: 0,
        firstRender: true, 
        resolutionRetryObj: {}
    };

    this.setResolutionRetryObj = this.setResolutionRetryObj.bind(this);
  }

  setResolutionRetryObj = (resolutionRetryObj) => {
    console.log("setting resolution object")
    this.setState({ resolutionRetryObj: resolutionRetryObj });
  }

  render() {
    console.log(`Rendering Merge Screen in state ${this.props.mergeState}`);
    
    // TODO: put this in a proper screen form

    switch(this.props.mergeState) {
      case mergeState.MERGE_IN_PROGRESS:
        // TODO: make this display a random message
        return (<MergeProgressScreen/>);
      
      case mergeState.MERGE_SUCCESS:
        return (<MergeSuccessScreen/>);

      case mergeState.MERGE_CONFLICT:
        return (<MergeConflictScreen mergeConflictData={this.props.mergeConflictData} setResolutionRetryObj={this.setResolutionRetryObj}></MergeConflictScreen>);

      case mergeState.MERGE_CONFLICT_RESOLUTION_ERROR:
        return (<MergeConflictResolutionErrorScreen resolutionRetryObj={this.state.resolutionRetryObj}/>);

      case mergeState.MERGE_ERROR:
        return (<MergeErrorScreen/>);

      case mergeState.MERGE_FORKED:
        return (<MergeForkedScreen remoteURL={this.props.remoteURL}/>);

      default:
        return (<MergeErrorScreen/>);
    }
  }
}
