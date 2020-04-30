import React, { Component } from 'react'
import moment from "moment"
import { NavLink } from 'react-router-dom'

export default class Article extends Component {
    render() {
        const { article } = this.props;
        return (
            <div>
                <div className="card-panel z-depth-1">
                    <div className="row valign-wrapper">
                        <div className="col s3">
                            <NavLink to={"/article/" + article.id}>
                                <img src={article.picture} alt="" className="responsive-img"/> 
                            </NavLink>
                        </div>
                        <div className="col s9">
                            <NavLink to={"/article/" + article.id}>
                                <span className="black-text" style={{ lineHeight:1, fontSize: 18 }}>
                                    {article.title}
                                </span>
                            </NavLink>
                            <p style={{margin:3}}>
                                <i className="tiny material-icons grey-text">access_alarm</i>&nbsp;
                                <span className="grey-text">
                                    {moment(article.createOn)
                                        .add(7, "h")
                                        .format("DD-MM-YYYY")}
                                </span>
                            </p>
                        </div>
                    </div>  
                </div>
            </div>
        )
    }
}
