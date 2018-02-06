import React from 'react';
import {Row, Col, Menu, Icon} from 'antd';
import SubMenu from "antd/es/menu/SubMenu";

const logo = require('../../images/logo.png')

export default class MobileHeader extends React.Component {

    constructor() {
        super();
        this.state = {
            current: "top"
        }
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