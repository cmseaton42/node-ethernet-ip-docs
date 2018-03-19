import React, { Component } from "react";

import "./details.scss";

const details = [
    {
        title: "Customizable",
        image: require("../../../assets/images/custom.png"),
        info:
            "Ethernet-IP is a package designed to be simple and lightweight, providing a vehicle for you to implement anything that you can imagine.  Harnass the power of the Javascript open-source community by taking advantage of libraries like D3.js, react, or vue.js to create truly dynamic user-interfaces with beautiful visualizations or simply log values to the console for debugging. The choice is yours!"
    },
    {
        title: "SCADA Ready",
        image: require("../../../assets/images/scada.png"),
        info:
            "Use the Ethernet-IP module to build simple SCADA applications. Simply decide upon a handshaking schema you like and what data you want to pull. The database to store the data in is also up to you. Build a simple script and start capturing the data, it's that simple."
    },
    {
        title: "Fully Integratable",
        image: require("../../../assets/images/cloud.png"),
        info:
            "NodeJS was built with connectivity in mind. With Ethernet-IP along with existing NodeJS backend frameworks like ExpressJS, you can build an API to make your data available all over the world in no time via the web."
    }
];

const Details = props => {
    return <div className="details">{renderDetails(details)}</div>;
};

const renderDetails = details => {
    return details.map(detail => {
        const { title, image, info } = detail;

        return (
            <div className="detail" key={title}>
                <div className="detail-head">
                    <img src={image} alt={title} />
                </div>
                <h2>{title}</h2>
                <p>{info}</p>
            </div>
        );
    });
};

export default Details;
