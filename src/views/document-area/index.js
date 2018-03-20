import React, { Component } from "react";
import { Link, Route } from "react-router-dom";

import "./document-area.scss";

const DocumentArea = props => {
    const { content, docRoute } = props;

    return (
        <div className="document-area">
            <div className="sidebar">
                {content.map(cat => {
                    const { files, name } = cat;

                    return (
                        <div key={name} className="sidebar-item">
                            <h3>{name}</h3>
                            <ul>
                                {files.map(file => {
                                    const { name } = file;

                                    return (
                                        <li key={name}>
                                            <Link to={`/${docRoute}/${name}`}>{name}</Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    );
                })}
            </div>
            <div className="content-area">
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
            </div>
        </div>
    );
};

const HtmlRenderer = ({ html }) => {
    return <div dangerouslySetInnerHTML={{ __html: html }} className="content-html" />;
};

export default DocumentArea;
