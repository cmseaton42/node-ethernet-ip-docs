import React, { Component, Fragment } from "react";

import Cover from "./cover";
import Details from "./details";

const LandingPage = props => {
    return (
        <Fragment>
            <Cover {...props} />
            <Details />
        </Fragment>
    );
};

export default LandingPage;