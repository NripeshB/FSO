
import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'
import anecdoteReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/setFilterReducer'

const store = configureStore({
    reducer:{
        notification: notificationReducer,
        anecdotes: anecdoteReducer,
        filter: filterReducer
    }
})

export default store