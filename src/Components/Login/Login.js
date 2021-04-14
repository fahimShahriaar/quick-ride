import React, { useContext, useState } from 'react';
import Header from '../Header/Header';
import './Login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}


const Login = () => {
    const [user, setUser] = useState({ isSignIn: false, name: '', email: '', password: '', success: false, error: '' });
    const [newUser, setNewUser] = useState(true);

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    var googleProvider = new firebase.auth.GoogleAuthProvider();
    const handleGoogleSignIn = () => {
        firebase.auth()
            .signInWithPopup(googleProvider)
            .then((result) => {
                const { displayName, email } = result.user;
                const newUserInfo = { ...user };
                newUserInfo.isSignIn = true;
                newUserInfo.name = displayName;
                newUserInfo.email = email;
                newUserInfo.success = true;
                newUserInfo.error = '';
                setUser(newUserInfo);
                setLoggedInUser(newUserInfo);
                history.replace(from);
            }).catch((error) => {
                const newUserInfo = { ...user };
                newUserInfo.error = error.message;
                newUserInfo.success = false;
                newUserInfo.isSignIn = false;
                setUser(newUserInfo);
            });
    }

    const handleBlur = (event) => {
        let isFieldValid = true;
        if (event.target.name === 'email') {
            isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);
        }
        if (event.target.name === 'password') {
            const isPasswordValid = event.target.value.length > 6;
            const hasPasswordNumber = /\d{1}/.test(event.target.value);
            isFieldValid = isPasswordValid && hasPasswordNumber;
        }
        if (isFieldValid) {
            const newUserInfo = { ...user };
            newUserInfo[event.target.name] = event.target.value;
            setUser(newUserInfo);
        }
    }

    const handleSubmit = (event) => {
        if (newUser && user.name && user.email && user.password) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then((userCredential) => {
                    var user = userCredential.user;
                    console.log('user created successfully: ', user);
                    const newUserInfo = { ...user };
                    newUserInfo.name = user.name;
                    newUserInfo.success = true;
                    newUserInfo.error = '';
                    setUser(newUserInfo);
                    setLoggedInUser(newUserInfo);
                    updateUserName(user.name);
                })
                .catch((error) => {
                    const newUserInfo = { ...user };
                    newUserInfo.success = false;
                    newUserInfo.error = error.message;
                    setUser(newUserInfo);
                });
        }
        if (!newUser && user.email && user.password) {
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then((result) => {
                    const { displayName, email } = result.user;
                    const newUserInfo = { ...user };
                    newUserInfo.name = displayName;
                    newUserInfo.email = email;
                    newUserInfo.success = true;
                    newUserInfo.error = '';
                    setUser(newUserInfo);
                    setLoggedInUser(newUserInfo);
                    history.replace(from);
                    // console.log(result.user);

                })
                .catch((error) => {
                    const newUserInfo = { ...user };
                    newUserInfo.success = false;
                    newUserInfo.error = error.message;
                    setUser(newUserInfo);
                });
        }
        event.preventDefault();
    }

    const updateUserName = (name) => {
        var user = firebase.auth().currentUser;

        user.updateProfile({
            displayName: name
        }).then(function () {
            console.log('Name updated successfully.');
        }).catch(function (error) {
            console.log('An error happened');
        });
    }


    return (
        <div className="container">
            <Header />
            <hr />
            <div className="p-3 w-50 mx-auto text-center">
                <form onSubmit={handleSubmit} className="border">
                    <h3 className="mb-5">Create an Account</h3>
                    {newUser && <input type="text" onBlur={handleBlur} name="name" id="name" className="p-3 w-75" placeholder="Name" required />}<br />
                    <input type="text" onBlur={handleBlur} name="email" id="email" className="p-3 w-75" placeholder="Email" required /><br />
                    <input type="password" onBlur={handleBlur} name="password" id="pass" className="p-3 w-75" placeholder="Password (should at least 6 characters and must contain a number)" required /><br />
                    {/* {newUser && <input type="password" onBlur={handleBlur} name="confirmPassword" id="confirmPassword" className="p-3 w-75" placeholder="Confirm password" required />}<br /> */}

                    {/* {pass.error && <small className="text-danger">{pass.error}</small>} */}

                    <input type="submit" value={newUser ? "Create an account" : "Login"} className="my-3 py-1 w-75 bg-danger text-white" />

                    <p>{newUser ? 'Already have an account?' : `Don't have an account?`}
                        <span onClick={() => setNewUser(!newUser)} className="text-danger" style={{ cursor: 'pointer' }}> {newUser ? 'Login' : 'Create an account'}</span>
                    </p>

                </form>

                <p className="my-3">or</p>
                <button onClick={handleGoogleSignIn} className="btn btn-outline-info px-5"><FontAwesomeIcon icon={faGoogle} className="text-success me-2" />
                    Sign in with google
                </button>

            </div>
        </div>
    );
};

export default Login;