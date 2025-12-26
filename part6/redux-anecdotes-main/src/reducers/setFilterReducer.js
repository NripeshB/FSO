


// const SET_FILTER = 'SET_FILTER'

// export const setFilter =(value)=>{
    //     return {
        //         type: SET_FILTER,
        //         payload: value
        //     }
        // }
        
        // (state = '', action)=>{
            //     switch (action.type){
                //         case SET_FILTER:
                //             {
                    //                 return action.payload
                    //             }
                    //         default:
                    //             return state
                    //     }
                    // }
                    
                    // export default filterReducer
import { createSlice } from "@reduxjs/toolkit"

const filterSlice = createSlice({
    name: 'filter',
    initialState: '',
    reducers:{
        setFilter(state, action){
            return action.payload
        }
    }
})

export const { setFilter } = filterSlice.actions
export default filterSlice.reducer