import React, { Component } from "react";
import tree from "../.docthat";

export default class App extends Component {
    constructor() {
        super();

        this.state = { tree };
    }

    render() {
        return <h1>hello world</h1>
    }
}
