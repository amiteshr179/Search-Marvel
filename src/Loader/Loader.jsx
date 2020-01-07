import React from 'react';
import { messageService } from '../_services/message.service';
import {Dashboard} from "../Dashboard";
import {Redirect} from 'react-router-dom';
class Loader extends React.Component{
    constructor(props) {
        super(props);
        this.state ={isLoaded:true};

    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/todos/1')
            .then(response => response.json())
            .then(json => {
                if (json){
                this.setState({isLoaded: false});
                messageService.sendMessage({isLoaded: true,items: result.items});
            }
            })
    }
    render() {


        return(
            <div>
            {this.state.isLoaded ? <section>waiting</section> : <Dashboard /> }
            </div>
        );
    }

}



export {Loader}