import React, { Component } from "react";
import { NavLink, Route, Switch, Redirect } from "react-router-dom";

import "./document-area.scss";
import "./code.scss";
import "./markdown.scss";

export default class DocumentArea extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hide_menu: true
        };
    }

    render() {
        const { content, docRoute } = this.props;
        const { hide_menu } = this.state;

        return (
            <div className="document-area">
                <div className={`sidebar ${hide_menu ? "hide" : ""}`}>
                    <div
                        className={`sidebar-button ${hide_menu ? "hide" : ""}`}
                        onClick={e => {
                            e.preventDefault();
                            this.setState({ hide_menu: true });
                        }}
                    >
                        <i className="fas fa-bars" />
                    </div>
                    {content.map(cat => {
                        const { files, name } = cat;

                        return (
                            <div className="sidebar-nav">
                                <div key={name} className="sidebar-item">
                                    <h3>{name}</h3>
                                    <ul>
                                        {files.map(file => {
                                            const { name } = file;

                                            return (
                                                <li key={name}>
                                                    <NavLink
                                                        to={`/${docRoute}/${name}`}
                                                        activeClassName="active"
                                                        onClick={e => {
                                                            this.setState({
                                                                hide_menu: true
                                                            });
                                                        }}
                                                    >
                                                        {name}
                                                    </NavLink>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="content-area">
                    <Switch>
                        {content.map(cat => {
                            const { files, name } = cat;

                            return files.map(file => {
                                const { name, html } = file;
                                return (
                                    <Route
                                        key={name}
                                        path={`/${docRoute}/${name}`}
                                        component={() => <HtmlRenderer html={html} />}
                                    />
                                );
                            });
                        })}
                        <Redirect to={`/${docRoute}/${content[0].files[0].name}`} />
                    </Switch>
                </div>
                <div
                    className={`content-show-button ${!hide_menu ? "hide" : ""}`}
                    onClick={e => {
                        e.preventDefault();
                        this.setState({ hide_menu: false });
                    }}
                >
                    {" "}
                    <i className="fas fa-bars" />
                </div>
            </div>
        );
    }
}

const HtmlRenderer = ({ html }) => {
    return <div dangerouslySetInnerHTML={{ __html: html }} className="content-html" />;
};
