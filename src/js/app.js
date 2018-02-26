import React from 'react';
import  "../css/pc.css";
import "../css/mobile.css"
import 'antd/dist/antd.css';
import MediaQuery from 'react-responsive';
import PCIndex from "./component/pc_index";
import MobileIndex from "./component/mobile_index";

export default class App extends React.Component {
    render() {
        return (
            <div>
                <MediaQuery query='(min-device-width:1224px)'>
                    <PCIndex/>
                </MediaQuery>
                <MediaQuery query='(max-device-width:1224px)'>
                    <MobileIndex/>
                </MediaQuery>
            </div>
        );
    };
};