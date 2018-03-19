import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import config from "../.docthat";

import Navbar from "./components/navbar";
import LandingPage from "./views/landing-page";
import Footer from "./components/footer";

import "./style.scss";

export default class App extends Component {
    constructor() {
        super();

        this.state = config;
    }

    render() {
        return (
            <Router>
                <Fragment>
                    <Navbar {...this.state} />
                    <Route to="/" exact component={() => <LandingPage {...this.state} />} />
                    <Footer {...this.state} />
                </Fragment>
            </Router>
        );
    }
}
