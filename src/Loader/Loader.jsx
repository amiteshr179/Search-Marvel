import React from 'react';
import { messageService } from '../_services/message.service';
import {Dashboard} from "../Dashboard";
import axios from 'axios';

class Loader extends React.Component{
    constructor(props) {
        super(props);
        this.state ={isLoaded:true};

    }

    componentDidMount() {
        //fetch('https://jsonplaceholder.typicode.com/todos/1')

        axios.post('https://api-int.dit.connectcdk.com/api/dm-cdk-cnst-utility-assets/v1/api/utility/release/ReleaseDetails',{username:this.props.location.aboutProps.username, password:this.props.location.aboutProps.password})
            .then(response => {
                this.setState({isLoaded: false});
                messageService.sendMessage(response.data);
            })
    }
    render() {


        return(
            <div>
            {this.state.isLoaded ? 

<section className="loader-ani">
<div className="preloader-wrapper big active">
<div className="spinner-layer spinner-blue">
<div className="circle-clipper left">
<div className="circle"></div>
</div><div className="gap-patch">
<div className="circle"></div>
</div><div className="circle-clipper right">
<div className="circle"></div>
</div>
</div>

<div className="spinner-layer spinner-red">
<div className="circle-clipper left">
<div className="circle"></div>
</div><div className="gap-patch">
<div className="circle"></div>
</div><div className="circle-clipper right">
<div className="circle"></div>
</div>
</div>

<div className="spinner-layer spinner-yellow">
<div className="circle-clipper left">
<div className="circle"></div>
</div><div className="gap-patch">
<div className="circle"></div>
</div><div className="circle-clipper right">
<div className="circle"></div>
</div>
</div>

<div className="spinner-layer spinner-green">
<div className="circle-clipper left">
<div className="circle"></div>
</div><div className="gap-patch">
<div className="circle"></div>
</div><div className="circle-clipper right">
<div className="circle"></div>
</div>
</div>
</div>
</section> : <Dashboard credentials={{"username":this.props.location.aboutProps.username, "password":this.props.location.aboutProps.password}}/> }
            </div>
        );
    }

}



export {Loader}