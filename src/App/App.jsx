import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

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

    render() {
        return (
            <Router>
                <div className="main">
                                    <Route exact path="/" component={HomePage} />
                                    <Route exact path="/dashboard" component={Dashboard} />
                                    <Route exact path={"/loader"} component={Loader} />
                </div>
            </Router>
        );
    }
}

export { App }; 