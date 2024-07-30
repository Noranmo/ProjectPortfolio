import { v1 } from 'uuid'
import {
	addTodolistAC,
	changeTodolistFilterAC,
	changeTodolistTitleAC,
	removeTodolistAC,
	todolistsReducer,
} from './todolists-reducer'
import { FilterValuesType, TodolistType } from '../App'

test('correct todolist should be removed', () => {
	let todolistId1 = v1()
	let todolistId2 = v1()

	const startState: Array<TodolistType> = [
		{ id: todolistId1, title: 'What to learn', filter: 'all' },
		{ id: todolistId2, title: 'What to buy', filter: 'all' },
	]

	// const endState = todolistsReducer(startState, {
	// 	type: 'REMOVE-TODOLIST',
	// 	id: todolistId1,
	// })
	// Use the Function Action Creator
	const endState = todolistsReducer(startState, removeTodolistAC(todolistId1))

	expect(endState.length).toBe(1)
	expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be added with title', () => {
	let todolistId1 = v1()
	let todolistId2 = v1()

	let newTodolisttitle = 'New Todolist'

	const startState: Array<TodolistType> = [
		{ id: todolistId1, title: 'What to learn', filter: 'all' },
		{ id: todolistId2, title: 'What to buy', filter: 'all' },
	]

	// const endState = todolistsReducer(startState, {
	// 	type: 'ADD-TODOLIST',
	// 	title: newTodolisttitle,
	// })

	const endState = todolistsReducer(startState, addTodolistAC(newTodolisttitle))

	expect(endState.length).toBe(3)
	expect(endState[0].title).toBe(newTodolisttitle)
	expect(endState[2].filter).toBe('all')
})

test('correct todolist change its name', () => {
	let todolistId1 = v1()
	let todolistId2 = v1()

	let newTodolisttitle = 'New Todolist'

	const startState: Array<TodolistType> = [
		{ id: todolistId1, title: 'What to learn', filter: 'all' },
		{ id: todolistId2, title: 'What to buy', filter: 'all' },
	]

	// const action = {
	// 	type: 'CHANGE-TODOLIST-TITLE',
	// 	id: todolistId2,
	// 	title: newTodolisttitle,
	// }

	const endState = todolistsReducer(
		startState,
		changeTodolistTitleAC(newTodolisttitle, todolistId2)
	)

	expect(endState[0].title).toBe('What to learn')
	expect(endState[1].title).toBe(newTodolisttitle)
})

test('correct filter of todolist should be changed', () => {
	let todolistId1 = v1()
	let todolistId2 = v1()

	let newFilter: FilterValuesType = 'completed'

	const startState: Array<TodolistType> = [
		{ id: todolistId1, title: 'What to learn', filter: 'all' },
		{ id: todolistId2, title: 'What to buy', filter: 'all' },
	]

	// const action: ChangeTodolistFilterActionType = {
	// 	type: 'CHANGE-TODOLIST-FILTER',
	// 	id: todolistId2,
	// 	filter: newFilter,
	// }

	const endState = todolistsReducer(
		startState,
		changeTodolistFilterAC(newFilter, todolistId2)
	)

	expect(endState[0].filter).toBe('all')
	expect(endState[1].filter).toBe(newFilter)
})
