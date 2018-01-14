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
            {/* recipe list here */}
            {this.state.recipes.map((item,i)=>{
                return <RecipeList data={item} key={item.key} uid={this.state.uid}/>
                })

            }
            </div>
        )
    }
}

export default Homepage