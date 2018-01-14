import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import {
        BrowserRouter as Router, Route, Link, Switch, Redirect
    } from 'react-router-dom';
import ImageUploader from 'react-firebase-image-uploader';

class AddRecipe extends React.Component {
    constructor(){
        super();
        this.state = {
            title: '',
            titleInput: '',
            tags: [],
            tagInput: '',
            description: '',
            descriptionInput: '',
            ingredients: [],
            ingredientsInput: '',
            quantityInput: '',
            measurementInput: '',
            addDirectionsInput: '',
            directions: [],
            directionInput: '',
            titleAdded: false,
            uid: '',
            signedIn: false,
            image: {
                avatar: '', 
                isUploading: false,
                progress: 0,
                avatarURL: ''
            }
        }
        this.handleChange = this.handleChange.bind(this);
        this.titleClick = this.titleClick.bind(this);
        this.clearTitle = this.clearTitle.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.tagClick = this.tagClick.bind(this);
        this.clearTag = this.clearTag.bind(this);
        this.descriptionClick = this.descriptionClick.bind(this);
        this.descriptionX = this.descriptionX.bind(this);
        this.ingredientsClick = this.ingredientsClick.bind(this);
        this.clearIngredient = this.clearIngredient.bind(this);
        this.directionsClick = this.directionsClick.bind(this);
        this.clearDirection = this.clearDirection.bind(this);
        this.handleUploadStart = this.handleUploadStart.bind(this);
        this.handleProgress = this.handleProgress.bind(this);
        this.handleUploadError = this.handleUploadError.bind(this);
        this.handleUploadSuccess = this.handleUploadSuccess.bind(this);
    }

