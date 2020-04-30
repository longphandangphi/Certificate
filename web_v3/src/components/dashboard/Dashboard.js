import React, { Component } from 'react'
//import M from "materialize-css"
import CarouselSpecial from "./CarouselSpecial";
import NotificationList from '../projects/NotificationList'
import ArticleList from '../projects/ArticleList'
import Sidebar from '../layout/Sidebar';
import axios from 'axios';

class Dashboard extends Component {
    state = {
        articles: [],
    }
    componentDidMount() {
        const params = {
            isDesc: true
        };
        axios.get(`https://localhost:44319/api/articles`, { params })
          .then(res => {
            const articles = res.data.sources;
            this.setState({ articles });
            console.log("GET DONE")
        });
    }
    render() {
        // let collapsible = document.querySelectorAll(".collapsible");
        // M.Collapsible.init(collapsible, {});
        const { articles } = this.state;
        const notifications = articles.filter(article => {
            if(article.articleCategory.id === '7d2f6696-339f-452e-871b-894640b2426d'){
                return true;
            } else { return false }
        }).slice(0,5);
        return (

            <div className="container">
            
                <CarouselSpecial/>

                <div className="row">
                    <div className="col l4 m4 s12">
                        <NotificationList articles={notifications}/>
                    </div>

                    <div className="col l5 m8 s12">
                        <ArticleList articles={ this.state.articles.slice(0,6) }/>
                    </div>
                    
                    <div className="col l3 s12">
                        <Sidebar />
                    </div>
                </div>
            </div>
        )
    }
}

export default Dashboard
