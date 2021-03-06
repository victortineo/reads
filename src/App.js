import React, { Component } from 'react';
import './App.css';
import {connect} from 'react-redux'
import Home from './components/Home'
import CategoryView from './components/CategoryView'
import Header from './components/Header'
import PostPage from './components/PostPage'
import NewPost from './components/NewPost';
import NewComment from './components/NewComment';
import {handleInitialData} from './actions/shared'
import { BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom'
import error404 from './components/error404';
import SearchForm from './components/SearchForm';
import SearchPage from './components/SearchPage';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())  
  }
  render() {
    return (
      <Router>
        <React.Fragment>
          <Header />
          <div className="App">
            <SearchForm />
            <Link className="newPost" to="/new/">Novo Post</Link>
            <Switch>
              <Route path='/' exact component={Home} />
              <Route path='/new/' exact component={NewPost} />
              <Route path='/edit/post/:id' exact component={NewPost} />
              <Route path='/edit/comment/:id' exact component={(props) => <NewComment {...props} editing={true}/>} />
              <Route path='/search/:query' exact component={SearchPage} />
              <Route path='/:category' exact component={CategoryView} />
              <Route path='/:category/:id' exact component={PostPage} />
              <Route component={error404} />
            </Switch>
          </div>
        </React.Fragment>
      </Router>
    );
  }
}

export default connect()(App);