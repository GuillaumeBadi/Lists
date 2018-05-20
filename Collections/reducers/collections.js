import { handleActions, createAction } from 'redux-actions'

const actions = {
  clean: createAction('CLEAN'),
  clear: createAction('CLEAR'),
  removeCollection: createAction('REMOVE_COLLECTION'),
  removeItem: createAction('REMOVE_ITEM'),
  addCollection: createAction('ADD_COLLECTION'),
  addItem: createAction('ADD_ITEM'),
  updateItem: createAction('UPDATE_ITEM'),
  updateCollections: createAction('UPDATE_COLLECTIONS'),
  updateCollection: createAction('UPDATE_COLLECTION'),
}

export const clean = actions.clean
export const clear = actions.clear

export function removeCollection(id) {
  return (dispatch, getState) => {
    dispatch(actions.removeCollection(id))
    const {
      collections: { items },
    } = getState()
    return items
      .filter(i => i.collectionId === id)
      .forEach(i => dispatch(removeItem(i)))
  }
}

export function updateCollection(collection) {
  return dispatch => {
    return dispatch(actions.updateCollection(collection))
  }
}

export function removeItem(id) {
  return dispatch => dispatch(actions.removeItem(id))
}

export const addCollection = collection => (dispatch, getState) => {
  const {
    collections: { list },
  } = getState()
  const id = `${list.length}`
  dispatch(actions.addCollection({ ...collection, id }))
}

export function addItem({ collectionId, url }) {
  return dispatch => {
    const id = `${collectionId}:${url}`
    dispatch(actions.addItem({ collectionId, url, id }))
    console.log('OK, saved')
    return id
  }
}

export const updateItem = item => dispatch => {
  return dispatch(actions.updateItem(item))
}

const initialState = {
  list: [],
  items: [],
}

export default handleActions(
  {
    CLEAN(state) {
      return {
        ...state,
        list: state.list.filter(e => e.name.length !== 0),
        items: [],
      }
    },
    UPDATE_COLLECTION(state, { payload: collection }) {
      const s = {
        ...state,
        list: state.list.map(
          e => (e.id === collection.id ? { ...e, ...collection } : e),
        ),
      }
      return s
    },
    UPDATE_COLLECTIONS(state, { payload: list }) {
      return { ...state, list }
    },
    REMOVE_COLLECTION(state, { payload: id }) {
      return { ...state, list: state.list.filter(e => e.id !== id) }
    },
    ADD_COLLECTION(state, { payload: collection }) {
      return {
        ...state,
        list: [collection, ...state.list],
      }
    },
    REMOVE_ITEM(state, { payload: id }) {
      return {
        ...state,
        items: state.items.filter(e => e.id !== id),
      }
    },
    UPDATE_ITEM(state, { payload: item }) {
      return {
        ...state,
        items: state.items.map(e => (e.id === item.id ? { ...e, ...item } : e)),
      }
    },
    ADD_ITEM(state, { payload: item }) {
      return {
        ...state,
        items: [item, ...state.items],
      }
    },
  },
  initialState,
)
