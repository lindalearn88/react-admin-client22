import React, { Component } from 'react';
import './index.less';
import logo from '../../assests/images/logo.png'
import { Link, withRouter } from 'react-router-dom';
import { Menu } from 'antd';
import menuList from '../../config/menuConfig';
import { AppstoreOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;
class LeftNav extends Component {
    getMenuNodes = (menuList) => {
        return menuList.map(item => {
            if (item.children) {
                //查找一个与当前请求路径匹配的子item
                const path = this.props.location.pathname === '/admin' ? '/home' : this.props.location.pathname;

                const curItem = item.children.find(curtem => curtem.key === path);
                this.curkey = curItem ? curItem.key : '/home';
                return (
                    <SubMenu key={item.key} title={<span> <AppstoreOutlined /><span>{item.title}</span> </span>} >
                        {this.getMenuNodes(item.children)}
                    </SubMenu>
                )

            } else {

                return (
                    <Menu.Item key={item.key}>
                        <Link to={item.key} replace >
                            <AppstoreOutlined />
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item >
                )
            }
        })
    }
    componentWillMount() {
        this.MenuNodeslist = this.getMenuNodes(menuList);
        console.log(this.MenuNodeslist)
    }
    render() {
        //得到当前请求的路由路径
        const path = this.props.location.pathname === '/admin' ? '/home' : this.props.location.pathname;
        console.log(this.curItem)
        return (

            <div className="left_nav">
                <Link to="" className="left_nav_header">
                    <img src={logo} alt="" />
                    <h1>后台</h1>
                </Link>
                <Menu mode="inline" theme="dark" defaultOpenKeys={[this.curkey]} selectedKeys={[path]}>
                    {this.MenuNodeslist}

                </Menu>
            </div >


        )
    }
}
export default withRouter(LeftNav);