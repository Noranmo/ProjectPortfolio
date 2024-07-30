import axios from 'axios'

const settings = {
	// інформація про залогування/ авторизацію зберігається в браузері
	withCredentials: true,
	headers: {
		'API-KEY': 'f6ad1d57-e113-43a5-8f7a-42de34255529',
	},
}

const instance = axios.create({
	baseURL: 'https://social-network.samuraijs.com/api/1.1/',
	...settings,
})

export type TodolistType = {
	id: string
	title: string
	addedDate: string
	order: number
}
// Все це можна побачити як в Network, так і в API Documentation
// type CreateTodolistResponseType = {
// 	resultCode: number
// 	messages: Array<string>
// 	data: {
// 		item: TodolistType
// 	}
// }

// type DeleteUpdateTodolistResponceType = {
// 	resultCode: number
// 	messages: Array<string>
// 	data: {}
// }

type ResponceType<D = {}> = {
	resultCode: number
	messages: Array<string>
	data: D
}

export type TaskType = {
	description: string
	title: string
	status: number
	priority: number
	startDate: string
	deadline: string
	id: string
	todoListId: string
	order: number
	addedDate: string
}

export type UpdateTaskModel = {
	title: string
	description: string
	status: number
	priority: number
	startDate: string
	deadline: string
}

type GetTasksResponce = {
	error: string | null
	totalCount: number
	items: TaskType[]
}

export const todolistsAPI = {
	getTodolists() {
		const promise = instance.get<Array<TodolistType>>('todo-lists')
		return promise
	},
	// createTodolists(title: string) {
	// 	const promise = axios.post<ResponceType<{ item: TodolistType }>>(
	// 		// second parametr is payload for the server, and title it is a required parametr that should be sent in order to create a todolist by API & you also should send the API KEY (also requested by API)
	// 		'https://social-network.samuraijs.com/api/1.1/todo-lists',
	// 		{ title: title },
	// 		settings
	// 	)
	// 	return promise
	// },
	createTodolists(title: string) {
		const promise = instance.post<ResponceType<{ item: TodolistType }>>(
			'todo-lists',
			{ title: title }
		)
		return promise
	},
	deleteTodolists(todolistId: string) {
		const promise = instance.delete<ResponceType>(
			// second parametr is payload for the server, and title it is a required parametr that should be sent in order to create a todolist by API & you also should send the API KEY (also requested by API)
			// All Alowed Methods is stored on ready backend side https://social-network.samuraijs.com/docs?type=todolist#
			// For deleting we need to put id of todolist, if we are not mentioned it, it will show 405 error(method not allowed)
			// 'https://social-network.samuraijs.com/api/1.1/todo-lists/' + todolistId
			// That is because of instance of axios
			`todo-lists/${todolistId}`
		)
		return promise
	},
	updateTodolists(todolistId: string, title: string) {
		// const todolistId = '8a5028bd-dfe6-4a2c-93cc-92f03ae1a84e'
		const promise = instance.put<ResponceType>(
			// second parametr is payload for the server, and title it is a required parametr that should be sent in order to change a todolist title by API & you also should send the API KEY (also requested by API)
			// Also you need to send the id of todolist that should be updated
			`todo-lists/${todolistId}`,
			{ title: title }
		)
		return promise
	},
	getTasks(todolistId: string) {
		// const promise = instance.get<GetTasksResponce>(
		// 	`todo-lists/${todolistId}/tasks`
		// )
		// return promise
		return instance.get<GetTasksResponce>(`todo-lists/${todolistId}/tasks`)
	},
	deleteTask(todolistId: string, taskId: string) {
		return instance.delete<ResponceType>(
			`todo-lists/${todolistId}/tasks/${taskId}`
		)
	},
	updateTask(todolistId: string, taskId: string, title: string) {
		return instance.put<ResponceType<{ item: TaskType }>>(
			`todo-lists/${todolistId}/tasks/${taskId}`,
			{ title }
		)
	},
	createTask(todolistId: string, title: string) {
		return instance.post<ResponceType<{ item: TaskType }>>(
			`todo-lists/${todolistId}/tasks`,
			{
				title: title,
			}
		)
	},
}
