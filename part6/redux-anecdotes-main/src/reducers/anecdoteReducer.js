import { createSlice } from "@reduxjs/toolkit"

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    setAnecdotes(state, action) {
      return action.payload
    },
    voteAnecdote(state, action) {
      const id = action.payload
      const anecdote = state.find(a => a.id === id)
      anecdote.votes += 1
    },
    createAnecdote(state, action) {
      state.push(action.payload)
    }
  }
})

export const { setAnecdotes, voteAnecdote, createAnecdote } =
  anecdoteSlice.actions

export default anecdoteSlice.reducer
