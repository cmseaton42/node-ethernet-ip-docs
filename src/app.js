import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import config from "../.docthat";

import Navbar from "./components/navbar";
import LandingPage from "./views/landing-page";
import Footer from "./components/footer";
import DocumentArea from "./views/document-area";

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
                    <Route path="/" exact component={() => <LandingPage {...this.state} />} />
                    {this.state.nav.map(item => {
                        const obj = this.state.content[item];
                        return (
                            <Route
                                key={item}
                                path={`/${item}`}
                                component={() => <DocumentArea docRoute={item} content={obj} />}
                            />
                        );
                    })}
                    <Footer {...this.state} />
                </Fragment>
            </Router>
        );
    }
}
