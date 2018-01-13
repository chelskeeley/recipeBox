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
            clickedSignIn: false,
        }
        this.signIn = this.signIn.bind(this)
        this.signOut = this.signOut.bind(this)
        this.signInClick = this.signInClick.bind(this)
    }
    
    componentDidMount(){
        const dbRef = firebase.database().ref();
        dbRef.on('value', (firebaseData) =>{
            const recipeArray = [];
            const recipeData = firebaseData.val();
            console.log(recipeData);
            for(let key in recipeData){
                recipeData[key].key = key;
                recipeArray.push(recipeData[key]);
            };
            this.setState({
                recipes: recipeArray,
            })
        })
    }

    signIn(e){
        e.preventDefault();
    }

    signOut(e){
        e.preventDefault();
    }

    signInClick(){
        this.setState({
            clickedSignIn: !this.state.clickedSignIn
        })
    }

    render(){
        let loginButton;
        let logInForm;
        if(this.state.clickedSignIn){
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
        }
        return (
            <div>
                <p>Welcome to Recipe Box! We are a hub to allow you to create a share recipes with your fellow users! Please <a href='javascript:void(0)' onClick={this.signInClick}>sign in</a> or create an account to create a recipe!</p>
                {loginButton}
                {logInForm}
            {/* have the featured reciped component here */}


            {/* recipe list here */}
            {this.state.recipes.map((item,i)=>{
                console.log(item)
                return <RecipeList data={item} key={item.key}/>
            })

            }
            </div>
        )
    }
}

export default Homepage