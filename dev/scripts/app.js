import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router, Route, Link
} from 'react-router-dom';
import Header from './components/header.js'

class App extends React.Component {
    render() {
      return (
        <Router>
          <div>
            <Header />
              <Switch>
                <Route exact path='/' component='HomePage'></Route>
              </ Switch>
            <footer>
              <p>&copy; 2018 Chelsea Keeley</p>
            </footer>
        </div>
          </Router>
      )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