    componentDidMount(){
        this.setState({
            uid: this.props.match.params.uid
        });
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({
                    signedIn: true,
                })
            } else {
                this.setState({
                    signedIn: false,
                })
            }
        })
        
    }

    //saves input in text areas into state
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    // FUNCITONS FOR TITLE PREVIEW
    titleClick(e){
        e.preventDefault();
        
        this.setState({
            titleAdded: true,
            title: this.state.titleInput,
            titleInput: ''
        });
        
    }

    clearTitle(){
        this.setState({
            titleAdded: false,
            title: ''
        });
    }

    // FUNCTIONS FOR TAGS PREVIEW
    tagClick(e) {
        e.preventDefault();
        const tagArray = Array.from(this.state.tags);
        tagArray.push(this.state.tagInput);
        this.setState({
            tags: tagArray,
            tagInput: '',
        })
    }

    //removes each tag from state on clicking the x
    clearTag(i){
        let updatedTags = Array.from(this.state.tags);
        updatedTags.splice(i, 1);
        this.setState({
            tags: updatedTags
        })
    }

    //FUNCTIONS FOR DESCRIPTION PREVIEW
    descriptionClick(e){
        e.preventDefault();
        this.setState({
            description: this.state.descriptionInput,
            descriptionInput: ''
        })
    }

    //removes description on X click
    descriptionX(){
        this.setState({
            description: ''
        })
    }

    //FUNCTIONS FOR INGREDIENTS PREVIEW
    ingredientsClick(e){
        e.preventDefault();
        let newIngredients = Array.from(this.state.ingredients);
        newIngredients.push(`${this.state.quantityInput} ${this.state.measurementInput} ${this.state.ingredientsInput}, ${this.state.addDirectionsInput}`);
        this.setState({
            ingredients: newIngredients,
            quantityInput: '',
            measurementInput: '',
            ingredientsInput: '',
            addDirectionsInput: '',
        })
    }

    clearIngredient(i){
        let updatedIngredients = Array.from(this.state.ingredients);
        updatedIngredients.splice(i, 1);
        this.setState({
            ingredients: updatedIngredients
        })
    }

    //FUNCTIONS FOR DIRECTIONS PREVIEW
    directionsClick(e){
        e.preventDefault();
        let newDirection = Array.from(this.state.directions);
        newDirection.push(this.state.directionInput);
        this.setState({
            directions: newDirection,
            directionInput: '',
        })
    }

    clearDirection(i){
        let updatedDirections = Array.from(this.state.directions);
        updatedDirections.splice(i,1);
        this.setState({
            directions: updatedDirections,
        })
    }

    //FIREBASE FUNCTIONS
    //form submit
    handleSubmit(e) {
        e.preventDefault();
        const dbRef = firebase.database().ref();
        let recipeObject = {
            title: this.state.title,
            tags: this.state.tags,
            description: this.state.description,
            ingredients: this.state.ingredients,
            directions: this.state.directions,
            image: this.state.image.avatarURL,
            uid: this.state.uid
        };
        dbRef.push(recipeObject);
        this.setState({
            title: '',
            titleInput: '',
            tags: [],
            tagInput: '',
            description: '',
            descriptionInput: '',
            ingredients: [],
            ingredientsInput: '',
            quantityInput: '',
            measurementInput: '',
            addDirectionsInput: '',
            directions: [],
            directionInput: '',
            titleAdded: false,
            uid: '',
            image: {
                avatar: '',
                isUploading: false,
                progress: 0,
                avatarURL: ''
            }
        });
        this.props.history.push('/');
    }

    //IMAGE UPLOAD FUNCTIONS
    handleUploadStart(){
        this.setState({ 
            image: {
                isUploading: true, 
                progress: 0
            }
        })
    }

    handleProgress(progress){
        this.setState({ 
            image: {
                progress
            }
         })
    }

    handleUploadError(error){
        this.setState({
            image: {
                isUploading: false
            }
         });
        console.error(error);
    }

    handleUploadSuccess(filename){
        this.setState({ 
            image: {
                avatar: filename, 
                progress: 100,
                isUploading: false 
            }
        })
        // firebase.storage().ref('images').getDownloadURL().then(url => this.setState({ image: { avatarURL: url } }));
        firebase.storage().ref('images').child(filename).getDownloadURL().then(url => this.setState({
            image:{ avatarURL: url }}));
    };


    render(){
        //display logic for recipe title
        let titleContent = '';
        let titleX = '';
        let titleValue = '';
        if(this.state.titleAdded){
            titleContent = this.state.title;
            titleX = 'X',
            titleValue = ''
        } else {
            titleValue = this.state.title;
        }

        let mainContent;
            if (this.state.signedIn) {
                mainContent = (
                    <div>
                        <form action="" onSubmit={this.handleSubmit} className="addRecipeForm">
                            {/* TITLE */}
                            <StepTitles stepNum='1' stepName='Recipe Title' description='' inputId='title' showLabel={true} />
                            <input type="text" id='title' name='titleInput' onChange={this.handleChange} value={this.state.titleInput} ref={el => this.inputValue = el} />
                            <button onClick={this.titleClick}>Add</button>
                            <div>
                                <p>{titleContent}</p>
                                <div onClick={this.clearTitle}>{titleX}</div>
                            </div>

                            {/* IMAGES */}
                            <StepTitles stepNum='2' stepName='Upload Photo' description='Upload an image to add a photo to your post!' inputId='' showLabel={true} />
                            {/* add image drag and drop functionality here */}
                            <ImageUploader
                                name="avatar"
                                storageRef={firebase.storage().ref('images')}
                                onUploadStart={this.handleUploadStart}
                                onUploadError={this.handleUploadError}
                                onUploadSuccess={this.handleUploadSuccess}
                                onProgress={this.handleProgress}
                            />
                            {this.state.image.isUploading &&
                                <p>Progress: {this.state.image.progress}</p>
                            }
                            {this.state.image.avatarURL ? (
                                <div className="imagePreview">
                                    <img src={this.state.image.avatarURL} />
                                </div>)
                                : null
                            }




                            {/* TAGS */}
                            <StepTitles stepNum='3' stepName='Recipe Tags' description='Add tags to your post to help search for your recipe! (eg. Chicken, Dessert, Vegetarian etc)' inputId='tags' showLabel={true} />
                            <input type="text" id="tags" name='tagInput' value={this.state.tagInput} onChange={this.handleChange} />
                            <button onClick={this.tagClick}>Add</button>
                            <ul>
                                {this.state.tags.map((tag, i) => {
                                    return (
                                        <li key={i}>
                                            <p>{tag}</p>
                                            <div onClick={() => this.clearTag(i)}>X</div>
                                        </li>
                                    )
                                })}
                            </ul>

                            {/* DESCRIPTION */}
                            <StepTitles stepNum='4' stepName='Recipe Description' description='Add a short description to discuss this delicious addition to your recipe box!' inputId='description' showLabel={true} />
                            <textarea name="descriptionInput" id="description" cols="40" rows="10" onChange={this.handleChange} value={this.state.descriptionInput}></textarea>
                            <button onClick={this.descriptionClick}>Add</button>
                            {
                                this.state.description
                                    ? (
                                        <div>
                                            <p>{this.state.description}</p>
                                            <div onClick={this.descriptionX}>X</div>
                                        </div>
                                    )
                                    : null
                            }

                            {/* INGREDIENTS */}
                            <StepTitles stepNum='5' stepName='Ingredients' description='Please add ingredients.' showLabel={false} />
                            <label htmlFor="quantity">Quantity:</label>
                            <input type="text" onChange={this.handleChange} value={this.state.quantityInput} name='quantityInput' />

                            <label htmlFor="Measurement">Measurement:</label>
                            <select name="" id="" onChange={this.handleChange} value={this.state.measurementInput} name='measurementInput'>
                                <option value="" disabled selected hidden>Select Measurement:</option>
                                <option value="Cup(s)">Cup(s)</option>
                                <option value="tsp.">tsp.</option>
                                <option value="Tbsp.">Tbsp.</option>
                                <option value="grams">grams</option>
                                <option value="lbs.">lbs.</option>
                                <option value="oz.">oz.</option>
                                <option value="fl. oz.">fl. oz.</option>
                                <option value="pint(s)">pint(s)</option>
                                <option value="quart(s)">quart(s)</option>
                            </select>

                            <label htmlFor="ingredients">Ingredients:</label>
                            <input type="text" id="ingredients" name='ingredientsInput' onChange={this.handleChange} value={this.state.ingredientsInput} />

                            <label htmlFor="addDirections">Additional Directions</label>
                            <input type="text" default='Eg. Finely chopped' name='addDirectionsInput' onChange={this.handleChange} value={this.state.addDirectionsInput} />

                            <button onClick={this.ingredientsClick}>Add</button>
                            <ul>
                                {this.state.ingredients.map((ingred, i) => {
                                    return (
                                        <li key={i}>
                                            <p>{ingred}</p>
                                            <div onClick={() => this.clearIngredient(i)}>X</div>
                                        </li>
                                    )
                                })}
                            </ul>

                            {/* DIRECTIONS */}
                            <StepTitles stepNum='6' stepName='Directions' description="Please add the directions in order...don't worry, we will number them for you!" inputId='directions' showLabel={true} />
                            <textarea name="directionInput" id="directions" cols="40" rows="10" onChange={this.handleChange} value={this.state.directionInput}></textarea>
                            <button onClick={this.directionsClick}>Add</button>
                            <ol>
                                {this.state.directions.map((dir, i) => {
                                    return (
                                        <li key={i}>
                                            <p>{dir}</p>
                                            <div onClick={() => this.clearDirection(i)}>X</div>
                                        </li>
                                    )
                                })}
                            </ol>
                            <input type="submit" value='Create Recipe' />
                        </form>
                    </div>
                )
            } else {
                mainContent = (
                    <div>Please log in or create and account to add a recipe!</div>
                )
            }

        return (
            <div>
                {mainContent}
            </div>
        )
    }
}

const StepTitles = (props) =>{
    return(
        <div>
            <h2>Step {props.stepNum}: {props.stepName}</h2>
            <p>{props.description}</p>
            {props.showLabel 
                ? (<label htmlFor={`${props.inputId}`} className='visuallyHidden'>{props.stepName}</label>)
                : null
            }
            
        </div>

    )
}

export default AddRecipe