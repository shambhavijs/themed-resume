import React, { Fragment, useEffect } from 'react';
import {
    Link,
    useParams
} from "react-router-dom";
import './youtube.css';
import { connect } from 'react-redux';
import db from './database';
import ClickAwayListener from 'react-click-away-listener';
import Loader from './Loader';

function Youtube(props) {
    let name_arr = props.state.name.split(" ");
    let name_arr1 = name_arr.slice(0, name_arr.length-1);
    let name_arr2 = name_arr.slice(name_arr.length-1, name_arr.length);
    let name_arr3 = name_arr1.join(" ");

    let { id } = useParams();
    const fetchUsers = async (i) => {
        await db.collection("users").doc(i).get().then((doc) => {
            if (doc.exists) {
                console.log("Document data:", doc.data().portfolio);
                props.dispatch({
                    type: "ADD_DATA",
                    text: doc.data()
                });
            } 
            else {
                console.log("No such document!");
            }
            }).catch((error) => {
            console.log("Error getting document:", error);
            });
    };
      
    useEffect( () => { 
        (props.external)?
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
        <div className="main-page1">
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
            <div className="main-part1">
                {(props.state.link === true)?
                    <ClickAwayListener onClickAway={e=>hideLink()}>
                    <section className="link-part1" >
                        {(port === 0 || port === null)?
                            <p>Copy this link {protocol}//{hostname}/{props.uid}/youtube</p>:
                            <p>Copy this link {protocol}//{hostname}:{port}/{props.uid}/youtube</p> 
                        }
                    </section>
                    </ClickAwayListener>:
                    <Fragment />
                }
                <section className="resume-part1">
                    <div className="first-row1">
                        {}
                        <div className="name">{name_arr3}<div className="name-div">{name_arr2[0]}</div></div>
                       
                    </div>
                    <div className="second-row1">
                        <div className="first-col1">
                            <div className="col-items1">
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
                            <div className="col-items1">
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
                            <div className="col-items1">
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
                        <div className="second-col1">
                            <div className="second-col-items1">
                                <h3>Personal Details</h3>
                                <p>{props.state.contact}</p>
                                <p>{props.state.email}</p>
                            </div>
                            <hr></hr>
                            <div className="second-col-items1">
                                <h3>Links</h3>
                                <button onClick={() => window.open(`https://${props.state.linkedin}`,`_blank`)}>Linkedin</button>
                                <button onClick={() => window.open(`https://${props.state.portfolio}`,`_blank`)}>Portfolio</button>
                            </div>
                            <hr></hr>
                            <div className="second-col-items1">
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
    return {
      state
    }
};
const YoutubeContainer = connect(mapStateToProps, null)(Youtube);
export default YoutubeContainer;
