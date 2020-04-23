import React, { Component } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Single from './components/Single';
import Page404 from './components/Page404';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

class App extends Component {
  render(){
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/404' component={Page404}/>
            <Route path='/about' component={About}/>
            <Route path='/contact' component={Contact}/>
            <Route path='/:single_id' component={Single}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
