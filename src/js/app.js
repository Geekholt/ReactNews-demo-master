import React from 'react';
import ReactDOM from 'react-dom';
import Button from 'antd/lib/button';
import 'antd/dist/antd.css';

export default class App extends React.Component {
    render() {
        return (
            <div>
                <div className="App">
                    <Button type="primary">Button</Button>
                </div>
            </div>
        );
    };
};