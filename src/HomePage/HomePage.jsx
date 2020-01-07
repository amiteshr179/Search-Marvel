import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';

import { messageService } from '@/_services';

class HomePage extends React.Component {
    sendMessage() {
        // send message to subscribers via observable subject
        messageService.sendMessage('Message from Home Page Component to App Component!');
    }

    clearMessages() {
        // clear messages
        messageService.clearMessages();
    }

    render() {
        return (
            <div>
            <section className="login">
            {/* <h4 className="center-align">Login Form</h4> */}
            <div className="card">
              <div className="card-content">

              <div className="row">
                <form className="col s12">
                    <div className="input-field">
                        <i className="material-icons prefix">account_circle</i>
                        <input id="icon_prefix" type="text" class="validate" />
                        <label for="icon_prefix">User Name</label>
                    </div>
                    <div className="input-field">
                        <i className="material-icons prefix">lock_outline</i>
                        <input id="icon_telephone" type="tel" class="validate" />
                        <label for="icon_telephone">Password</label>
                    </div>
                </form>
            </div>

              </div>
              <div className="card-action right-align">
              <a className="user-login waves-effect waves-light btn">Login</a>
              </div>
            </div>
            </section>
            <section className="card dashboard">
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
                    <td>release-1244</td>
                    <td>
                        <ul>
                            <li>release-1245</li>
                            <li>release-1246</li>
                            <li>release-1247</li>
                            <li>release-1248</li>
                            <li>release-1249</li>
                        </ul>
                    </td>
                    <td>release-1249</td>
                    <td>4846da19975faa67fbde65e3ca0dfdc7daff6e8f</td>
                    <td>BOL-3381</td>
                    <td>
                    <Checkbox
                        defaultChecked
                        value="secondary"
                        color="primary"
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                    />
                    </td>
                </tr>
                <tr>
                    <td>CS UI</td>
                    <td>release-1284</td>
                    <td>
                        <ul>
                            <li>release-1285</li>
                            <li>release-1286</li>
                            <li>release-1287</li>
                            <li>release-1288</li>
                        </ul>
                    </td>
                    <td>release-1288</td>
                    <td>ce2c71b40b82499f92b9661e87e35a2318d84ec6</td>
                    <td>BOL-3392</td>
                    <td>
                    <Checkbox
                        value="secondary"
                        color="primary"
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                    />
                    </td>
                </tr>
                </tbody>
            </table>
            </section>
            </div>
        );
    }
}

export { HomePage };