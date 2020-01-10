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
            releaseOutputModels:{releaseOutputModels:[]},
            deployStatus:""
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
        this.setState({deployStatus:false});
        setTimeout(function (self) {
            self.setState({deployStatus:true});
        },3000,this);
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

        axios.post('https://api-int.dit.connectcdk.com/api/dm-cdk-cnst-utility-assets/v1/api/utility/release/StartDeployment', reqArr)
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

                <div className="row product-select">
                    <div className="col m3 s12">
                    <div className="input-field">
                    <select className="product-select">
                    <option value="1" selected>Connected Store</option>
                    <option value="2">Quote Services</option>
                    </select>
                    <label><b>Select Product</b></label>
                </div>
                    </div>
                </div>

            <section className=" card">
                    <table className="responsive-table striped deploy-dash">
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
            <div className="card-action center-align">
                {this.state.deployStatus === ""? <div className="right-align"> <a className="waves-effect waves-light btn" onClick={this.deployChange.bind(this)}><b>Deploy</b></a></div>: this.state.deployStatus === false ? <div className="preloader-wrapper small active"><div className="spinner-layer spinner-green-only"></div><div className="circle-clipper left"><div className="circle"></div></div><div className="gap-patch"><div className="circle"></div></div><div className="circle-clipper right"><div className="circle"></div></div></div> :  <div className="right-align"> <a className="waves-effect waves-light btn"><b>Deployed</b></a></div>}
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