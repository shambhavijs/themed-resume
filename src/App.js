import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { connect } from 'react-redux';
import Preview from './Preview';
import Swiggy from './Swiggy';
import Youtube from './Youtube';
import Facebook from './Facebook';
import Amazon from './Amazon';
import Ola from './Ola';
import Flipkart from './Flipkart';
import Instagram from './Instagram';
import Netflix from './Netflix';
import Razorpay from './Razorpay';
import Spotify from './Spotify';
import Pinterest from './Pinterest';
import Twitter from './Twitter';
import firebase from "firebase/app";
import "firebase/auth";
import {
  FirebaseAuthProvider,
  FirebaseAuthConsumer
} from "@react-firebase/auth";
import { config } from "./config";
import MainApp from './MainApp';
import "./signup.css";
import Loader from './Loader';


function App(props) {
  return (
    <FirebaseAuthProvider {...config} firebase={firebase}>
        <div>
            <FirebaseAuthConsumer>
            {({ isSignedIn, user, providerId}) => {
                if(isSignedIn === true){
                    return(
                        <div>
                            <Router>
                            <Switch>
                              <Route exact path="/" render={() => <MainApp uid={user.uid}/>} />
                              <Route exact path="/preview" render={() => <Preview uid={user.uid}/>} />
                              <Route path="/preview/facebook" render={() => <Facebook external={false} uid={user.uid}/>} />
                              <Route path="/preview/amazon" render={() => <Amazon external={false} uid={user.uid}/>} />
                              <Route path="/preview/ola" render={() => <Ola external={false} uid={user.uid}/>} />
                              <Route path="/preview/flipkart" render={() => <Flipkart external={false} uid={user.uid}/>} />
                              <Route path="/preview/instagram" render={() => <Instagram external={false} uid={user.uid}/>} />
                              <Route path="/preview/netflix" render={() => <Netflix external={false} uid={user.uid}/>} />
                              <Route path="/preview/razorpay" render={() => <Razorpay external={false} uid={user.uid}/>} />
                              <Route path="/preview/spotify" render={() => <Spotify external={false} uid={user.uid}/>} />
                              <Route path="/preview/pinterest" render={() => <Pinterest external={false} uid={user.uid}/>} />
                              <Route path="/preview/twitter" render={() => <Twitter external={false} uid={user.uid}/>} />
                              <Route path="/preview/youtube" render={() => <Youtube external={false} uid={user.uid}/>} />
                              <Route path="/preview/swiggy" render={() => <Swiggy external={false} uid={user.uid}/>} />
                              <Route path="/:id/pinterest" render={() => <Pinterest external={true}/>}/>
                              <Route path="/:id/amazon" render={() => <Amazon external={true} />}/>
                              <Route path="/:id/facebook" render={() => <Facebook external={true} />}/>
                              <Route path="/:id/ola" render={() => <Ola external={true} />}/>
                              <Route path="/:id/flipkart" render={() => <Flipkart external={true} />}/>
                              <Route path="/:id/instagram" render={() => <Instagram external={true} />}/>
                              <Route path="/:id/netflix" render={() => <Netflix external={true} />}/>
                              <Route path="/:id/razorpay" render={() => <Razorpay external={true} />}/>
                              <Route path="/:id/spotify" render={() => <Spotify external={true} />}/>
                              <Route path="/:id/twitter" render={() => <Twitter external={true} />}/>
                              <Route path="/:id/youtube" render={() => <Youtube external={true} />}/>
                              <Route path="/:id/swiggy" render={() => <Swiggy external={true}/>}/>
                            </Switch>
                          </Router>
                        </div>
                    );
                  }
                else if(providerId === null && props.state.firebaseprocessing === true){
                  return(
                    <Loader/>
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


const mapStateToProps = (state) => {
  return {
    state
  }
};


const AppContainer = connect(mapStateToProps, null)(App);
export default AppContainer;
