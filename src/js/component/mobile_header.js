import React from 'react';

const logo = require('../../images/logo.png')

export default class MobileHeader extends React.Component {

    constructor() {
        super();
    }

    render() {
        return (
            <div id="mobileHeader">
                <header>
                    <img src={logo} alt="logo"/>
                    <span>ReactNews</span>
                </header>
            </div>
        );
    };
};