import React from 'react';
import firebase from 'firebase';
import RecipeList from './recipeList.js';

class Homepage extends React.Component { 
    constructor(){
        super();
        this.state = {
            recipes: [],
            uid: ''
        }
    }
    
    componentDidMount(){

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({
                    uid: user.uid
                })
            } else {
                this.setState({
                    uid: ''
                })
            }
        })
        
        const dbRef = firebase.database().ref();
        dbRef.on('value', (firebaseData) =>{
            const recipeArray = [];
            const recipeData = firebaseData.val();
            for(let key in recipeData){
                recipeData[key].key = key;
                recipeArray.push(recipeData[key]);
            };
            this.setState({
                recipes: recipeArray,
            })
        })
    }

    render(){

        return (
            <div>
                <h2>Welcome to Recipe Box!</h2>
                <p>We are a hub to allow you to create and share recipes with your fellow food-lovers! Anyone can browse the recipes, but in order to contribute to Recipe Box, please sign in or create an account!</p>
                <ul className='recipeTiles'>
                {/* recipe list here */}
                {this.state.recipes.map((item,i)=>{
                    return <RecipeList data={item} key={item.key} uid={this.state.uid}/>
                    })

                }
                </ul>
            </div>
        )
    }
}

export default Homepage