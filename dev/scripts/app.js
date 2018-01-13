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
  storageBucket: "",
  messagingSenderId: "601312177941"
};
firebase.initializeApp(config);


class App extends React.Component {
    render() {
      return (
        <Router>
          <div>
            <Header />
            <main>
              <Switch>
                <Route exact path='/' component={Homepage}></Route>
                <Route exact path='/addrecipe' component={AddRecipe}></Route>
                <Route exact path='/:title' component={EachRecipe}></Route>
              </ Switch>
            </main>
            <footer>
              <p>&copy; 2018 Chelsea Keeley</p>
            </footer>
        </div>
          </Router>
      )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
