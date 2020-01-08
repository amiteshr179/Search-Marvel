import React from 'react';
import { Loader } from '../Loader/Loader';
import {Link} from "react-router-dom";

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            password: ''
        };
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    render() {
        return (
            <div class="login-section">
            <section className="center-section login">
            
            <div className="card">
              <div className="card-content">
              <h5 className="center-align"><b>Sign In</b></h5>
              <div className="row">
                <form className="col s12">
                    <div className="input-field">
                        <i className="material-icons prefix">account_circle</i>
                        <input id="icon_prefix" type="text" className="validate" name="name" value={this.state.name} onChange={e => this.handleChange(e)}/>
                        <label htmlFor="icon_prefix">User Name</label>
                    </div>
                    <div className="input-field">
                        <i className="material-icons prefix">lock_outline</i>
                        <input id="icon_telephone" type="password" className="validate" name="password" value={this.state.password} onChange={e => this.handleChange(e)}/>
                        <label htmlFor="icon_telephone">Password</label>
                    </div>
                </form>
            </div>

              </div>
              <div className="card-action right-align">
                  <Link className="user-login waves-effect waves-light btn" to={{pathname:'/loader',aboutProps:{username:this.state.name, password:this.state.password}}}>Login</Link>
              </div>
            </div>
            </section>
            </div>
        );
    }
}

export { HomePage };