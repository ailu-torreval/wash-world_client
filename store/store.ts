import { configureStore } from '@reduxjs/toolkit'
import clientReducer from './clientSlice';
import venuesReducer from './venueSlice';
import invoiceReducer from './invoiceSlice';

export const store = configureStore({
  reducer: {
    client: clientReducer,
    venues: venuesReducer,
    invoice: invoiceReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch