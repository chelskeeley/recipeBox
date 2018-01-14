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
            <Link to={`/${this.props.data.title}/${this.props.data.key}`}>  
                <li onClick={this.toRecipe}>
                    <h3>{this.props.data.title}</h3>
                </li>
            </ Link>
        )
    }
}

export default RecipeList