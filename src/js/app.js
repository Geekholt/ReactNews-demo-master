import React from 'react';
import 'antd/dist/antd.css';
import PCHeader from "./component/pc_header";
import "../css/pc.css";

export default class App extends React.Component {
    render() {
        return (
            <div>
               <PCHeader/>
            </div>
        );
    };
};