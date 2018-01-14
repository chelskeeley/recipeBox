import React from 'react';
import firebase from 'firebase';
import {
    BrowserRouter as Router, Route, Link, Switch
} from 'react-router-dom';
import Homepage from './homePage.js';
import AddRecipe from './addRecipe.js';


class Header extends React.Component{
    constructor(){
        super();
        this.state = {
            uid: '',
            signedIn: false,
            clickedSignIn: false,
            clickedCreateAccount: false,
            email: '',
            password: '',
            confirmPassword: ''
        }
        this.signIn = this.signIn.bind(this);
        this.signOut = this.signOut.bind(this);
        this.signInClick = this.signInClick.bind(this);
        this.createAccountClick = this.createAccountClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.createAccount = this.createAccount.bind(this);
    }

    componentDidMount(){
        firebase.auth().onAuthStateChanged((user) => {
            if(user){
                this.setState({
                    signedIn: true,
                    uid: user.uid
                })
            } else {
                this.setState({
                    signedIn: false,
                    uid: ''
                })
            }
        })
    }

    signIn(e) {
        e.preventDefault();
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then((data) => {
                this.setState({
                    signedIn: true,
                    email: '',
                    password: '',
                    confirmPassword: '',
                    uid: data.uid
                })
            });
        this.props.getUid(this.state.uid)
            
    }

    createAccount(e) {
        e.preventDefault();
        if (this.state.password === this.state.confirmPassword) {
            firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
                .then((data) => {
                    this.setState({
                        signedIn: true,
                        email: '',
                        password: '',
                        confirmPassword: '',
                        uid: data.uid
                    })
                });
            this.props.getUid(this.state.uid)
        } else {
            alert('Please make sure your password and confirmed password match!')
        }
    }

    signOut(e) {
        e.preventDefault();
        firebase.auth().signOut();

    }

    signInClick() {
        this.setState({
            clickedSignIn: !this.state.clickedSignIn,
            clickedCreateAccount: false,
        })
    }

    createAccountClick() {
        this.setState({
            clickedCreateAccount: !this.state.clickedCreateAccount,
            clickedSignIn: false,
        })
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render(){
        let logInForm;
        let logInText;
        let logOutButton;

        if (!this.state.signedIn) {
            logInText = (
                <p>Please <a href='javascript:void(0)' onClick={this.signInClick}>sign in</a> or <a href="javascript:void(0)" onClick={this.createAccountClick}>create an account</a> to create a recipe!</p>
            ),
                logOutButton = ''
            if (this.state.clickedSignIn) {
                logInForm = (
                    <form onSubmit={this.signIn}>
                        <label htmlFor="email">Enter Email:</label>
                        <input type="email" id='email' name='email' value={this.state.email} onChange={this.handleChange} />
                        <label htmlFor="password">Enter Password:</label>
                        <input type="password" id='password' name='password' value={this.state.password} onChange={this.handleChange} />
                        <input type="submit" />
                    </form>
                )
            } else if (this.state.clickedCreateAccount) {
                logInForm = (
                    <form onSubmit={this.createAccount}>
                        <label htmlFor="email">Enter Email:</label>
                        <input type="email" id='email' name='email' value={this.state.email} onChange={this.handleChange} />
                        <label htmlFor="password">Enter Password:</label>
                        <input type="password" id='password' name='password' value={this.state.password} onChange={this.handleChange} />
                        <label htmlFor="confirmPassword">Confirm Password:</label>
                        <input type="password" id='confirmPassword' name='confirmPassword' value={this.state.confirmPassword} onChange={this.handleChange} />
                        <input type="submit" />
                    </form>
                )
            } else {
                logInForm = ''
            }

        } else {
            logInText = '';
            logInForm = '',
                logOutButton = (<button onClick={this.signOut}>Sign Out</button>)
        }
        return (
            <div>
                <header>
                    <h1>Recipe Box</h1>
                    <Link to={`/addrecipe/${this.state.uid}`}>Add Recipe</Link>
                    <Link to='/'>Home</Link>
                </header>
                <p>Welcome to Recipe Box! We are a hub to allow you to create a share recipes with your fellow cooks! </p>
                {logInText}
                {logInForm}
                {logOutButton}
            </div>
        )
    }
}

export default Header