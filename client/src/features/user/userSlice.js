import { createSlice } from '@reduxjs/toolkit' 

export const userSlice = createSlice({
  name: 'user',
  initialState:{
    id:"",
    username:"",
    email:"",
    token:"",
    loggedIn:false,
    resumes:[]
},
  reducers: {
    setUser(state, action) {
      const { id, username, email, token, loggedIn } = action.payload;
      state.id = id;
      state.username = username;
      state.email = email;
      state.token = token;
      state.loggedIn = loggedIn;
    },
    setResume(state,action){
      state.resumes = action.payload
    }
}
});

export const {setUser, setResume} = userSlice.actions

export default userSlice.reducer;