import React, { Component } from "react";
import { NavLink, Route, Switch, Redirect } from "react-router-dom";

import "./document-area.scss";

export default class DocumentArea extends Component {
    constructor(props) {
        super(props);

        this.state = { }
    }

    render() {
        const { content, docRoute } = this.props;
    
        return (
            <div className="document-area">
                <div className="sidebar">
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
            </div>
        );
    }
};

const HtmlRenderer = ({ html }) => {
    return <div dangerouslySetInnerHTML={{ __html: html }} className="content-html" />;
};

