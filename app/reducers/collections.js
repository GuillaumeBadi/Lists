import { handleActions, createAction } from 'redux-actions'

const actions = {
  addCollection: createAction('ADD_COLLECTION'),
  updateCollections: createAction('UPDATE_COLLECTIONS'),
  removeCollection: createAction('REMOVE_COLLECTION'),
  addCollectionItem: createAction('ADD_COLLECTION_ITEM'),
  updateItem: createAction('UPDATE_ITEM'),
  removeItem: createAction('REMOVE_ITEM'),
}

export const removeCollection = name => async dispatch => {
  return dispatch(actions.removeCollection(name))
}

export const addCollection = ({ name, description, tags = [] }) => async (
  dispatch,
  getState,
) => {
  dispatch(actions.addCollection({ name, description, tags }))
}

export const addCollectionItem = ({
  collectionId,
  url,
  domain,
}) => dispatch => {
  return dispatch(actions.addCollectionItem({ url, domain, collectionId }))
}

export const removeItem = ({ url, collectionId }) => dispatch => {
  return dispatch(actions.removeItem({ url, collectionId }))
}

export const updateItem = ({ collectionId, item }) => dispatch => {
  return dispatch(actions.updateItem({ collectionId, item }))
}

const initialState = {
  list: [],
}

export default handleActions(
  {
    UPDATE_COLLECTIONS(state, { payload: list }) {
      return { list }
    },
    REMOVE_COLLECTION(state, { payload: name }) {
      return { list: state.list.filter(e => e.name !== name) }
    },
    ADD_COLLECTION(state, { payload: { name, description, items = [] } }) {
      return { list: [{ name, description, items }, ...state.list] }
    },
    REMOVE_ITEM(state, { payload: { url, collectionId } }) {
      return {
        ...state,
        list: state.list.map(c => {
          if (c.name === collectionId) {
            return {
              ...c,
              items: c.items.filter(i => i.url !== url),
            }
          }
          return c
        }),
      }
    },
    UPDATE_ITEM(state, { payload: { collectionId, item } }) {
      return {
        ...state,
        list: state.list.map(c => {
          if (c.name === collectionId) {
            return {
              ...c,
              items: c.items.map(i => {
                if (i.url === item.url) {
                  return { ...i, ...item }
                }
                return i
              }),
            }
          }
          return c
        }),
      }
    },
    ADD_COLLECTION_ITEM(state, { payload: { collectionId, domain, url } }) {
      return {
        ...state,
        list: state.list.map(e => {
          if (e.name === collectionId) {
            return { ...e, items: [{ domain, url }, ...(e.items || [])] }
          }
          return e
        }),
      }
    },
  },
  initialState,
)
