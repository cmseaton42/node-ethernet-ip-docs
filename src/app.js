import React, { Component } from "react";
import tree from "../.docthat";

import "./style.scss";

export default class App extends Component {
    constructor() {
        super();

        this.state = { tree };
    }

    render() {
        return <div>{ JSON.stringify(this.state.tree) }</div>;
    }
}
