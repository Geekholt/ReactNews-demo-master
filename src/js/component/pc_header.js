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
    Checkbox
} from 'antd';

const logo = require('../../images/logo.png')
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;

class PCHeader extends React.Component {

    constructor() {
        super();
        this.state = {
            current: ["top"],
            hasLogined: false,
            username: 'geekholt',
            loginModalVisible: false,
        }
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
                <Button type="ghost">退出</Button>
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
                              onClick={this.handleHeadMenuClick}>
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
                        <Tabs type="card">
                            <TabPane tab="登录" key="1">
                                <Form className="login-form">
                                    <FormItem label="用户名">
                                        <Input placeholder="请输入用户名" {...getFieldDecorator('r_username')}/>
                                    </FormItem>

                                    <FormItem label="密码">
                                        <Input type="password" placeholder="请输入密码" {...getFieldDecorator('r_password')}/>
                                    </FormItem>

                                    <FormItem>
                                        <Button type="primary" htmlType="submit">
                                            登录
                                        </Button>
                                    </FormItem>
                                </Form>
                            </TabPane>
                            <TabPane tab="注册" key="2">
                                <FormItem label="用户名">
                                    <Input placeholder="请输入用户名" {...getFieldDecorator('r_username')}/>
                                </FormItem>

                                <FormItem label="密码">
                                    <Input type="password" placeholder="请输入密码" {...getFieldDecorator('r_password')}/>
                                </FormItem>

                                <FormItem label="确认密码">
                                    <Input type="password"
                                           placeholder="请再次输出密码" {...getFieldDecorator('r_confirm_password')}/>
                                </FormItem>

                                <FormItem>
                                    <Button type="primary" htmlType="submit">
                                        注册
                                    </Button>
                                </FormItem>
                            </TabPane>
                        </Tabs>
                    </Modal>


                    <Col span={2}>
                        <Menu mode="horizontal" onClick={this.handleHeadMenuClick} selectedKeys={this.state.current}>
                            {userShow}
                        </Menu>
                    </Col>
                    <Col span={2}></Col>
                </Row>
            </header>
        );
    };

    handleHeadMenuClick = (e) => {
        this.setState({
            current: [e.key]
        });

        if (e.key === 'register') {
            this.setState({
                loginModalVisible: true
            });
        }
    }

    setModalVisible = (value) => {
        this.setState({
            loginModalVisible: value
        });
    }

}

export default PCHeader = Form.create({})(PCHeader);