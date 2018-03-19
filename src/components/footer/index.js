import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

import logo from "../../assets/images/rj45.png";
import "./footer.scss";

const Footer = props => {
    const { name, nav, content } = props;

    return (
        <div className="footer">
            <div className="footer-content">
                <div className="footer-brand">
                    <img src={logo} alt="logo" />
                    <p>{name}</p>
                </div>
                <div className="footer-nav">{renderNav(content)}</div>
            </div>
        </div>
    );
};

const renderNav = content => {
    return Object.keys(content).map(key => {
        return (
            <div className="footer-nav-group" key={key}>
                <h2>{key}</h2>
                <ul>
                    {content[key].map(cat => {
                        const { files, name } = cat;
                        return files.length > 0 ? (
                            <li key={name}>
                                <Link to={`/${key}/${files[0].name}`} key={name}>
                                    {name}
                                </Link>
                            </li>
                        ) : null;
                    })}
                </ul>
            </div>
        );
    });
};

export default Footer;
