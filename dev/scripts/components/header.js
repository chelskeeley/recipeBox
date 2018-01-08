import React from 'react';
import {
    BrowserRouter as Router, Route, Link, Switch
} from 'react-router-dom';
import Homepage from './homePage.js';

import AddRecipe from './addRecipe.js';


const Header = () =>{
        return (
            <div>
                <header>
                    <h1>Recipe Box</h1>
                </header>
                <Link to='/addrecipe'>Add Recipe</Link>
                <Link to='/'>Home</Link>
            </div>
        )
}

export default Header