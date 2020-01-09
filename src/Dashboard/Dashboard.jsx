import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import {messageService} from "../_services";
import Select from "@material-ui/core/Select";
import async from 'async';
import axios from 'axios';


class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: 'ChooseYourEnvironment',
            releaseOutputModels:{releaseOutputModels:[]}
        };

    }

    componentDidMount() {

        this.subscription = messageService.getMessage().subscribe(result => {
            if (result) {
                // add message to local state if not empty
                this.setState({releaseOutputModels: result.releaseOutputModels});
            } else {
                // clear messages when empty message received
                this.setState({components: []});
            }
        });
    }

    componentWillUnmount() {
        // unsubscribe to ensure no memory leaks
        this.subscription.unsubscribe();
    }

    deployChange() {
        //pass all the component names here
        console.log(this.state);
        var reqArr = [];
        for (let i = 0; i < this.state.releaseOutputModels.releaseOutputModels.length; i++) {
            if (this.state.releaseOutputModels.releaseOutputModels[i].isChecked === true) {
                reqArr.push({
                    projectId: this.state.releaseOutputModels.releaseOutputModels[i].projectId,
                    environmentId: this.state.releaseOutputModels.releaseOutputModels[i].deploymentOutputs.preProdDeplymentId,
                    preProdDeploymentState: this.state.releaseOutputModels.releaseOutputModels[i].deploymentOutputs.preProdDeploymentState,
                    preProdPlanResultKey: this.state.releaseOutputModels.releaseOutputModels[i].deploymentOutputs.preProdPlanResultKey,
                    loginDetails: {
                        userName: this.props.credentials.username,
                        password: this.props.credentials.password
                    }
                })
            }
        }

        axios.post('http://localhost:5001/api/utility/release/StartDeployment', reqArr)
            .then(response => console.log(response));
        }

    render() {

        var checkboxStyle = {
            opacity:"inherit",
            pointerEvents:"all"
        };

        var state = this.state;

        var handleCheck = function(name,event){
            for(let i=0;i< state.releaseOutputModels.releaseOutputModels.length;i++){
                if(name === state.releaseOutputModels.releaseOutputModels[i].projectName){
                    state.releaseOutputModels.releaseOutputModels[i].isChecked = !state.releaseOutputModels.releaseOutputModels[i].isChecked;
                }
            }
        };

        var listItems = this.state.releaseOutputModels.releaseOutputModels.map(function(component,index) {
            return (
                <tr>
                    <td>{component.projectName}</td>
                    <td>{component.deploymentOutputs.prodDeployedState}</td>
                    <td>
                        <ul>
                            {component.deploymentOutputs.releaseNumbers.map(release => <li>{release}</li>)}
                        </ul>
                    </td>
                    <td>{component.deploymentOutputs.preProdDeploymentState}</td>
                    <td>
                        <ul>
                            {component.deploymentOutputs.commitIds.map(commitId => <li className="commit-id">{commitId}</li>)}

                        </ul>
                    </td>
                    <td>
                        <ul>
                            {component.deploymentOutputs.jiraDetails.map(jiraDetail => jiraDetail.properties.jiraKey.map(story => <li className="commit-id">{story}</li>))}

                        </ul>
                    </td>
                    <td>
                     {/*<CheckDeploy />*/}
                        <input type="checkbox" name={component.projectName} style={checkboxStyle} checked={state[component.projectName]} onChange={e => handleCheck(component.projectName,e)} value={component.projectName+index}/>
                    </td>
                </tr>
            );
        });
        return (
            <div className="container dashboard">
                <h4 className="center-align"><b>One Click Deployment</b></h4>
            <section className=" card">
                    <table className="responsive-table striped">
                <thead>
                <tr>
                    <th>Component</th>
                    <th>Current Deployed State</th>
                    <th>Release Nos after last Deployment</th>
                    <th>Desired Deployment State</th>
                    <th>Commit ID</th>
                    <th>Jira Detail</th>
                    <th>Deploy</th>
                </tr>
                </thead>

                <tbody>
                {listItems}
                </tbody>
            </table>
            <div className="card-action right-align">
              <a className="waves-effect waves-light btn" onClick={this.deployChange.bind(this)}><b>Deploy</b></a>
              </div>
            </section>

            <div className="card more-actions">
            <div className="card-action">
                <div className="row">
                    <div className="col m6 s12">
                    <h5>More Actions</h5>
                    </div>
                    <div className="col m6 s12 right-align">
                    <a className="waves-effect waves-light btn inte-btn teal lighten-1"><b>Run Integration Tests</b></a>
                    <a className="waves-effect waves-light btn email-report-btn teal lighten-1"><b>Email Reports</b></a>
                    </div>
                </div>
              </div>
            </div>
            </div>
        );
    }
}

export { Dashboard };