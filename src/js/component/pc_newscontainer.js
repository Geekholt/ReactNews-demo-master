import React from 'react';
import {
    Row,
    Col,
    Tabs,
    Carousel
} from 'antd';
import PCNewsBlock from "./pc_news_block";
import PCNewsImageBlock from "./pc_news_image_block";

const TabPane = Tabs.TabPane;

export default class PCNewsContainer extends React.Component {
    render() {
        var settings = {
            dots: true,
            infinite: true,
            speed: 500,
            autoplaySpeed: 3000,
            slidesToShow: 1,
            autoplay: true,
            dotsClass: "slick-dots"
        };
        const carousel1 = require("../../images/carousel_1.jpg");
        const carousel2 = require("../../images/carousel_2.jpg");
        const carousel3 = require("../../images/carousel_3.jpg");
        const carousel4 = require("../../images/carousel_4.jpg");
        return (
            <div>
                <Row>
                    <Col span={2}/>
                    <Col span={20}>

                        <div className="container">
                            <div>
                                <div className="leftContainer">
                                    <Carousel className="carousel" {...settings}>
                                        <div><img alt="轮播图01" src={carousel1}/></div>
                                        <div><img alt="轮播图02" src={carousel2}/></div>
                                        <div><img alt="轮播图03" src={carousel3}/></div>
                                        <div><img alt="轮播图04" src={carousel4}/></div>
                                    </Carousel>
                                    <div className="leftImageBlock">
                                        <PCNewsImageBlock title="国际新闻" count={6} type="guoji" bordered="false"/>
                                    </div>
                                </div>

                                <Tabs className="tabs_news">
                                    <TabPane key="1" tab="头条新闻">
                                        <PCNewsBlock count={20} type="top" width="100%" bordered="false"/>
                                    </TabPane>
                                    <TabPane key="2" tab="国际">
                                        <PCNewsBlock count={20} type="guoji" width="100%" bordered="false"/>
                                    </TabPane>
                                </Tabs>
                            </div>

                            <div className="inlineImageBlock">
                                <PCNewsImageBlock title="娱乐新闻" count={12} type="yule" bordered="false"/>
                            </div>

                        </div>

                    </Col>
                    <Col span={2}/>
                </Row>>
            </div>
        );
    };
};