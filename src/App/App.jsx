import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { messageService } from '@/_services';
import { HomePage } from '@/HomePage';
import {Dashboard} from '@/Dashboard';
import {Loader} from "../Loader/Loader";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            messages: []
        };
    }

    componentDidMount() {
        // subscribe to home component messages
        this.subscription = messageService.getMessage().subscribe(message => {
            if (message) {
                // add message to local state if not empty
                this.setState({ messages: [...this.state.messages, message] });
            } else {
                // clear messages when empty message received
                this.setState({ messages: [] });
            }
        });
    }

    componentWillUnmount() {
        // unsubscribe to ensure no memory leaks
        this.subscription.unsubscribe();
    }

    render() {
        const { messages } = this.state;
        return (
            <Router>
                <div className="main">
                                    {messages.map((message, index) =>
                                        <div key={index} className="alert alert-success">{message.text}</div>
                                    )}
                                    <Route exact path="/" component={HomePage} />
                                    <Route exact path="/dashboard" component={Dashboard} />
                                    <Route exact path={"/loader"} component={Loader} />
                </div>
            </Router>
        );
    }
}

export { App }; 