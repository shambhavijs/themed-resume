import * as React from "react";
import firebase from "firebase/app";
import "firebase/auth";
import {
  FirebaseAuthProvider,
  FirebaseAuthConsumer
} from "@react-firebase/auth";
import { config } from "./config";
import MainApp from './MainApp';
import "./signup.css";

function Signup() {
    return(
        <FirebaseAuthProvider {...config} firebase={firebase}>
        <div>
            <FirebaseAuthConsumer>
            {({ isSignedIn, user}) => {
                if(isSignedIn === true){
                    return(
                        <div className="signout-div">
                            <button
                            className="signout"
                            onClick={() => {
                                firebase.auth().signOut();
                            }}
                            >
                            Sign Out
                            </button>
                            <MainApp uid={user.uid} />
                        </div>
                    );
                }
                else{
                    return(
                        <div className="signin-div">
                        <button
                        className="signin"
                        onClick={() => {
                        const githubAuthProvider = new firebase.auth.GithubAuthProvider();
                        firebase.auth().signInWithPopup(githubAuthProvider);
                        }}>
                        Sign In with Github
                        </button>
                        </div>
                    );
                }
            }}
            </FirebaseAuthConsumer>
        </div>
        </FirebaseAuthProvider>
    );
}

export default Signup;