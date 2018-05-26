import { createAction, handleActions } from 'redux-actions'

const initialState = {
  username: '',
  theme: 0,
}

export const updateTheme = createAction('UPDATE_THEME')

export const setUsername = createAction('SET_USERNAME')

export const updateUser = createAction('UPDATE_USER')

export default handleActions(
  {
    SET_USERNAME(state, { payload: username }) {
      return { ...state, username }
    },

    UPDATE_USER(state, { payload: user }) {
      return { ...state, ...user }
    },

    UPDATE_THEME(state, { payload: theme }) {
      return { ...state, theme }
    },
  },
  initialState,
)
