import React from 'react';

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
            // <div>
            //     <h2>React + RxJS Component Communication</h2>
            //     <button onClick={this.sendMessage} className="btn btn-primary">Send Message</button>
            //     <button onClick={this.clearMessages} className="btn btn-secondary">Clear Messages</button>                
            // </div>
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
              <a className="waves-effect waves-light btn">Login</a>
              </div>
            </div>
            </section>
        );
    }
}

export { HomePage };