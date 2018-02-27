import React from 'react';
import {
    Card
} from 'antd';

import {BrowserRouter as Router, Route, Link} from "react-router-dom"

export default class PCNewsImageBlock extends React.Component {
    constructor() {
        super();
        this.state = {
            news: "",
            emptyText: "加载中..."
        }
    }

    componentWillMount() {
        var option = {
            method: "GET"
        };
        var url = "http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=" + this.props.type + "&count=" + this.props.count;
        fetch(url, option)
            .then(response => response.json())
            .then(json => {
                console.log(json);
                this.setState({
                    news: json,
                    emptyText: "暂无数据"
                });
            });
    }

    render() {
        const {news} = this.state;
        const newsList = news.length
            ? news.map((newsItem, index) => (
                <li key={index}>
                    <div>
                        <img src={newsItem.thumbnail_pic_s} alt="pic"/>
                        <h5>{newsItem.title}</h5>
                    </div>
                </li>
            ))
            : this.state.emptyText;
        return (
            <div className="pc_new_image_block">
                <Card title={this.props.title}>
                    <ul>
                        {newsList}
                    </ul>
                </Card>
            </div>
        );
    };
};