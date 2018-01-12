import React from 'react';
import firebase from 'firebase';
import RecipeList from './recipeList.js';

class Homepage extends React.Component {
    constructor(){
        super();
        this.state = {
            uid: '',
            signedIn: false,
            recipes: [],
        }
        this.signIn = this.signIn.bind(this)
        this.signOut = this.signOut.bind(this)
    }

    signIn(e){
        e.preventDefault();
    }

    signOut(e){
        e.preventDefault();
    }

    render(){
        let loginButton;
        let logInForm;
        if (!this.state.signedIn){
            loginButton = (<button onClick={this.signIn}>Sign In</button>);
            logInForm = (
                <form action="">
                    <label htmlFor="email">Enter Email:</label>
                    <input type="email" id='email'/>
                    <label htmlFor="password">Enter Password:</label>
                    <input type="password" id='password'/>
                    <input type="submit"/>
                </form>
            )
            
        } else {
            loginButton = (<button onClick={this.signOut}>Sign Out</button>)
            logInForm = ''
            
        }
        return (
            <div>
                <p>Welcome to Recipe Box! We are a hub to allow you to create a share recipes with your fellow users! Please sign in or create and account to create a recipe!</p>
                {loginButton}
                {logInForm}
            {/* have the featured reciped component here */}

            {/* recipe list here */}
            <RecipeList data={this.state.recipes}/>
            </div>
        )
    }
}

export default Homepage