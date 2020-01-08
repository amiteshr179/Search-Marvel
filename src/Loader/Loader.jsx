import React from 'react';
import { messageService } from '../_services/message.service';
import {Dashboard} from "../Dashboard";
import axios from 'axios';

class Loader extends React.Component{
    constructor(props) {
        super(props);
        console.log(props.location.aboutProps);
        this.state ={isLoaded:true};

    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/todos/1')

        // axios.post('https://jsonplaceholder.typicode.com/todos/1',{username:"ramayana", password:""})
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