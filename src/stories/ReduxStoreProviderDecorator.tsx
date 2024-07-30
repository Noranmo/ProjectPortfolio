import { Provider } from 'react-redux'
import { AppRootStateType } from '../state/store'
import { combineReducers } from 'redux'
import { tasksReducer } from '../state/tasks-reducer'
import { todolistsReducer } from '../state/todolists-reducer'
import { v1 } from 'uuid'
import { legacy_createStore as createStore } from 'redux'

const rootReducer = combineReducers({
	tasks: tasksReducer,
	todolists: todolistsReducer,
})

const initialGlobalState = {
	todolists: [
		{ id: 'todolistId1', title: 'What to learn', filter: 'all' },
		{ id: 'todolistId2', title: 'What to buy', filter: 'all' },
	],
	tasks: {
		['todolistId1']: [
			{ id: v1(), title: 'HTML&CSS', isDone: true },
			{ id: v1(), title: 'JS', isDone: true },
			{ id: v1(), title: 'AndriiJS', isDone: false },
		],
		['todolistId2']: [
			{ id: v1(), title: 'Milk', isDone: true },
			{ id: v1(), title: 'React Book', isDone: true },
		],
	},
}

// Показує помилки при запуску npm start, npm run storybook все працює
// export const storyBookStore = createStore(
// 	rootReducer,
// 	initialGlobalState as AppRootStateType
// )

export const storyBookStore = createStore(rootReducer)

export const ReduxStoreProviderDecorator = (storyFn: any) => (
	<Provider store={storyBookStore}>{storyFn()}</Provider>
)
