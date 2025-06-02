import { configureStore,combineReducers } from '@reduxjs/toolkit'
import resumeReducer from '../features/resume/resumeSlice'
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from '../features/user/userSlice'

const resumePersistConfig = {
  key: "resume",
  storage,
  whitelist: ["heading","education","experience","projects","skills","additionalSections","template"]
}
const userPersistConfig = {
  key: "user",
  storage,
  whitelist: ["id","username","email","resumes"]
}
const resumePersistedReducer = persistReducer(resumePersistConfig, resumeReducer);
const userPersistedReducer = persistReducer(userPersistConfig, userReducer);

const rootReducer = combineReducers({
  resume: resumePersistedReducer,
  user: userPersistedReducer,
});

const store = configureStore({
  reducer:rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/FLUSH",
          "persist/PAUSE",
          "persist/PURGE",
          "persist/REGISTER",
        ],
      },
    }),
});

const persistor = persistStore(store);

export {store,persistor}