import React, { Component } from 'react';
import './App.css';
import ReactGA from "react-ga";

class PaymentPage extends Component {
    state = {
        loading: false
    };


    async componentDidMount() {
        ReactGA.initialize('UA-202461931-1');
        ReactGA.pageview('/payment');
    }

    onClick = () => {
        this.setState({loading: true})
        ReactGA.event({category: 'User', action: 'Payment click'});
        setTimeout(
            () => this.setState({ loading: false }),
            1000
        );
    }

    render() {
        return (
            <div className="App">
                <h2>Payment page</h2>
                <div>
                    <button onClick={this.onClick} disabled={this.state.loading}>Send payment</button>
                </div>
                <div>
                    {
                        this.state.loading ? <p>Waiting for response...</p> : <p>Payment has been sent</p>
                    }
                </div>
            </div>
        );
    }
}

export default PaymentPage;