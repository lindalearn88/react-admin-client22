import React, { Component } from 'react';
import memoryUtils from '../../utils/memoryUtils';
import { Redirect } from 'react-router';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import { Layout } from 'antd';
import LeftNav from '../../components/left_nav';
import Header from '../../components/header';
import Home from '../home/home';
import Category from '../category/category';
import Product from '../product/product';
import Role from '../role/role';
import User from '../user/user';
import Bar from '../charts/bar';
import Line from '../charts/line';
import Pie from '../charts/pie';
// import NotFound from '../not-found/not-found'
import Order from '../order/order'
const { Footer, Sider, Content } = Layout;

export default class Admin extends Component {
    componentDidMount() {
        const user = memoryUtils.user;
        console.log(user)
    }

    render() {
        const user = memoryUtils.user;
        if (!user || !user._id) return <Redirect to="/login"></Redirect>;
        return (
            <Router>
                <Layout style={{ height: '100%' }}>
                    <Sider>
                        <LeftNav></LeftNav>
                    </Sider>
                    <Layout>
                        <Header>header</Header>
                        <Content style={{ backgroundColor: "#fff", margin: '20px' }}>

                            <Switch>
                                <Redirect exact from='/' to='/home' />
                                <Route path='/home' component={Home} />
                                <Route component={Category} path='/category' />
                                <Route path='/product' component={Product} />
                                <Route path='/role' component={Role} />
                                <Route path='/user' component={User} />
                                <Route path='/charts/bar' component={Bar} />
                                <Route path='/charts/line' component={Line} />
                                <Route path='/charts/pie' component={Pie} />
                                <Route path="/order" component={Order} />
                                {/* <Route component={NotFound} /> 上面没有一个匹配, 直接显示 */}
                            </Switch>

                        </Content>
                        <Footer style={{ textAlign: 'center', color: "#ccc" }}>right sidebar</Footer>
                    </Layout>
                </Layout>
            </Router>
        )

    }
}