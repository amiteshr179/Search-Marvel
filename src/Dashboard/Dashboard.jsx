import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';

class Dashboard extends React.Component {
    render() {
        return (
            <div className="dashboard">
                <h4 className="center-align"><b>One Click Deployment</b></h4>
                <div className='row'>
                <div className="select-env input-field col s4">
                    <select>
                    <option value="" selected>Choose your Environment</option>
                    <option value="1">QA</option>
                    <option value="2">Production</option>
                    </select>
                    <label>Environment</label>
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
                    <Checkbox
                        value="secondary"
                        color="primary"
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                    />
                    </td>
                </tr>
                </tbody>
            </table>
            <div className="card-action right-align">
              <a className="user-login waves-effect waves-light btn" href="dashboard"><b>Deploy</b></a>
              </div>
            </section>
            </div>
        );
    }
}

export { Dashboard };