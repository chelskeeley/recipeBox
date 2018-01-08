import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router, Route, Link, Switch
} from 'react-router-dom';
import Header from './components/header.js';
import Homepage from './components/homePage.js';
import AddRecipe from './components/addRecipe.js';


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
