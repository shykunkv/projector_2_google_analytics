import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import PaymentPage from "./PaymentPage";
import Home from "./Home";

export default function App() {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/home">Home</Link>
                        </li>
                        <li>
                            <Link to="/payment">Payment page</Link>
                        </li>
                    </ul>
                </nav>

                <Switch>
                    <Route path="/home">
                        <Home />
                    </Route>
                    <Route path="/payment">
                        <PaymentPage />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}