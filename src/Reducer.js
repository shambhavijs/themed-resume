const initialState = {
    name: '',
    contact: '',
    email: '',
    work_experience: [{
            id: 1,
            subheading: '',
            desc: ''
        }
    ],
    education: [{
            id: 1,
            subheading: '',
            desc: ''
        }
    ],
    projects: [{
        id: 1,
        subheading: '',
        desc: ''
    }],
    skills: [{
        id: 1,
        subheading: ''
    }],
    linkedin: '',
    portfolio: '',
    link: false,
    firebaseprocessing: true
};
 

function Reducer(state = initialState, action) {
    switch(action.type){
        case 'ADD_DATA':
            return{
            ...state,
            name: action.text.name,
            contact: action.text.contact,
            email: action.text.email,
            work_experience: action.text.work_experience,
            education: action.text.education,
            projects: action.text.projects,
            skills: action.text.skills,
            linkedin: action.text.linkedin,
            portfolio: action.text.portfolio,
            firebaseprocessing: false
            };
        case 'ADD_NAME':
            return {
            ...state,
            name: action.text
            };
        case 'ADD_NUMBER':
            return {
            ...state,
            contact: action.text
            };
        case 'ADD_EMAIL':
            return {
            ...state,
            email: action.text
            };
        case 'ADD_LINKEDIN':
            return {
            ...state,
            linkedin: action.text
            };
        case 'ADD_PORTFOLIO':
            return {
            ...state,
            portfolio: action.text
            };
        case 'ADD_WORK_SUBSECTION':
            return {
            ...state,
            work_experience: [
                ...state.work_experience,
                {
                    id: state.work_experience.length+1,
                    subheading: '',
                    desc: ''

                } 
                ]
            };
        case 'ADD_EDU_SUBSECTION':
            return {
            ...state,
            education: [
                ...state.education,
                {
                    id: state.education.length+1,
                    subheading: '',
                    desc: ''
                }
                ]
            };
        case 'ADD_PROJ_SUBSECTION':
            return {
            ...state,
            projects: [
                ...state.projects,
                {
                    id: state.projects.length+1,
                    subheading: '',
                    desc: ''
                }
                ]
            };
        case 'ADD_SKILL_SUBSECTION':
            return {
            ...state,
            skills: [
                ...state.skills,
                {
                    id: state.skills.length+1,
                    subheading: ''
                }
                ]
            };
        case 'ADD_WORK_SUBHEADING':
            const subsection = state.work_experience.filter(w=>{ return w.id === action.id })[0];
            const subsectionIndex = state.work_experience.findIndex(w=>{ return w.id === action.id });
            if (state.work_experience.length <= 1){
                return{
                    ...state,
                    work_experience: [
                        {
                            ...state.work_experience[0],
                            subheading: action.text
                        }
                    ]
                };
            }
            else if (state.work_experience.length === 2) {
                switch (subsectionIndex) {
                    case 0:
                        return {
                            ...state,
                            work_experience: [
                                {
                                    ...state.work_experience[0],
                                    subheading: action.text
                                },
                                state.work_experience[1]
                            ]
                        };
                    case 1:
                        return {
                            ...state,
                            work_experience: [
                                state.work_experience[0],
                                {
                                    ...state.work_experience[1],
                                    subheading: action.text
                                }
                            ]
                        };
                }
            }
            else {
                return {
                    ...state,
                    work_experience: [
                        ...state.work_experience.slice(0, subsectionIndex),
                        {
                            ...subsection,
                            subheading: action.text
                        },
                        ...state.work_experience.slice(subsectionIndex+1, state.work_experience.length)
                    ]
                };
            }
        case 'ADD_WORK_DESC':
            const subsection1 = state.work_experience.filter(w=>{ return w.id === action.id })[0];
            const subsectionIndex1 = state.work_experience.findIndex(w=>{ return w.id === action.id });
            console.log(subsection1.id);
            if (state.work_experience.length <= 1){
                return{
                    ...state,
                    work_experience: [
                        {
                            ...state.work_experience[0],
                            desc: action.text
                        }
                    ]
                };
            }
            else if (state.work_experience.length === 2) {
                switch (subsectionIndex1) {
                    case 0:
                        return {
                            ...state,
                            work_experience: [
                                {
                                    ...state.work_experience[0],
                                    desc: action.text
                                },
                                state.work_experience[1]
                            ]
                        };
                    case 1:
                        return {
                            ...state,
                            work_experience: [
                                state.work_experience[0],
                                {
                                    ...state.work_experience[1],
                                    desc: action.text
                                }
                            ]
                        };
                }
            }
            else {
                return {
                    ...state,
                    work_experience: [
                        ...state.work_experience.slice(0, subsectionIndex1),
                        {
                            ...subsection1,
                            desc: action.text
                        },
                        ...state.work_experience.slice(subsectionIndex1+1, state.work_experience.length)
                    ]
                };
            }
        case 'ADD_EDU_SUBHEADING':
            const subsection2 = state.education.filter(edu=>{ return edu.id === action.id })[0];
            const subsectionIndex2 = state.education.findIndex(edu=>{ return edu.id === action.id });
            console.log(subsection2.id);
            if (state.education.length <= 1){
                return{
                    ...state,
                    education: [
                        {
                            ...state.education[0],
                            subheading: action.text
                        }
                    ]
                };
            }
            else if (state.education.length === 2) {
                switch (subsectionIndex2) {
                    case 0:
                        return {
                            ...state,
                            education: [
                                {
                                    ...state.education[0],
                                    subheading: action.text
                                },
                                state.education[1]
                            ]
                        };
                    case 1:
                        return {
                            ...state,
                            education: [
                                state.education[0],
                                {
                                    ...state.education[1],
                                    subheading: action.text
                                }
                            ]
                        };
                }
            }
            else {
                return {
                    ...state,
                    education: [
                        ...state.education.slice(0, subsectionIndex2),
                        {
                            ...subsection2,
                            subheading: action.text
                        },
                        ...state.education.slice(subsectionIndex2+1, state.education.length)
                    ]
                };
            };
        case 'ADD_EDU_DESC':
            const subsection3 = state.education.filter(edu=>{ return edu.id === action.id })[0];
            const subsectionIndex3 = state.education.findIndex(edu=>{ return edu.id === action.id });
            console.log(subsection3.id);
            if (state.education.length <= 1){
                return{
                    ...state,
                    education: [
                        {
                            ...state.education[0],
                            desc: action.text
                        }
                    ]
                };
            }
            else if (state.education.length === 2) {
                switch (subsectionIndex3) {
                    case 0:
                        return {
                            ...state,
                            education: [
                                {
                                    ...state.education[0],
                                    desc: action.text
                                },
                                state.education[1]
                            ]
                        };
                    case 1:
                        return {
                            ...state,
                            education: [
                                state.education[0],
                                {
                                    ...state.education[1],
                                    desc: action.text
                                }
                            ]
                        };
                }
            }
            else {
                return {
                    ...state,
                    education: [
                        ...state.education.slice(0, subsectionIndex3),
                        {
                            ...subsection3,
                            desc: action.text
                        },
                        ...state.education.slice(subsectionIndex3+1, state.education.length)
                    ]
                };
            };
        case 'ADD_PROJ_SUBHEADING':
            const subsection4 = state.projects.filter(p=>{ return p.id === action.id })[0];
            const subsectionIndex4 = state.projects.findIndex(p=>{ return p.id === action.id });
            if (state.projects.length <= 1){
                return{
                    ...state,
                    projects: [
                        {
                            ...state.projects[0],
                            subheading: action.text
                        }
                    ]
                };
            }
            else if (state.projects.length === 2) {
                switch (subsectionIndex4) {
                    case 0:
                        return {
                            ...state,
                            projects: [
                                {
                                    ...state.projects[0],
                                    subheading: action.text
                                },
                                state.projects[1]
                            ]
                        };
                    case 1:
                        return {
                            ...state,
                            projects: [
                                state.projects[0],
                                {
                                    ...state.projects[1],
                                    subheading: action.text
                                }
                            ]
                        };
                }
            }
            else {
                return {
                    ...state,
                    projects: [
                        ...state.projects.slice(0, subsectionIndex4),
                        {
                            ...subsection4,
                            subheading: action.text
                        },
                        ...state.projects.slice(subsectionIndex4+1, state.projects.length)
                    ]
                };
            };
        case 'ADD_PROJ_DESC':
            const subsection5 = state.projects.filter(p=>{ return p.id === action.id })[0];
            const subsectionIndex5 = state.projects.findIndex(p=>{ return p.id === action.id });
            if (state.projects.length <= 1){
                return{
                    ...state,
                    projects: [
                        {
                            ...state.projects[0],
                            desc: action.text
                        }
                    ]
                };
            }
            else if (state.projects.length === 2) {
                switch (subsectionIndex5) {
                    case 0:
                        return {
                            ...state,
                            projects: [
                                {
                                    ...state.projects[0],
                                    desc: action.text
                                },
                                state.projects[1]
                            ]
                        };
                    case 1:
                        return {
                            ...state,
                            projects: [
                                state.projects[0],
                                {
                                    ...state.projects[1],
                                    desc: action.text
                                }
                            ]
                        };
                }
            }
            else {
                return {
                    ...state,
                    projects: [
                        ...state.projects.slice(0, subsectionIndex5),
                        {
                            ...subsection5,
                            desc: action.text
                        },
                        ...state.projects.slice(subsectionIndex5+1, state.projects.length)
                    ]
                };
            };
        case 'ADD_SKILL_SUBHEADING':
            const subsection6 = state.skills.filter(s=>{ return s.id === action.id })[0];
            const subsectionIndex6 = state.skills.findIndex(s=>{ return s.id === action.id });
            if (state.skills.length <= 1){
                return{
                    ...state,
                    skills: [
                        {
                            ...state.skills[0],
                            subheading: action.text
                        }
                    ]
                };
            }
            else if (state.skills.length === 2) {
                switch (subsectionIndex6) {
                    case 0:
                        return {
                            ...state,
                            skills: [
                                {
                                    ...state.skills[0],
                                    subheading: action.text
                                },
                                state.skills[1]
                            ]
                        };
                    case 1:
                        return {
                            ...state,
                            skills: [
                                state.skills[0],
                                {
                                    ...state.skills[1],
                                    subheading: action.text
                                }
                            ]
                        };
                }
            }
            else {
                return {
                    ...state,
                    skills: [
                        ...state.skills.slice(0, subsectionIndex6),
                        {
                            ...subsection6,
                            subheading: action.text
                        },
                        ...state.skills.slice(subsectionIndex6+1, state.skills.length)
                    ]
                };
            };
        case 'SHOW_LINK':
            return{
            ...state,
            link: true
            };
        case 'HIDE_LINK':
            return{
            ...state,
            link: false
            };
        case 'REMOVE_WORK_SUBSECTION':
           return{
            ...state,
            work_experience: state.work_experience.filter(item => { return item.id != action.id })
            };
        case 'REMOVE_EDU_SUBSECTION':
           return{
            ...state,
            education: state.education.filter(item => { return item.id != action.id })
            };
        case 'REMOVE_PROJ_SUBSECTION':
           return{
            ...state,
            projects: state.projects.filter(item => { return item.id != action.id })
            };
        case 'REMOVE_SKILL_SUBSECTION':
           return{
            ...state,
            skills: state.skills.filter(item => { return item.id != action.id })
            };
        default:
            return state;
    }
}

export default Reducer;