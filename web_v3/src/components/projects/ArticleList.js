import React, { Component } from 'react'
import Article from './Article'
import 'antd/dist/antd.css';
import { Divider } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom'

export default class ArticleList extends Component {
    render() {
        return (
            <div>
                <h5 className="center">
                    <i className="material-icons green-text ">public</i>&nbsp;Tin tức & Sự kiện
                </h5>
                {
                    this.props.articles.map(article => 
                        <Article article={article} key={article.id}/>
                    )
                }
                <Divider orientation="right">
                    <NavLink to="/category/all">Xem tất cả&nbsp;<RightOutlined style={{fontSize: 10}}/></NavLink>
                </Divider>
            </div>
        )
    }
}
