import React from 'react';
import {
    Link
} from "react-router-dom";
import { connect } from 'react-redux';
import './preview.css';
import firebase from "firebase/app";
import "firebase/auth";
import {
  FirebaseAuthProvider,
  FirebaseAuthConsumer
} from "@react-firebase/auth";
import { config } from "./config";

function Preview(props) {
    return(
        <div className="preview-section"> 
            <div className="header1">
                <button className="home">
                <Link to="/">
                    <img className="logo1" src="./logo.png"/>
                </Link>
                </button>
                <FirebaseAuthProvider {...config} firebase={firebase}>
                <FirebaseAuthConsumer>
                    <button
                    className="signout1"
                    onClick={() => {
                        firebase.auth().signOut();
                        props.dispatch({
                            type: "RESET_LOADING"
                        })
                    }}
                    >
                    Sign Out
                    </button>
                </FirebaseAuthConsumer>
                </FirebaseAuthProvider>
            </div>
            <div className="header-preview">
                <h1>Where are you applying?</h1>
                <p>Build a themed resume for your next job. Sure-shot way to land an interview with your favorite company. </p>
            </div>
            <div className="company-list">
                <Link to="/preview/spotify"><button className="company-button"><img src="./spotify-logo.png" alt="spotify-logo"/></button></Link>
                <Link to="/preview/instagram"><button className="company-button"><img src="./instagram-logo.jpg" alt="instagram-logo"/></button></Link>
                <Link to="/preview/flipkart"><button className="company-button"><img src="./flipkart-logo.png" alt="flipkart-logo"/></button></Link>
                <Link to="/preview/twitter"><button className="company-button"><img src="./Twitter-logo.png" alt="twitter-logo"/></button></Link>
            </div>
            <div className="company-list">
            <Link to="/preview/razorpay"><button className="company-button"><img src="./razorpay.jpg" alt="razorpay-logo"/></button></Link>
                <Link to="/preview/netflix"><button className="company-button"><img src="./netflixlogo.jpg" alt="netflix-logo"/></button></Link>
                <Link to="/preview/youtube"><button className="company-button"><img src="./youtube.jpg" alt="youtube-logo"/></button></Link>
                <Link to="/preview/amazon"><button className="company-button"><img src="./amazon-logo.png" alt="amazon-logo"/></button></Link>
            </div>
            <div className="company-list">
                <Link to="/preview/ola"><button className="company-button"><img src="./ola-logo.png" alt="ola-logo"/></button></Link>
                <Link to="/preview/pinterest"><button className="company-button"><img src="./pinterest-logo.jpg" alt="pinterest-logo"/></button></Link>
                <Link to="/preview/facebook"><button className="company-button"><img src="./Facebook-logo.png" alt="facebook-logo"/></button></Link>
                <Link to="/preview/swiggy"><button className="company-button"><img src="./swiggy.png" alt="swiggy-logo"/></button></Link>
            </div>
        </div>
    );
}
const mapStateToProps = (state) => {
    return {
      state
    }
};
  

const PreviewContainer = connect(mapStateToProps, null)(Preview);
export default PreviewContainer;