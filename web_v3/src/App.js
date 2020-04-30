import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Dashboard from './components/dashboard/Dashboard'
import ArticleDetail from './components/projects/ArticleDetail'
import ArticleListOfCategory from './components/projects/ArticleListOfCategory'
import ArticleListOfAllCategory from './components/projects/ArticleListOfAllCategory'
import SignIn from './components/auth/SignIn'

class App extends Component {
  render(){
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          
          <Switch>
            <Route exact path="/" component={Dashboard}/>
            <Route path="/signin" component={SignIn} />
            <Route path="/article/:article_id" component={ArticleDetail}/>
            <Route exact path="/category/all" component={ArticleListOfAllCategory}/>
            <Route path="/category/:category_id" component={ArticleListOfCategory}/>
            
          </Switch>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
