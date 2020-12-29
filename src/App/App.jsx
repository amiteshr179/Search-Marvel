import React from 'react';
import SearchBox from "@/SearchBox/SearchBox";
import axios from 'axios';
import md5 from 'js-md5';
import ComicsList from "@/Comics/ComicsList";
import SeriesList from "@/Series/SeriesList";
import EventsList from "@/Events/EventsList";
import StoriesList from "@/Stories/StoriesList";

function GenerateList(props) {
    return (
        <div>
            <ComicsList stats={props.comics} />
            <SeriesList stats={props.series} />
            <EventsList stats={props.events} />
            <StoriesList stats={props.stories} />
        </div>
    );
}


function ErrorMessage(props) {

    return (
        <div>
            {
                props.error === "nameStartsWith cannot be blank if it is set" ? <p className="error">Search Field cannot be blank</p> : <p className="error">{props.error}</p>
            }
        </div>
    );
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.prevProcessQueue = [];
        this.latestSearches=[];
        this.state = {
            searchResults: [],
            searchField: "Adam",
            error: "",
            latestFiveSearches:[]
        }
    }
    componentDidUpdate(prevProps,prevstate){
        if(prevstate.searchField !== this.state.searchField){
            const PUBLIC_KEY = '2fdc8e58c05af18b87b272850654d4db'; // your public key
            const PRIVATE_KEY = '74db4c237da9e87ee6b55751c7216d1fcb284e6c';
            const ts = Number(new Date());
            const hash = md5.create();
            const searchField = this.state.searchField;
            const latestSearches =[];
            if(this.latestSearches.length>4){
                this.latestSearches.shift();
            }
            this.latestSearches.push(this.state.searchField);
            this.setState({latestFiveSearches: latestSearches});
            hash.update(ts + PRIVATE_KEY + PUBLIC_KEY);
            hash.hex()

            axios.get(`https://gateway.marvel.com/v1/public/characters?nameStartsWith=${searchField}&ts=${ts}&orderBy=name&limit=10&apikey=${PUBLIC_KEY}&hash=${hash}`)
                .then(response => {
                    var searchResults= response.data.data.results;
                    this.setState({searchResults});
                }).catch(error => {
                    var errorGot = error.response.data.status;
                    this.setState({error:errorGot});
            })
        }
    }

    handleChange = (e) =>{
        this.prevProcessQueue.push(e.target.value);
        clearTimeout(this.timerId);
        this.timerId = setTimeout(function (self){
            if(self.prevProcessQueue.length !==0){
                var searchStr= self.prevProcessQueue.pop(self.prevProcessQueue.length-1);
                self.setState({searchField:searchStr});
            }
        },2000,this);
    }
    render() {
        var  comicsGen =[];
        var storiesGen = [];
        var seriesGen=[];
        var eventsGen= [];
        if(this.state.searchResults) {
            this.state.searchResults.map((result) => {result.comics.items.map((item)=> {comicsGen.push(item)} )});
            this.state.searchResults.map(result => {result.stories.items.map((item)=> {storiesGen.push(item)} )});
            this.state.searchResults.map(result => {result.series.items.map((item)=> {seriesGen.push(item) })});
            this.state.searchResults.map(result => {result.events.items.map((item)=> {eventsGen.push(item) })});
        }


        return (
            <div>
                Search Marvel Content
                <SearchBox placeholder="Enter movie name" handleChange={this.handleChange} />
                {
                    this.state.error ? <ErrorMessage error={this.state.error} /> : <GenerateList comics={comicsGen} series={seriesGen} stories={storiesGen} events={eventsGen} />
                }

            </div>
        );
    }
}

export { App }; 
