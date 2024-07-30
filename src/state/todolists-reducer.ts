import { v1 } from 'uuid'
import { FilterValuesType, TodolistType } from '../App'

// type ActionType = {
// 	type: string
// 	[key: string]: any
// }

export type RemoveTodolistActionType = {
	type: 'REMOVE-TODOLIST'
	id: string
}
export type AddTodolistActionType = {
	type: 'ADD-TODOLIST'
	title: string
	todolistId: string
}
export type ChangeTodolistTitleActionType = {
	type: 'CHANGE-TODOLIST-TITLE'
	title: string
	id: string
}
export type ChangeTodolistFilterActionType = {
	type: 'CHANGE-TODOLIST-FILTER'
	filter: FilterValuesType
	id: string
}

type ActionsType =
	| RemoveTodolistActionType
	| AddTodolistActionType
	| ChangeTodolistTitleActionType
	| ChangeTodolistFilterActionType

export let todolistId1 = v1()
export let todolistId2 = v1()

const initialState: Array<TodolistType> = [
	{ id: todolistId1, title: 'Unsorted', filter: 'all' },
	// { id: todolistId2, title: 'What to buy', filter: 'completed' },
]

export const todolistsReducer = (
	state: Array<TodolistType> = initialState,
	action: ActionsType
): Array<TodolistType> => {
	switch (action.type) {
		case 'REMOVE-TODOLIST': {
			return state.filter(tl => tl.id !== action.id)
		}
		case 'ADD-TODOLIST': {
			return [
				{
					id: action.todolistId,
					filter: 'all',
					title: action.title,
				},
				...state,
			]
		}
		case 'CHANGE-TODOLIST-TITLE': {
			const todolist = state.find(tl => tl.id === action.id)
			if (todolist) {
				todolist.title = action.title
			}
			return [...state]
		}
		case 'CHANGE-TODOLIST-FILTER': {
			const todolist = state.find(tl => tl.id === action.id)
			if (todolist) {
				todolist.filter = action.filter
			}
			return [...state]
		}

		default:
			return state
		// throw new Error("I don't understand this action type")
	}
}

// Function Action creator
export const removeTodolistAC = (
	todolistId: string
): RemoveTodolistActionType => {
	return { type: 'REMOVE-TODOLIST', id: todolistId }
}

export const addTodolistAC = (title: string): AddTodolistActionType => {
	return { type: 'ADD-TODOLIST', title: title, todolistId: v1() }
}

export const changeTodolistFilterAC = (
	filter: FilterValuesType,
	id: string
): ChangeTodolistFilterActionType => {
	return { type: 'CHANGE-TODOLIST-FILTER', filter, id }
}

export const changeTodolistTitleAC = (
	title: string,
	id: string
): ChangeTodolistTitleActionType => {
	return { type: 'CHANGE-TODOLIST-TITLE', title: title, id }
}
