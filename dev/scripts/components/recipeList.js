import React from 'React';
import {
    BrowserRouter as Router, Route, Link, Switch, Redirect
} from 'react-router-dom';

class RecipeList extends React.Component {
    constructor(){
        super();
        
    }



    render(){
        
        return(
            <li onClick={this.toRecipe}>
                <Link to={`/${this.props.data.title}/${this.props.data.key}`}>  
                    <h3>{this.props.data.title}</h3>
                </ Link>
            </li>
        )
    }
}

export default RecipeList