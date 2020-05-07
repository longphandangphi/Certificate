import React, { Component } from 'react'
import Sidebar from '../layout/Sidebar'
import CarouselSpecial from '../dashboard/CarouselSpecial'
import axios from 'axios'
import moment from 'moment'
import ReactHtmlParser from "react-html-parser"
import Navbar from '../layout/Navbar'

class ArticleDetail extends Component {
    state = {
        article : {}
    }
    componentDidMount() {
        const article_id = this.props.match.params.article_id;
        axios.get('https://localhost:44319/api/articles/'+ article_id)
            .then(res => {
                const article = res.data;
                this.setState({ article });
            })
    }
    render() {
        const { article } = this.state;
        return (
            <div>
                <Navbar/>
                <div className="container">

                    <CarouselSpecial/>

                    <div className="row">
                        
                        <div className="col l9 m12 s12">
                            <h5 style={{fontWeight: "bold", color: "#0473b3"}}>{ article.title }</h5>
                                <i className="material-icons grey-text">today</i>&nbsp;
                                <span className="grey-text">
                                    {moment(article.createOn)
                                        .add(7, "h")
                                        .format("HH:mm DD-MM-YYYY")}
                                </span>
                            <div>{ReactHtmlParser(article.detail)}</div>
                        </div>
                        <div className="col l3 s12">
                            <Sidebar />
                        </div>
                    </div>
                </div>
            </div>
            
        )
    }
}
export default ArticleDetail
