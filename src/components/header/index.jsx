import React, { Component } from 'react';
import './index.less';
import { reqWeather } from '../../api/index';
import { formateDate } from '../../utils/dateUtils';
import memoryUtils from '../../utils/memoryUtils';
import menuConfig from '../../config/menuConfig'
import { withRouter } from 'react-router-dom';
import storageUtils from '../../utils/storageUtils'

import LinkButton from '../link-button'
// import { logout } from '../../redux/actions'
import { Modal } from 'antd'
class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTime: formateDate(new Date().currentTime),
            dayPictureUrl: '',
            weather: ''
        }
    }


    getWeather = async () => {
        const { dayPictureUrl, weather } = await reqWeather('深圳');

        this.setState({ dayPictureUrl, weather })
    }
    getSysTime = () => {
        this.intervalId = setInterval(() => {
            this.setState({ sysTime: formateDate(Date.now()) })
        }, 1000)
    }
    getTitle = (path) => {
        let title;
        menuConfig.forEach(menu => {
            if (menu.key === path) {
                title = menu.title;
            } else if (menu.children) {
                menu.children.forEach(item => {
                    if (path.indexOf(item.key) === 0) {
                        title = item.title;
                    }
                })
            }
        })
        return title;
    }
    /*
退出登陆
 */
    logout = (e) => {
        // 显示确认框
        e.preventDefault();
        Modal.confirm({
            content: '确定退出吗?',
            onOk: () => {
                clearInterval(this.intervalId);
                console.log('OK', this);
                memoryUtils.user = {};
                storageUtils.removeUser();
                debugger
                this.props.history.replace("/login")

                // this.props.logout()
            }
        })

    }
    componentDidMount() {
        this.getSysTime();
        this.getWeather();
    }
    UNSAFE_componentWillMount() {
        // 清除定时器 
        clearInterval(this.intervalId);
    }
    render() {
        const { sysTime, dayPictureUrl, weather } = this.state;
        const pathname = this.props.location.pathname;
        const itemtitle = this.getTitle(pathname);
        const username = memoryUtils.user.username;
        // const pathname = this.props.location.path;


        return (
            <div className="header">
                <div className="header-top">
                    <span>欢迎,{username}</span>
                    <LinkButton onClick={this.logout}>退出</LinkButton>
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left">
                        <span>{itemtitle}</span>
                    </div>
                    <div className="header-bottom-right">
                        <span>{sysTime}</span>
                        <img src={dayPictureUrl} alt="weather" />
                        <span>{weather}</span>
                    </div>
                </div>
            </div >
        )
    }
}
export default withRouter(Header)