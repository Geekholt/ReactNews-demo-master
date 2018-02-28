import React from 'react';
import {
    Card
} from 'antd';

import {Link} from "react-router-dom"

export default class PCNewsBlock extends React.Component {
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
                    <Link to={`details/${newsItem.uniquekey}`}>
                        <p>{newsItem.title}</p>
                    </Link>
                </li>
            ))
            : this.state.emptyText;
        return (
            <div className="pc_new_block">
                <Card>
                    <ul>
                        {newsList}
                    </ul>
                </Card>
            </div>
        );
    };
};