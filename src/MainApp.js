import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import {
    Link
} from "react-router-dom";
import './index.css';
import db from "./database"; 
import firebase from "firebase/app";
import "firebase/auth";
import {
  FirebaseAuthProvider,
  FirebaseAuthConsumer
} from "@react-firebase/auth";
import { config } from "./config";


function MainApp(props) {
    const fetchUsers = async () => {
        await db.collection("users").doc(props.uid).get().then((doc) => {
            if (doc.exists) {
                console.log("Document data:", doc.data().portfolio);
                props.dispatch({
                    type: "ADD_DATA",
                    text: doc.data()
                })
            } 
            else {
                console.log("No such document!");
            }
            }).catch((error) => {
            console.log("Error getting document:", error);
            });
    };
      
    useEffect( () => { fetchUsers() }, [] );
    const addName = (value) => {
        props.dispatch({
          type: "ADD_NAME",
          text: value
        });
    }
    const addNumber = (value) => {
        props.dispatch({
          type: "ADD_NUMBER",
          text: value
        });
    }
    const addEmail = (value) => {
        props.dispatch({
          type: "ADD_EMAIL",
          text: value
        });
    }
    const addLinkedin = (value) => {
        props.dispatch({
          type: "ADD_LINKEDIN",
          text: value
        });
    }
    const addPortfolio = (value) => {
        props.dispatch({
          type: "ADD_PORTFOLIO",
          text: value
        });
    }
    const addWorkSubsection = () => {
        props.dispatch({
            type: 'ADD_WORK_SUBSECTION'
        });
    }
    const addEduSubsection = () =>{
        props.dispatch({
            type: 'ADD_EDU_SUBSECTION'
        });
    }
    const addProjSubsection = () =>{
        props.dispatch({
            type: 'ADD_PROJ_SUBSECTION'
        });
    }
    const addSkillSubsection = () => {
        props.dispatch({
            type: 'ADD_SKILL_SUBSECTION'
        });
    }
    const addWorkSubheading = (i,value) =>{
        props.dispatch({
            type: 'ADD_WORK_SUBHEADING',
            id: i,
            text: value
        });
    }
    const addWorkDesc = (i,value) =>{
        props.dispatch({
            type: 'ADD_WORK_DESC',
            id: i,
            text: value
        });
    }
    const addEduSubheading = (i,value) =>{
        props.dispatch({
            type: 'ADD_EDU_SUBHEADING',
            id: i,
            text: value
        });
    }
    const addEduDesc = (i,value) =>{
        props.dispatch({
            type: 'ADD_EDU_DESC',
            id: i,
            text: value
        });
    }
    const addProjSubheading = (i,value) =>{
        props.dispatch({
            type: 'ADD_PROJ_SUBHEADING',
            id: i,
            text: value
        });
    }
    const addProjDesc = (i,value) =>{
        props.dispatch({
            type: 'ADD_PROJ_DESC',
            id: i,
            text: value
        });
    }
    const addSkillSubheading = (i,value) =>{
        props.dispatch({
            type: 'ADD_SKILL_SUBHEADING',
            id: i,
            text: value
        });
    }
    const saveData = () => {
        db.collection("users").doc(props.uid).set({
            name: props.state.name,
            contact: props.state.contact,
            email: props.state.email,
            work_experience: props.state.work_experience,
            education: props.state.education,
            projects: props.state.projects,
            skills: props.state.skills,
            linkedin: props.state.linkedin,
            portfolio: props.state.portfolio
        })
        .then(() => {
            console.log("Document successfully written!");
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
    }
    const removeWorkSubsection = (i) => {
        props.dispatch({
            type: 'REMOVE_WORK_SUBSECTION',
            id: i
        })
    }
    const removeEduSubsection = (i) => {
        props.dispatch({
            type: 'REMOVE_EDU_SUBSECTION',
            id: i
        })
    }
    const removeProjSubsection = (i) => {
        props.dispatch({
            type: 'REMOVE_PROJ_SUBSECTION',
            id: i
        })
    }
    const removeSkillSubsection = (i) => {
        props.dispatch({
            type: 'REMOVE_SKILL_SUBSECTION',
            id: i
        })
    }
    return (
    <div className="app">
        <div className="header">
            <img className="logo" src="./logo.png"/>
            <FirebaseAuthProvider {...config} firebase={firebase}>
            <FirebaseAuthConsumer>
                <button
                className="signout"
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
        <div className="editor">
            <div className="row1">
                <div className="name">
                    <input className="name-input" placeholder="Name" type="text" value={props.state.name} onChange={e=>addName(e.target.value)}/>
                </div>
                <div className="personal-info">
                    <input className="contact" placeholder="Contact Number" type="number" value={props.state.contact} onChange={e=>addNumber(e.target.value)}/>
                    <input className="email" placeholder="Email-id" type="email" value={props.state.email} onChange={e=>addEmail(e.target.value)}/>
                </div>
            </div>
            <div className="row2">
                <section className="col1">
                    <div className="content">
                        <input className="heading" placeholder="Work Experience" />
                        {
                            props.state.work_experience.map(w=>{
                                return (
                                    <Fragment>
                                        <div className="subheading-wrapper">
                                            <input className="subheading" placeholder="Sub-heading" type="text" value={w.subheading} onChange={e=>addWorkSubheading(w.id,e.target.value)}/>
                                            <buttton className="delete" onClick={e=>removeWorkSubsection(w.id)}> <img src="./trash-bin.svg" alt="delete"/> </buttton>
                                        </div>
                                        <textarea className="desc" placeholder="Description" type="text" value={w.desc} onChange={e=>addWorkDesc(w.id,e.target.value)}/>
                                    </Fragment>
                                )
                            })
                        }
                        <button className="add-content" onClick={e=>addWorkSubsection()}><img src="./add.svg"/></button>
                    </div>
                    <div className="content">
                        <input className="heading" placeholder="Education"/>
                        {
                            props.state.education.map(edu => {
                                return (
                                    <Fragment>
                                        <div className="subheading-wrapper">
                                            <input className="subheading" placeholder="Sub-heading" type="text" value={edu.subheading} onChange={e=>addEduSubheading(edu.id,e.target.value)}/>
                                            <buttton className="delete" onClick={e=>removeEduSubsection(edu.id)}> <img src="./trash-bin.svg" alt="delete"/> </buttton>
                                        </div>
                                        <textarea className="desc" placeholder="Description" type="text" value={edu.desc} onChange={e=>addEduDesc(edu.id,e.target.value)}/>
                                    </Fragment>
                                )
                            })
                        }
                        <button className="add-content" onClick={e=>addEduSubsection()}><img src="./add.svg"/></button>
                    </div>
                    <div className="content">
                        <input className="heading" placeholder="Projects"/>
                        {
                            props.state.projects.map(p => {
                                return(
                                    <Fragment>
                                        <div className="subheading-wrapper">
                                            <input className="subheading" placeholder="Sub-heading" type="text" value={p.subheading} onChange={e=>addProjSubheading(p.id,e.target.value)}/>
                                            <buttton className="delete" onClick={e=>removeProjSubsection(p.id)}> <img src="./trash-bin.svg" alt="delete"/> </buttton>
                                        </div>
                                        <textarea className="desc" placeholder="Description" type="text" value={p.desc} onChange={e=>addProjDesc(p.id,e.target.value)}/>
                                    </Fragment>
                                )
                            })
                        }
                        <button className="add-content" onClick={e=>addProjSubsection()}><img src="./add.svg"/></button>
                    </div>
                </section>
                <section className="col2">
                    <div className="content">
                        <input className="heading" placeholder="Skills"/>
                        {
                            props.state.skills.map(s=>{
                                return(
                                    <Fragment>
                                        <div className="subheading-wrapper">
                                            <input className="subheading" placeholder="Sub-heading" type="text" value={s.subheading} onChange={e=>addSkillSubheading(s.id,e.target.value)}/>
                                            <buttton className="delete" onClick={e=>removeSkillSubsection(s.id)}> <img src="./trash-bin.svg" alt="delete"/> </buttton>
                                        </div>
                                    </Fragment>
                                )
                            })
                        }
                        <button className="add-content" onClick={e=>addSkillSubsection()}><img src="./add.svg"/></button>
                    </div>
                    <div className="content">
                        <input className="heading" placeholder="Links"/>
                        <input className="subheading" placeholder="Linkedin" type="url" value={props.state.linkedin} onChange={e=>addLinkedin(e.target.value)}/>
                        <input className="subheading" placeholder="Portfolio" type="url" value={props.state.portfolio} onChange={e=>addPortfolio(e.target.value)} /> 
                    </div>
                   {/*} <button className="add-image">
                        <img className="add" src="./plus.svg"/> Add Section
                    </button>*/}
                </section>
            </div>
        </div>
          <div className="buttons">
            <button className="save" onClick={e=>saveData()}>Save</button>
            <Link to="/preview"><button className="preview">Preview Resume</button></Link>
        </div>
    </div>
  );
}

const mapStateToProps = (state) => {
    return {
      state
    }
};
  

const MainAppContainer = connect(mapStateToProps, null)(MainApp);
export default MainAppContainer;