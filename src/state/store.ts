import { combineReducers } from 'redux'
import { todolistsReducer } from './todolists-reducer'
import { tasksReducer } from './tasks-reducer'

// New update says that we don't need to use redux by itself. Instead we need to use Redux toolkit. In this toolkit there is not a method createStore but configureStore
import { legacy_createStore as createStore } from 'redux'
//import { TasksStateType, TodolistType } from '../AppWithRedux'

const rootReducer = combineReducers({
	todolists: todolistsReducer,
	tasks: tasksReducer,
})

// We can create a type for reducers by hand but it is not good for future extension
// type AppRootState = {
// 	todolists: Array<TodolistType>
// 	tasks: TasksStateType
// }

export const store = createStore(rootReducer)

export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store
