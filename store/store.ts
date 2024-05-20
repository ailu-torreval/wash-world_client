import { configureStore } from '@reduxjs/toolkit'
// import categoryReducer from './categorySlice';
// import entryReducer from './entrySlice';
import clientReducer from './clientSlice';
import venuesReducer from './venueSlice';

export const store = configureStore({
  reducer: {
    // entries: entryReducer,
    // categories: categoryReducer,
    client: clientReducer,
    venues: venuesReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch