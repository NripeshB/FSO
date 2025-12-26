import { createSlice } from "@reduxjs/toolkit"

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    setAnecdotes(state, action) {
      return action.payload
    },
    updateAnecdote(state, action) {
      const updated = action.payload
      return state.map(a =>
        a.id !== updated.id ? a : updated
      )
    },
    createAnecdote(state, action) {
      state.push(action.payload)
    }
  }
})


export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const response = await fetch('http://localhost:3001/anecdotes')
    const data = await response.json()
    dispatch(setAnecdotes(data))
  }
}

export const updateVote = (anecdote) => {
  return async (dispatch) => {
    const updated = { ...anecdote, votes: anecdote.votes + 1 }

    const response = await fetch(
      `http://localhost:3001/anecdotes/${anecdote.id}`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated)
      }
    )

    const saved = await response.json()
    dispatch(updateAnecdote(saved))
  }
}



export const appendAnecdote = (content) => {
  return async (dispatch) => {
    const response = await fetch('http://localhost:3001/anecdotes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content, votes: 0 })
    })
    const saved = await response.json()
    dispatch(createAnecdote(saved))
  }
}


export const { setAnecdotes, updateAnecdote, createAnecdote } =
  anecdoteSlice.actions


export default anecdoteSlice.reducer
