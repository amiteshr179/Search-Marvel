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

export { Dashboard };