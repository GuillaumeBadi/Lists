import { createAction, handleActions } from 'redux-actions'

export const addPage = createAction('ADD_PAGE')

export const getSource = (url, id) => async dispatch => {
  try {
    const response = await fetch(url, {
      method: 'GET',
      redirect: 'follow',
    })
    const source = await response.text()
    return dispatch(
      addPage({
        itemId: id,
        source: source || '<span>Cannot Display Source</span>',
      }),
    )
  } catch (e) {
    console.log('error', e)
  }
}

const initialState = {
  sources: [],
}

export default handleActions(
  {
    ADD_PAGE(state, { payload: source }) {
      return {
        ...state,
        sources: [...state.sources, source],
      }
    },
  },
  initialState,
)
