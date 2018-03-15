import React from "react";
import ReactDOM from "react-dom";
import html from "./test.md";

const title = "My Minimal React Webpack Babel Setup";

ReactDOM.render(<div dangerouslySetInnerHTML={{__html: html}}></div>, document.getElementById("app"));
