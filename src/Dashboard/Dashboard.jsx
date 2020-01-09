import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import {messageService} from "../_services";
import Select from "@material-ui/core/Select";
import async from 'async';
import axios from 'axios';

var checkboxStyle = {
    opacity:"inherit",
    pointerEvents:"all"
};


const CheckDeploy = ()=>{
    var checkArr = this.state.checkComponents.map(function (item) {
        return (
            <input type="checkbox" name={item.name} style={checkboxStyle}
                   checked={item.status} onChange={e => this.handleCheck(item.name,e).bind(this)} value={item.name}
            />
        )
    });
return(
    {checkArr}
)
};

const JiraDetail = (jiraArr)=>{
    var jiraDetail = jiraArr.map(function (jiraDetail) {
        return (
            <td className="commit-id">{jiraDetail.properties}</td>
        );
    });
    return (
        {jiraDetail}
    )
};


const CommitData = (commitArr) => {
    var dataItems = commitArr.map(function (commitId) {
        return (
            <td className="commit-id">{commitId}</td>
        );
    });

    return (
        {dataItems}
    );
};

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: 'ChooseYourEnvironment',
            checkComponents: [{name:"checkedA", status:false},{name:"checkedB", status: false},{name:"checkedC", status:false},{name:"checkedD",status:false}],
            components:[{"releaseOutputModels":[]}]
        };

    }

    componentDidMount() {
        this.subscription = messageService.getMessage().subscribe(result => {
            if (result) {
                // add message to local state if not empty
                this.setState({components: result.releaseOutputModels});
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
    handleCheck(name,event){
        for(let i=0;i<= this.state.checkComponents;i++){
            if(name === this.state.checkComponents[i].name){
                this.setState({ [name]: event.target.checked });
            }
        }
    }
    deployChange(){
        //pass all the component names here
        async.parallel([
            function(callback) {
                axios.get(`https://jsonplaceholder.typicode.com/todos/1`).then(res => callback(res));
                //use post for actual calls
            },
            function(callback) {
                axios.get(`https://jsonplaceholder.typicode.com/todos/1`).then(res => callback(res));
                //use post for actual calls
            }
        ], function(err, results) {
            // after all the api calls are finished
            const bitcoinRes = results[0];
            const ethereumRes = results[1];
        });
    }

    render() {

        var listItems = this.state.components[0].releaseOutputModels.map(function(component) {
            return (
                <tr>
                    <td>{component.componentName}</td>
                    <td>{component.prodDeployedState}</td>
                    <td>
                        <ul>
                            <li>release-1246</li>
                            <li>release-1247</li>
                            <li>release-1248</li>
                        </ul>
                    </td>
                    <td>{component.preProdDeploymentState}</td>
                    <CommitData  commitArr={component.commitIds}/>
                    <JiraDetail jiraArr={component.jiraDetails}/>
                    <td>
                     <CheckDeploy/>
                    </td>
                </tr>
            );
        });
        return (
            // <div className="container dashboard">
            //     <h4 className="center-align"><b>One Click Deployment</b></h4>
            //     <div className='row'>
            //         <div className="select-env input-field col s4">
            //         <Select value={this.state.value} onChange={this.handleChange.bind(this)}>
            //         <option value="ChooseYourEnvironment" selected>Choose your Environment</option>
            //         <option value="QA">QA</option>
            //         <option value="Production">Production</option>
            //         </Select>
            //     </div>
            //     </div>
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
            </div>
        );
    }
}

export { Dashboard };