import { createAction, handleActions } from 'redux-actions'

const initialState = {
  username: '',
}

export const setUsername = createAction('SET_USERNAME')

export default handleActions(
  {
    SET_USERNAME(state, { payload: username }) {
      return { ...state, username }
    },
  },
  initialState,
)
