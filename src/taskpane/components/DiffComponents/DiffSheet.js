import * as React from "react";
import Diff from "./Diff"
import "./DiffSheet.css"

/* global  */

export const changeType = {
    NONE: 'None',
    MODIFIED: 'Modified',
    INSERTED: 'Inserted',
    DELETED: 'Deleted'
}


export default class DiffSheet extends React.Component {

    constructor(props) {
        super(props); 
        this.state = { isExpanded: false };
        
        this.togglePanel = this.togglePanel.bind(this);
    }
    
    togglePanel() {
        this.setState({isExpanded: !this.state.isExpanded})
    }
    
  render() {   
      
    let diffArray = [];

    this.props.sheetDiff.changes.forEach((change, idx) => {
        const key = change.sheet + idx;
        diffArray.push(
            (
            <Diff key={key} diff={change}/>)
        )
    })

    // TODO: let us make this a constant
    if (this.props.sheetDiff.changeType === changeType.NONE) {
        return null;
    }

    const changeColor = {
        "Modified": "normal",
        "Inserted": "green",
        "Deleted": "red",
    }

    const cardClass = "card " + changeColor[this.props.sheetDiff.changeType];

    // We then display the operation performed on top of the sheet name
    const sheetName = `${this.props.sheetDiff.sheet} : ${this.props.sheetDiff.changeType}`

    return (
        <div className={cardClass}>
            <div className="card-title" onClick={this.togglePanel}>{sheetName}</div>
            {this.state.isExpanded ? diffArray : null}
        </div>
    );
  }
}
