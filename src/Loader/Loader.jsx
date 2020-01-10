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
        //fetch('https://jsonplaceholder.typicode.com/todos/1')

        axios.post('https://api-int.dit.connectcdk.com/api/dm-cdk-cnst-utility-assets/v1/api/utility/release/ReleaseDetails',{username:this.props.location.aboutProps.username, password:this.props.location.aboutProps.password})
            .then(response => {
            console.log(response);
                this.setState({isLoaded: false});
                messageService.sendMessage(response.data);
            })
    }
    render() {


        return(
            <div>
            {this.state.isLoaded ? 

<section class="loader-ani">
<div class="preloader-wrapper big active">
<div class="spinner-layer spinner-blue">
<div class="circle-clipper left">
<div class="circle"></div>
</div><div class="gap-patch">
<div class="circle"></div>
</div><div class="circle-clipper right">
<div class="circle"></div>
</div>
</div>

<div class="spinner-layer spinner-red">
<div class="circle-clipper left">
<div class="circle"></div>
</div><div class="gap-patch">
<div class="circle"></div>
</div><div class="circle-clipper right">
<div class="circle"></div>
</div>
</div>

<div class="spinner-layer spinner-yellow">
<div class="circle-clipper left">
<div class="circle"></div>
</div><div class="gap-patch">
<div class="circle"></div>
</div><div class="circle-clipper right">
<div class="circle"></div>
</div>
</div>

<div class="spinner-layer spinner-green">
<div class="circle-clipper left">
<div class="circle"></div>
</div><div class="gap-patch">
<div class="circle"></div>
</div><div class="circle-clipper right">
<div class="circle"></div>
</div>
</div>
</div>
</section> : <Dashboard credentials={{"username":this.props.location.aboutProps.username, "password":this.props.location.aboutProps.password}}/> }
            </div>
        );
    }

}



export {Loader}