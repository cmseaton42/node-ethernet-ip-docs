import React, { Component } from "React";
import { NavLink } from "react-router-dom";

import "./navbar.scss";
import rj45 from "../../assets/images/rj45.png";

const Navbar = props => {
    const { nav, repo_link, version, content } = props;

    return (
        <div className="navbar">
            <div className="nav-logo">
                <img src={rj45} alt="RJ45" />
                <NavLink activeClassName="active" to="/" exact>
                    Ethernet-IP
                </NavLink>
            </div>
            <div className="nav-site-links">
                {nav.map(item => {
                    return (
                        <NavLink
                            key={item}
                            to={`/${item}/${content[item][0].files[0].name}`}
                            className="nav-link"
                            activeClassName="active"
                        >
                            {item}
                        </NavLink>
                    );
                })}
            </div>
            <div className="nav-info">
                <a href={repo_link} className="link">
                    GitHub
                </a>
                <span>{`v${version}`}</span>
            </div>
        </div>
    );
};

export default Navbar;
