import React from 'react';
import { Loader } from '../Loader/Loader'

class HomePage extends React.Component {
    render() {
        return (
            <div>
            <section className="center-section login">
            {/* <h4 className="center-align">Login Form</h4> */}
            <div className="card">
              <div className="card-content">

              <div className="row">
                <form className="col s12">
                    <div className="input-field">
                        <i className="material-icons prefix">account_circle</i>
                        <input id="icon_prefix" type="text" className="validate" />
                        <label htmlFor="icon_prefix">User Name</label>
                    </div>
                    <div className="input-field">
                        <i className="material-icons prefix">lock_outline</i>
                        <input id="icon_telephone" type="tel" className="validate" />
                        <label htmlFor="icon_telephone">Password</label>
                    </div>
                </form>
            </div>

              </div>
              <div className="card-action right-align">
                  <a className="user-login waves-effect waves-light btn" href="loader">Login</a>
              </div>
            </div>
            </section>
            </div>
        );
    }
}

export { HomePage };