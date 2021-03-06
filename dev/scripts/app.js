import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router, Route, Link, Switch, Redirect
} from 'react-router-dom';
import firebase from 'firebase';

import Header from './components/header.js';
import Homepage from './components/homePage.js';
import AddRecipe from './components/addRecipe.js';
import EachRecipe from './components/eachRecipe.js';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyBvWnA0ZVeRC_JmsluWB1-rwp_B-teo-7Y",
  authDomain: "recipebox-7e786.firebaseapp.com",
  databaseURL: "https://recipebox-7e786.firebaseio.com",
  projectId: "recipebox-7e786",
  storageBucket: "gs://recipebox-7e786.appspot.com/",
  messagingSenderId: "601312177941"
};
firebase.initializeApp(config);


class App extends React.Component {
  constructor(){
    super();
    this.state = {
      uid: ''
    }
    this.getUid = this.getUid.bind(this)
  }

  getUid(id){
    this.setState({
      uid: id
    })
  }

    render() {
      return (
        <Router>
          <div>
            <Header getUid={this.getUid}/>
            <main>
              <div className='wrapper'>
                <Switch>
                  <Route exact path='/' component={Homepage}></Route>
                  <Route exact path='/addrecipe/:uid' component={AddRecipe}></Route>
                  <Route exact path='/:title/:key' component={EachRecipe}></Route>
                </ Switch>
              </div>
            </main>
            <footer>
              <div className="wrapper">
                <p>&copy; 2018 Chelsea Keeley</p>
              </div>
            </footer>
        </div>
          </Router>
      )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
