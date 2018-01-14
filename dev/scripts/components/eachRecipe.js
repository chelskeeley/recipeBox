import React from 'react';
import firebase from 'firebase';

class EachRecipe extends React.Component{
    constructor(){
        super();
        this.state = {
            recipe: {
                title: '',
                description: '',
                directions: [],
                ingredients: [],
                tags: [],
                url: '',
                uid: ''
            },
            currentUser: ''
        }
        this.getRecipe = this.getRecipe.bind(this);
        this.deleteRecipe = this.deleteRecipe.bind(this);
    }

    componentDidMount(){
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({
                    currentUser: user.uid
                })
            } else {
                this.setState({
                    currentUser: ''
                })
            }
        })
        this.getRecipe();
        
    }
    
    getRecipe(){
        const recipeId = this.props.match.params.key;
        const dbRef = firebase.database().ref(recipeId);
        dbRef.on('value', (recipe) =>{
            const thisRecipe = recipe.val();
            this.setState({
                recipe: {
                    title: thisRecipe.title,
                    description: thisRecipe.description,
                    directions: thisRecipe.directions,
                    ingredients: thisRecipe.ingredients,
                    tags: thisRecipe.tags,
                    url: thisRecipe.image,
                    uid: thisRecipe.uid
                }
            })
        })
    }

    deleteRecipe(){
        const dbRef = firebase.database().ref(this.props.match.params.key);
        dbRef.remove();
        this.props.history.push('/');

    }

    render(){
        let deleteRecipe;
        if (this.state.currentUser === this.state.recipe.uid){
            deleteRecipe = (
                <div>
                    <p>You are the creator of this recipe! Thank you so much for your contribution to Recipe Box! But if for some reason you would like to remove this recipe, click the delete button below.</p>
                    <p><span>Warning: </span>These recipes CANNOT be recovered, so make certain you are sure!</p>
                    <button onClick={this.deleteRecipe} >Delete Recipe</button>
                </div>
            )
        } else {
            deleteRecipe = ''
        }
        return (
            <div>
                <h2>{this.state.recipe.title}</h2>
                <div className="recipe__image">
                    <img src={`${this.state.recipe.url}`} alt=""/>
                </div>
                <p>{this.state.recipe.description}</p>
                <h3>Ingredients</h3>
                <ul>
                    {this.state.recipe.ingredients.map((ingred, i)=>{
                        return (
                            <li key={i}>{ingred}</li>
                        )
                    })}
                </ul>
                <h3>Directions</h3>
                <ol>
                    {this.state.recipe.directions.map((dir,i)=>{
                        return (
                            <li key={i}>{dir}</li>
                        )
                    })}
                </ol>
                {deleteRecipe}
            </div>
        )
    }
}

export default EachRecipe