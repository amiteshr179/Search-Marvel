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
            checkedA: false,
            checkedB: false,
        };

    }

    componentDidMount() {
        this.subscription = messageService.getMessage().subscribe(result => {
            if (result) {
                // add message to local state if not empty
                this.setState({result: result});
            } else {
                // clear messages when empty message received
                this.setState({result: ''});
            }
        });
    }

    componentWillUnmount() {
        // unsubscribe to ensure no memory leaks
        this.subscription.unsubscribe();
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }
    handleCheck(name,event){
        this.setState({ [name]: event.target.checked });
    }
    deployChange(){
        async.parallel([
            function(callback) {
                axios.get(`https://jsonplaceholder.typicode.com/todos/1`).then(res => callback(res));
            },
            function(callback) {
                axios.get(`https://jsonplaceholder.typicode.com/todos/1`).then(res => callback(res));
            }
        ], function(err, results) {
            // after all the api calls are finished
            const bitcoinRes = results[0];
            const ethereumRes = results[1];
        });
    }

    render() {
        var checkboxStyle = {
            opacity:"inherit",
            pointerEvents:"all"
        }
        return (
            <div className="dashboard">
                <h4 className="center-align"><b>One Click Deployment</b></h4>
                <div className='row'>
                    <div className="select-env input-field col s4">
                    <Select value={this.state.value} onChange={this.handleChange.bind(this)}>
                    <option value="ChooseYourEnvironment" selected>Choose your Environment</option>
                    <option value="QA">QA</option>
                    <option value="Production">Production</option>
                    </Select>
                </div>
                </div>
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
                <tr>
                    <td>CS Email Service</td>
                    <td>release-1246</td>
                    <td>
                        <ul>
                            <li>release-1246</li>
                            <li>release-1247</li>
                            <li>release-1248</li>
                        </ul>
                    </td>
                    <td>release-1248</td>
                    <td className="commit-id">4846da19975faa67fbde65e3ca0dfdc7daff6e8f</td>
                    <td>BOL-3381</td>
                    <td>
                    <input type="checkbox" name="checkedA" style={checkboxStyle}
                        checked={this.state.checkedA} onChange={e => this.handleCheck('checkedA',e).bind(this)} value="checkedA"
                    />
                    </td>
                </tr>
                <tr>
                    <td>CS UI</td>
                    <td>release-1486</td>
                    <td>
                        <ul>
                            <li>release-1487</li>
                            <li>release-1488</li>
                        </ul>
                    </td>
                    <td>release-1488</td>
                    <td className="commit-id">ce2c71b40b82499f92b9661e87e35a2318d84ec6</td>
                    <td>BOL-3392</td>
                    <td>
                    <input type="checkbox" name="checkedB" style={checkboxStyle}
                        checked={this.state.checkedB} onChange={e => this.handleCheck('checkedB',e).bind(this)} value="checkedB"
                    />
                    </td>
                </tr>
                </tbody>
            </table>
            <div className="card-action right-align">
              <a className="user-login waves-effect waves-light btn" onClick={this.deployChange.bind(this)}><b>Deploy</b></a>
              </div>
            </section>
            </div>
        );
    }
}

export { Dashboard };