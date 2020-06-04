import React, { Component } from 'react'
import CarouselSpecial from '../dashboard/CarouselSpecial'
import Sidebar from '../layout/Sidebar'
import axios from 'axios'
import Article from './Article'
import Pagination from '../others/pagination/Pagination'
import {pagination} from '../../constants/app.constant'
import Navbar from '../layout/Navbar'

export default class ArticleListOfCategory extends Component {
    state = {
        articles: [],
        title: "",
        pageIndex: 1, 
        totalPages: null,
        hasResults: null,
        params: {
            offset: pagination.initialPage,
            limit: pagination.defaultTake,
            isDesc: true
        }

    }

    handlePageClick = e => {
        this.setState(
          {
            params: {
              ...this.state.params,
              offset: e.selected + 1
            },
          },
          () => this.fetchData()
        );
      };

    componentDidMount() {
        this.fetchData();
    }
    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.match.params.category_id !== prevProps.match.params.category_id) {
            this.setState({
                params: {
                    ...this.state.params,
                    offset: 1
                },
                pageIndex:1
            })
            setTimeout(() => {
                this.fetchData()
            },100)
        } 
      }
    
      fetchData = () => {

        const category_id = this.props.match.params.category_id;

        const params = this.state.params;

        axios.get(`https://localhost:44319/api/articles/categories/`+ category_id, { params })
          .then(res => {
            const articles = res.data.sources;
            const totalPages = res.data.totalPages;
            const pageIndex = res.data.pageIndex;
            const hasResults = articles && articles.length > 0;
            this.setState({ articles, totalPages, pageIndex, hasResults });
        });

        axios.get(`https://localhost:44319/api/articleCategories`)
          .then(res => {
            const title = res.data.sources.find(x => x.id === category_id).name;
            this.setState({ title });
        });
      }
 
    render() {
        const { articles, totalPages, pageIndex, hasResults} = this.state;
        return (
            <div>
                <Navbar />
                <div className="container">
 
                    <CarouselSpecial/>

                    <div className="row">
                        
                        <div className="col l9 m12 s12">
                            <h5 className="center" >
                                <i className="material-icons green-text" >notifications_active</i>&nbsp;
                                {this.state.title}
                            </h5>
                            {
                                articles.map(article => 
                                    <Article article={article} key={article.id}/>
                                )
                            }
                            {hasResults && totalPages > 1 && (
                                <Pagination
                                    initialPage={0}
                                    totalPages={totalPages}
                                    forcePage={pageIndex - 1}
                                    pageRangeDisplayed={2}
                                    onPageChange={this.handlePageClick}
                                />
                            )}
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
