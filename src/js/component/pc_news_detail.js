import React from 'react';
import {
    Row,
    Col
} from 'antd';
import PCHeader from "./pc_header";
import PCNewsImageBlock from "./pc_news_image_block";

export default class PCNewsDetail extends React.Component {
    constructor() {
        super();
        this.state = {
            newsItem: "",
        }
    }

    createMarkup() {
        return {__html: this.state.newsItem.pagecontent};
    }

    componentDidMount() {
        var option = {
            method: "GET"
        };
        var url = "http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=" + this.props.match.params.uniquekey;
        fetch(url, option)
            .then(response => response.json())
            .then(json => {
                console.log(json);
                this.setState({newsItem: json});
                document.title = this.state.newsItem.title + " - React News | React 驱动的新闻平台";
            });
    }

    render() {

        return (
            <div>
                <PCHeader/>
                <Row className="news_detail">
                    <Col span={2}>

                    </Col>
                    <Col span={15}>
                        <div class="articleContainer" dangerouslySetInnerHTML={this.createMarkup()}></div>
                    </Col>

                    <Col span={5}>
                        <PCNewsImageBlock  count={36} type="top" bordered="false"/>
                    </Col>

                    <Col span={2}>

                    </Col>
                </Row>
            </div>
        );
    };

};