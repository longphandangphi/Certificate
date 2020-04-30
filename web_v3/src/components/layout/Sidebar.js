import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios'

export default class Sidebar extends Component {
    state = {
        articleCategories: [],
    }
    componentDidMount() {
        const params = {
            query: "",
        };
        axios.get(`https://localhost:44319/api/articleCategories`, { params })
          .then(res => {
            const articleCategories = res.data.sources;
            this.setState({ articleCategories });
        });
    }
    render() {
        const { articleCategories } = this.state;
        return (
            <div>
                <ul className="collection with-header">
                    <li className="collection-header"><h5><i className="material-icons orange-text left">school</i>Sinh viên</h5></li>
                    <li className="collection-item"><NavLink to="sass.html">Hoạt động ngoại khóa</NavLink></li>
                    <li className="collection-item"><NavLink to="sass.html">Điều kiện xét tốt nghiệp</NavLink></li>
                </ul>
                
                <ul className="collection with-header">
                    <li className="collection-header"><h5><i className="material-icons orange-text left">local_library</i>Bài viết</h5></li>
                    { articleCategories.map(cate => 
                        <li className="collection-item " key={cate.id}><NavLink to={"/category/"+ cate.id}>{cate.name}</NavLink></li>
                    )}
                </ul>
            </div>
        )
    }
}
