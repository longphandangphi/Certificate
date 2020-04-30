import React, { Component } from 'react'
import Notification from './Notification'
import 'antd/dist/antd.css';
import { Divider } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom'


export default class NotificationList extends Component {
    render() {
        const {articles} = this.props;
        console.log(this.props);
        return (
            <div>
                <h5 className="center" >
                    <i className="material-icons blue-text" >notifications_active</i>&nbsp;Thông báo
                </h5>
                {
                    articles.map((article) => 
                        <Notification article={article} key={article.id}/>
                    )
                }
                <Divider orientation="right">
                    <NavLink to="/category/7d2f6696-339f-452e-871b-894640b2426d">Xem tất cả&nbsp;<RightOutlined style={{fontSize: 10}}/></NavLink>
                </Divider>
            </div>
        )
    }
}
