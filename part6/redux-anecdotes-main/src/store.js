
import { configureStore } from '@reduxjs/toolkit'

import anecdoteReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/setFilterReducer'

const store = configureStore({
    reducer:{
         anecdotes: anecdoteReducer,
        filter: filterReducer
    }
})

export default store