import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Footer from './components/layout/Footer'
import Dashboard from './components/dashboard/Dashboard'
import ArticleDetail from './components/projects/ArticleDetail'
import CertificateStatus from './components/projects/CertificateStatus'
import ArticleListOfCategory from './components/projects/ArticleListOfCategory'
import ArticleListOfAllCategory from './components/projects/ArticleListOfAllCategory'
import SignIn from './components/auth/SignIn'
import Extracurricular from './components/projects/Extracurricular'
import StandardOfCertificate from './components/projects/StandardOfCertificate'
import Report from './components/projects/Report'

class App extends Component {
  render(){
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Dashboard}/>
            <Route exact path="/signin" component={SignIn} />
            <Route path="/article/:article_id" component={ArticleDetail}/>
            <Route exact path="/category/all" component={ArticleListOfAllCategory}/>
            <Route path="/category/:category_id" component={ArticleListOfCategory}/>
            <Route path="/certificateStatus" component={CertificateStatus}/>
            <Route path="/extracurricular" component={Extracurricular}/>
            <Route path="/standardOfCertificate" component={StandardOfCertificate}/>
            <Route path="/report" component={Report}/>
          </Switch>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
