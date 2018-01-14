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
                url: ''
            }
        }
        this.getRecipe = this.getRecipe.bind(this)
    }

    componentDidMount(){
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
                    url: thisRecipe.image
                }
            })
        })
    }

    render(){
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


            </div>
        )
    }
}

export default EachRecipe