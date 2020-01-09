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

        // axios.post('http://localhost:5001/api/utility/release/ReleaseDetails',{username:this.props.location.aboutProps.name, password:this.props.location.aboutProps.password})
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
            {this.state.isLoaded ? 
                <section>
                    <div className="preloader-wrapper big active">
                        <div className="spinner-layer spinner-blue-only">
                        <div className="circle-clipper left">
                            <div className="circle"></div>
                        </div><div className="gap-patch">
                            <div className="circle"></div>
                        </div><div className="circle-clipper right">
                            <div className="circle"></div>
                        </div>
                        </div>
                    </div>
                </section> : <Dashboard /> }
            </div>
        );
    }

}



export {Loader}