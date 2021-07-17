import React, { Component } from 'react';
import './App.css';
import ReactGA from 'react-ga'

class Home extends Component {

    async componentDidMount() {
        ReactGA.initialize('UA-202461931-1');
        ReactGA.pageview('/home');
    }

    render() {
        return (
            <div className="App">
                <h2>Home page</h2>
            </div>
        );
    }
}

export default Home;