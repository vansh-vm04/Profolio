import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  heading: {},
  education: [],
  experience: [],
  projects: [],
  skills: [],
  template: "p1",
};

export const resumeSlice = createSlice({
  name: "resume",
  initialState,
  reducers: {
    setHeading: (state, action) => {
      state.heading = {
        ...state.heading,
        ...action.payload,
      };
    },
    setImageUrl:(state,action)=>{
      state.heading.image = action.payload;
    },
    setEducation: (state, action) => {
      state.education = [...state.education, { ...action.payload }];
    },
    removeEducation: (state, action) => {
      state.education = state.education.filter(
        (_, index) => index !== action.payload
      );
    },

    clearEducation: (state) => {
      state.education = [];
    },
    setExperience: (state, action) => {
      state.experience = [...state.experience, { ...action.payload }];
    },
    clearExperience: (state) => {
      state.experience = [];
    },
    removeExperience: (state, action) => {
      state.experience = state.experience.filter(
        (_, index) => index !== action.payload
      );
    },
    setProjects: (state, action) => {
      state.projects = [...state.projects, { ...action.payload }];
    },
    removeProjects: (state, action) => {
      state.projects = state.projects.filter(
        (_, index) => index !== action.payload
      );
    },
    clearProjects: (state) => {
      state.projects = [];
    },
    setSkills: (state, action) => {
      state.skills = [...action.payload];
    },
    clearSkills: (state) => {
      state.skills = [];
    },
    setAdditionalSections: (state, action) => {
      // console.log('Payload:', action.payload);
      state.additionalSections = {
        ...state.additionalSections,
        ...action.payload,
      };
    },
    clearPersist: (state) => {
      delete state._persist;
    },
    setTemplate: (state, action) => {
      state.template = action.payload;
    },
    resetResume: () => initialState,
    addResume: (state, action) => {
      return { ...action.payload }; // Replace the entire state with the payload
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  resetResume,
  addResume,
  setHeading,
  clearPersist,
  setTemplate,
  setEducation,
  clearExperience,
  clearProjects,
  clearSkills,
  setExperience,
  setProjects,
  setSkills,
  setAdditionalSections,
  clearEducation,
  removeEducation,
  removeExperience,
  removeProjects,
  setImageUrl
} = resumeSlice.actions;

export default resumeSlice.reducer;
