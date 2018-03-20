import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./cover.scss";
import logo from "../../../assets/images/logo-grey.png";
import RJ45 from "../../../assets/images/rj45.png";

const Cover = props => {
    const { name, content, nav } = props;

    return (
        <div className="cover">
            <div className="cover-greeting">
                <div className="cover-head">
                    <img src={RJ45} alt="logo" />
                    <h1>{name}</h1>
                </div>
                <p>
                    {
                        "A simple interface for communicating with Allen Bradly controllers via Ethernet/IP"
                    }
                </p>
                <Link
                    className="cover-button"
                    to={`/${nav[0]}`}
                >
                    {"Learn More"}
                </Link>
            </div>
            <div className="cover-logo">
                <img src={logo} alt="logo" />
            </div>
        </div>
    );
};

export default Cover;
