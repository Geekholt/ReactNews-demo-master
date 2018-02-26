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

const logo = require('../../images/logo.png');
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;

class MobileHeader extends React.Component {

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
        const userShow = this.state.hasLogined ?
            <Icon type="mail"/>
            :
            <Icon type="setting" onClick={() => this.setModalVisible(true)}/>;
        return (
            <div id="mobileHeader">
                <header>
                    <img src={logo} alt="logo"/>
                    <span>ReactNews</span>
                    {userShow}
                </header>

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
            </div>
        );
    };
};

export default MobileHeader = Form.create({})(MobileHeader);