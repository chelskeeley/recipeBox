import React from 'react';

class AddRecipe extends React.Component {
    constructor(){
        super();
        this.state = {
            title: '',
            titleInput: '',
            imageURL: '',
            tags: [],
            tagInput: '',
            description: '',
            ingredients: '',
            directions: '',
            titleAdded: false,
        }
        this.handleChange = this.handleChange.bind(this);
        this.titleClick = this.titleClick.bind(this);
        this.clearTitle = this.clearTitle.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.tagClick = this.tagClick.bind(this);
        this.clearTag = this.clearTag.bind(this);
    }

    //saves input in text areas into state
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    //form submit
    handleSubmit(e){
        e.preventDefault();
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
        this.state.tags.push(this.state.tagInput);
        this.setState({
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

        //display logic for tags
        


        return (
            <div>
                <form action="" onSubmit={this.handleSubmit}>
                    {/* TITLE */}
                    <StepTitles stepNum='1' stepName='Recipe Title' description='' inputId='title' />
                    <input type="text" id='title' name='titleInput' onChange={this.handleChange} value={this.state.titleInput} ref={el => this.inputValue = el}/>
                    <button onClick={this.titleClick}>Add</button>
                    <div>
                        <p>{titleContent}</p>
                        <div onClick={this.clearTitle}>{titleX}</div>
                    </div>

                    {/* IMAGES */}
                    <StepTitles stepNum='2' stepName='Upload Photo' description='Upload or drag and drop an image to add a photo to your post!' inputId=''/>
                    {/* add image drag and drop functionality here */}

                    {/* TAGS */}
                    <StepTitles stepNum='3' stepName='Recipe Tags' description='Add tags to your post to help search for your recipe! (eg. Chicken, Dessert, Vegetarian etc)' inputId='tags'/>
                    <input type="text" id="tags" name='tagInput' onChange={this.handleChange} value={this.state.tagInput}/>
                    <button onClick={this.tagClick}>Add</button>
                    <ul>
                        {this.state.tags.map((tag,i) =>{
                            return (
                                <li key={i}>
                                    <p>{tag}</p>
                                    <div onClick={()=> this.clearTag(i)}>X</div>
                                </li>
                            )
                            
                        })}
                    </ul>
                    
                    {/* DESCRIPTION */}
                    <StepTitles stepNum='4' stepName='Recipe Description' description='Add a short description to discuss this delicious addition to your recipe box!' inputId='description'/>
                    <textarea name="description" id="description" cols="40" rows="10"></textarea>
                    <button>Add</button>
                    
                    {/* INGREDIENTS */}
                    <StepTitles stepNum='5' stepName='Ingredients' description='Please add ingredients.' inputId='indgredients'/>
                    <input type="text" id="ingredients" name='ingredients' />
                    <button>Add</button>

                    {/* DIRECTIONS */}
                    <StepTitles stepNum='6' stepName='Directions' description="Please add the directions in order...don't worry, we will number them for you!" inputId='directions'/>
                    <input type="text" id="directions" name='directions'/>
                    <button>Add</button>
                
                </form>
            </div>
        )
    }
}

const StepTitles = (props) =>{
    return(
        <div>
            <h2>Step {props.stepNum}: {props.stepName}</h2>
            <p>{props.description}</p>
            <label htmlFor={`${props.inputId}`} className='visuallyHidden'>{props.stepName}</label>
        </div>

    )
}

export default AddRecipe