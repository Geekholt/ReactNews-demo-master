import React from 'react';

export default class MobileFooter extends React.Component {

    constructor() {
        super();
        this.state = {
            current: "top"
        }
    }

    render() {
        return (
            <footer className="footer">
                <span>&copy;&nbsp;2016 ReactNews.All Rights Reserved.</span>
            </footer>
        );
    };
};