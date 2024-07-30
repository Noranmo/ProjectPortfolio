import { v1 } from 'uuid'
import { TasksStateType } from '../App'
import {
	AddTodolistActionType,
	RemoveTodolistActionType,
	todolistId1,
} from './todolists-reducer'

type RemoveTaskActionType = {
	type: 'REMOVE-TASK'
	todolistId: string
	taskId: string
}
type AddTaskActionType = {
	type: 'ADD-TASK'
	title: string
	todolistId: string
}
type ChangeTaskStatusActionType = {
	type: 'CHANGE-TASK-STATUS'
	taskId: string
	isDone: boolean
	todolistId: string
}
type ChangeTaskTitleActionType = {
	type: 'CHANGE-TASK-TITLE'
	taskId: string
	title: string
	todolistId: string
}

type ActionsType =
	| RemoveTaskActionType
	| AddTaskActionType
	| ChangeTaskStatusActionType
	| ChangeTaskTitleActionType
	| AddTodolistActionType
	| RemoveTodolistActionType

const initialState: TasksStateType = {
	[todolistId1]: [],
	//[todolistId1]: [{ id: v1(), title: 'HTML&CSS', isDone: true }],
}

export const tasksReducer = (
	state: TasksStateType = initialState,
	action: ActionsType
): TasksStateType => {
	switch (action.type) {
		case 'REMOVE-TASK': {
			const stateCopy = { ...state }
			const tasks = state[action.todolistId]
			const filteredTasks = tasks.filter(t => t.id !== action.taskId)
			stateCopy[action.todolistId] = filteredTasks

			return stateCopy
		}
		case 'ADD-TASK': {
			const stateCopy = { ...state }
			const tasks = stateCopy[action.todolistId]
			const newTask = { id: v1(), title: action.title, isDone: false }
			const newTasks = [newTask, ...tasks]
			stateCopy[action.todolistId] = newTasks
			return stateCopy
		}
		case 'CHANGE-TASK-STATUS': {
			// const stateCopy = { ...state }
			// let tasks = stateCopy[action.todolistId]
			// stateCopy[action.todolistId] = tasks.map(t =>
			// 	t.id === action.taskId ? { ...t, isDone: action.isDone } : t
			// )

			// return stateCopy
			let tasks = state[action.todolistId]
			state[action.todolistId] = tasks.map(t =>
				t.id === action.taskId ? { ...t, isDone: action.isDone } : t
			)
			return { ...state }
		}
		case 'CHANGE-TASK-TITLE': {
			// const stateCopy = { ...state }
			// let tasks = stateCopy[action.todolistId]
			// let task = tasks.find(t => {
			// 	return t.id === action.taskId
			// })
			// if (task) {
			// 	task.title = action.title
			// }
			// return stateCopy
			let tasks = state[action.todolistId]
			state[action.todolistId] = tasks.map(t =>
				t.id === action.taskId ? { ...t, title: action.title } : t
			)

			return { ...state }
		}
		case 'ADD-TODOLIST': {
			const stateCopy = { ...state }

			stateCopy[action.todolistId] = []

			return stateCopy
		}
		case 'REMOVE-TODOLIST': {
			const stateCopy = { ...state }
			delete stateCopy[action.id]
			return stateCopy
		}

		default:
			// If we use Reducer in React we should keep it as it is. But in case of Redux Reducer, we have the situation when all Reducers we keep in one rootReducer, so if there is no known type we should just return the state without changes
			return state
		// throw new Error("I don't understand this action type")
	}
}

// Function Action creator
export const removeTaskAC = (
	taskId: string,
	todolistId: string
): RemoveTaskActionType => {
	return { type: 'REMOVE-TASK', todolistId: todolistId, taskId: taskId }
}

export const addTaskAC = (
	title: string,
	todolistId: string
): AddTaskActionType => {
	return { type: 'ADD-TASK', title, todolistId }
}

export const changeTaskStatusAC = (
	taskId: string,
	isDone: boolean,
	todolistId: string
): ChangeTaskStatusActionType => {
	return {
		type: 'CHANGE-TASK-STATUS',
		taskId: taskId,
		isDone: isDone,
		todolistId: todolistId,
	}
}

export const changeTaskTitleAC = (
	taskId: string,
	title: string,
	todolistId: string
): ChangeTaskTitleActionType => {
	return {
		type: 'CHANGE-TASK-TITLE',
		taskId: taskId,
		title: title,
		todolistId: todolistId,
	}
}
