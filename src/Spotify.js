import React, { Fragment, useEffect } from 'react';
import {
    Link,
    useParams
} from "react-router-dom";
import './spotify.css';
import { connect } from 'react-redux';
import db from './database';
import ClickAwayListener from 'react-click-away-listener';
import Loader from './Loader';

function Spotify(props) {
    let { id } = useParams();
    const fetchUsers = async (i) => {
        await db.collection("users").doc(i).get().then((doc) => {
            if (doc.exists) {
                console.log("Document data:", doc.data().portfolio);
                props.dispatch({
                    type: "ADD_DATA",
                    text: doc.data()
                });
            } else {
                console.log("No such document!");
            }
            }).catch((error) => {
            console.log("Error getting document:", error);
            });
    };
      
    useEffect( () => { 
        props.external?
        fetchUsers(id):
        fetchUsers(props.uid) 
    }, [] );

    const showLink = () => {
        props.dispatch({
            type: 'SHOW_LINK'
        });
    }
    const hideLink = () => {
        props.dispatch({
            type: 'HIDE_LINK'
        });
    }
    const hostname = window.location.hostname;
    const protocol = window.location.protocol;
    const port = window.location.port;
    return (
        <Fragment>
        {props.state.firebaseprocessing?
          <Loader />:
        <div className="main-page9">
            {(!props.external)?
                <div className="button-part">
                <Link to="/preview"><button className="back">
                    <img className="back-image" src="/previous.png"/>
                </button></Link>
                <button className="share" onClick={e=>showLink()}>
                    <img className="share-image" src="/share.png"/>
                </button>
                </div>:
                <div></div>
            }
            <div className="main-part9">
                {(props.state.link === true)?
                    <ClickAwayListener onClickAway={e=>hideLink()}>
                    <section className="link-part9" >
                        {(port === 0 || port === '')?
                            <p>Copy this link {protocol}//{hostname}/{props.uid}/spotify</p>:
                            <p>Copy this link {protocol}//{hostname}:{port}/{props.uid}/spotify</p> 
                        }
                    </section>
                    </ClickAwayListener>:
                    <Fragment />
                }
                <section className="resume-part9">
                    <div className="first-row9">
                        <h1>{props.state.name}</h1>
                    </div>
                    <div className="second-row9">
                        <div className="first-col9">
                            <div className="col-items9">
                                <h3>Work Experience</h3>
                                <hr></hr>
                                {props.state.work_experience.map(w=>{
                                    return(
                                        <Fragment>
                                            <h4>{w.subheading}</h4>
                                            <p>{w.desc}</p>
                                        </Fragment>
                                    )
                                })}
                            </div>
                            <div className="col-items9">
                                <h3>Education</h3>
                                <hr></hr>
                                {props.state.education.map(edu=>{
                                    return(
                                        <Fragment>
                                            <h4>{edu.subheading}</h4>
                                            <p>{edu.desc}</p>
                                        </Fragment>
                                    )
                                })}
                            </div>
                            <div className="col-items9">
                                <h3>Project</h3>
                                <hr></hr>
                                {props.state.projects.map(p=>{
                                    return(
                                        <Fragment>
                                            <h4>{p.subheading}</h4>
                                            <p>{p.desc}</p>
                                        </Fragment>
                                    )
                                })}
                            </div>
                        </div>
                        <div className="second-col9">
                            <div className="second-col-items9">
                                <h3>Personal Details</h3>
                                <p>{props.state.contact}</p>
                                <p>{}props.state.email</p>
                            </div>
                            <hr></hr>
                            <div className="second-col-items9">
                                <h3>Links</h3>
                                <button onClick={() => window.open(`https://${props.state.linkedin}`,`_blank`)}>Linkedin</button>
                                <button onClick={() => window.open(`https://${props.state.portfolio}`,`_blank`)}>Portfolio</button>
                            </div>
                            <hr></hr>
                            <div className="second-col-items9">
                                <h3>Skills</h3>
                                {props.state.skills.map(s=>{
                                    return(
                                        <Fragment>
                                            <p>{s.subheading}</p>
                                        </Fragment>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
        }
        </Fragment>
    );
}

const mapStateToProps = (state) => {
    return{
        state
    }
};
const SpotifyContainer = connect(mapStateToProps, null)(Spotify);
export default SpotifyContainer;