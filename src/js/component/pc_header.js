import React from 'react';
import {
    Row,
    Col,
    Menu,
    Icon,
    Button,
    Modal,
    Tabs,
    Input,
    Form,
    Checkbox,
    message
} from 'antd';
import register from "../../registerServiceWorker";
import 'whatwg-fetch';

const logo = require('../../images/logo.png');
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;

class PCHeader extends React.Component {
    constructor() {
        super();
        this.state = {
            current: ["top"],
            hasLogined: false,
            username: '',
            userId: '',
            loginModalVisible: false,
            action: 'login'
        }
    }

    componentWillMount() {
        if (localStorage.userid != '') {
            this.setState({
                hasLogined: true,
                username: localStorage.userNickName,
                userid: localStorage.userid
            });
        }
    }

    handleHeadMenuClick(e) {
        this.setState({
            current: [e.key]
        });

        if (e.key === 'register') {
            this.setState({
                loginModalVisible: true
            });
        }
    }

    setModalVisible(value) {
        this.setState({
            loginModalVisible: value
        });
    }

    onTabChange(key) {
        console.log(key);
        this.setState({
            action: key
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            var options = {
                method: 'GET'
            };
            var url = "http://newsapi.gugujiankong.com/Handler.ashx?action=" + this.state.action
                + "&username=" + values.l_username + "&password=" + values.l_password
                + "&r_userName=" + values.r_username + "&r_password="
                + values.r_password + "&r_confirmPassword="
                + values.r_confirm_password

            console.log(values);
            console.log("url:" + url);

            fetch(url, options)
                .then(response => response.json())
                .then(json => {
                    console.log(json);
                    if (json != null) {
                        if (this.state.action === 'login') {
                            this.setState({
                                hasLogined: true,
                                username: json.NickUserName,
                                userId: json.UserId
                            });
                            localStorage.userid = json.UserId;
                            localStorage.userNickName = json.NickUserName;
                        }
                        this.setModalVisible(false);
                        message.success('登录成功');
                    } else {
                        message.error('用户名或密码错误');
                    }
                });
        });
    }

    logout() {
        this.setState({
            hasLogined: false,
        });
        localStorage.userid = '';
        localStorage.userNickName = '';
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const userShow = this.state.hasLogined
            ?
            <Menu.Item key="logout">
                <Button type="primary">{this.state.username}</Button>
                &nbsp;&nbsp;
                <Button type="dashed">个人中心</Button>
                &nbsp;&nbsp;
                <Button type="ghost" onClick={this.logout.bind(this)}>退出</Button>
            </Menu.Item>
            :
            <Menu.Item key="register">
                <Icon type="appstore"/> 注册/登录
            </Menu.Item>

        return (
            <header>
                <Row>
                    <Col span={2}></Col>
                    <Col span={4}>
                        <a href="/" className="logo">
                            <img src={logo} alt="logo"/>
                            <span>ReactNews</span>
                        </a>
                    </Col>
                    <Col span={14}>
                        <Menu mode="horizontal" selectedKeys={this.state.current}
                              onClick={this.handleHeadMenuClick.bind(this)}>
                            <Menu.Item key="top">
                                <Icon type="appstore"/> 头条
                            </Menu.Item>

                            <Menu.Item key="shehui">
                                <Icon type="appstore"/> 社会
                            </Menu.Item>

                            <Menu.Item key="guonei">
                                <Icon type="appstore"/> 国内
                            </Menu.Item>

                            <Menu.Item key="guoji">
                                <Icon type="appstore"/> 国际
                            </Menu.Item>
                            <Menu.Item key="yule">
                                <Icon type="appstore"/> 娱乐
                            </Menu.Item>

                            <Menu.Item key="tiyu">
                                <Icon type="appstore"/> 体育
                            </Menu.Item>

                            <Menu.Item key="keji">
                                <Icon type="appstore"/> 科技
                            </Menu.Item>

                            <Menu.Item key="shishang">
                                <Icon type="appstore"/> 时尚
                            </Menu.Item>
                        </Menu>
                    </Col>


                    <Modal
                        title="用户中心"
                        visible={this.state.loginModalVisible}
                        onOk={() => this.setModalVisible(false)}
                        onCancel={() => this.setModalVisible(false)}
                        okText="关闭"
                        cancelText="取消">
                        <Tabs type="card" onChange={this.onTabChange.bind(this)}>
                            <TabPane tab="登录" key="login">
                                <Form className="login-form" onSubmit={this.handleSubmit.bind(this)}>
                                    <FormItem label="用户名">
                                        {getFieldDecorator(`l_username`)(
                                            <Input placeholder="请输入用户名"/>
                                        )}
                                    </FormItem>

                                    <FormItem label="密码">
                                        {getFieldDecorator(`l_password`)(
                                            <Input type="password" placeholder="请输入密码"/>
                                        )}
                                    </FormItem>

                                    <FormItem>
                                        <Button type="primary" htmlType="submit">
                                            登录
                                        </Button>
                                    </FormItem>
                                </Form>
                            </TabPane>
                            <TabPane tab="注册" key="register">
                                <Form className="register-form" onSubmit={this.handleSubmit.bind(this)}>
                                    <FormItem label="用户名">
                                        {getFieldDecorator(`r_username`)(
                                            <Input placeholder="请输入用户名"/>
                                        )}
                                    </FormItem>

                                    <FormItem label="密码">
                                        {getFieldDecorator(`r_password`)(
                                            <Input placeholder="请输入密码" type="password"/>
                                        )}
                                    </FormItem>

                                    <FormItem label="确认密码">
                                        {getFieldDecorator(`r_confirm_password`)(
                                            <Input placeholder="请再次输入密码" type="password"/>
                                        )}
                                    </FormItem>

                                    <FormItem>
                                        <Button type="primary" htmlType="submit">
                                            注册
                                        </Button>
                                    </FormItem>
                                </Form>
                            </TabPane>
                        </Tabs>
                    </Modal>

                    <Col span={2}>
                        <Menu mode="horizontal" onClick={this.handleHeadMenuClick.bind(this)}
                              selectedKeys={this.state.current}>
                            {userShow}
                        </Menu>
                    </Col>
                    <Col span={2}></Col>
                </Row>
            </header>
        );
    };


}

export default PCHeader = Form.create({})(PCHeader);