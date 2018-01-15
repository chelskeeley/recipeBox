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
                    <div className="tileImage">
                    {/* {console.log(this.props.data)} */}
                        <img src={`${this.props.data.image}`} alt="" />
                    </div>
                </ Link>
            </li>
        )
    }
}

export default RecipeList