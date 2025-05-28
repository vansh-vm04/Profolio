import { createSlice } from '@reduxjs/toolkit' 

const initialState = {
  heading:{},
  education:[],
  experience:[],
  projects:[],
  skills:[],
  template:"template1"
}

export const resumeSlice = createSlice({
  name: 'resume',
  initialState,
  reducers: {
    setHeading: (state,action) => {
      state.heading = {
        ...state.heading,
        ...action.payload
      }
    },
    setEducation: (state,action) => {
      state.education = [
        ...state.education,
        {...action.payload}
      ]
    },
    clearEducation: (state) => {
      state.education = []
    },
    setExperience: (state,action) => {
      state.experience = [
        ...state.experience,
        {...action.payload}
      ]
    },
    clearExperience: (state) => {
      state.experience = []
    },
    setProjects: (state,action) => {
      state.projects = [
        ...state.projects,
        {...action.payload}
      ]
    },
    clearProjects: (state) => {
      state.projects = []
    },
    setSkills: (state, action) => {
      state.skills = [...action.payload];
    },
    clearSkills: (state) => {
      state.skills = []
    },
    setAdditionalSections: (state,action) => {
      // console.log('Payload:', action.payload);
      state.additionalSections = {
        ...state.additionalSections,
        ...action.payload
      }
    },
    clearPersist: (state) => {
        delete state._persist;
      },
    setTemplate:(state,action)=>{
      state.template = action.payload
    },
    resetResume: () => initialState,
    addResume: (state, action) => {
      return { ...action.payload }; // Replace the entire state with the payload
    },
  },
})

// Action creators are generated for each case reducer function
export const {resetResume,addResume, setHeading,clearPersist, setTemplate, setEducation,clearExperience,clearProjects,clearSkills, setExperience, setProjects, setSkills, setAdditionalSections, clearEducation } = resumeSlice.actions

export default resumeSlice.reducer