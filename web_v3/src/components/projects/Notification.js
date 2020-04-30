import React, { Component } from 'react'
import moment from "moment"
import { NavLink } from 'react-router-dom'

export default class Notification extends Component {
    render() {
        const { article } = this.props;
        return (
            <div>
                <div className="row">
                    <div className="col s12">
                        <div className="card">
                            <div className="card-content">
                                <span className="card-title">
                                <i className="material-icons blue-text" >today</i>&nbsp;
                                    <span>{moment(article.createOn)
                                    .add(7, "h")
                                    .format("DD-MM-YYYY")}</span>
                                </span>
                                <NavLink to={"/article/"+article.id}><p className="grey-text" style={{fontWeight:"bolder"}}>{article.title}</p></NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
