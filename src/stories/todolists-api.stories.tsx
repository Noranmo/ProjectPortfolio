import { useEffect, useState } from 'react'
import { UpdateTaskModel, todolistsAPI } from '../api/todolist-api'

export default {
	title: 'API',
}
// Без цих налаштувань, запит на сервер буде видавати помилку 401 (не авторизований)

export const GetTodoLists = () => {
	const [state, setState] = useState<any>(null)
	useEffect(() => {
		// Тут зробимо запит, а відповідь закинемо у state
		// let promise = axios.get(
		// 	'https://social-network.samuraijs.com/api/1.1/todo-lists',
		// 	settings
		// )
		// promise.then(res => {
		// 	setState(res.data)
		// })
		// Ми інкапсулювали код з axios окремо в папку API, бо React - це про фронтенд
		todolistsAPI.getTodolists().then(res => {
			setState(res.data)
		})
	}, [])
	return <div>{JSON.stringify(state)}</div>
}

export const CreateTodoLists = () => {
	const [state, setState] = useState<any>(null)
	useEffect(() => {
		todolistsAPI.createTodolists('New todolist').then(res => {
			setState(res.data)
		})
	}, [])
	return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodoLists = () => {
	const [state, setState] = useState<any>(null)
	useEffect(() => {
		// Тут зробимо запит, а відповідь закинемо у state
		const todolistId = '7f04e75f-a361-48f5-8c1f-22d57856b372'
		todolistsAPI.deleteTodolists(todolistId).then(res => {
			setState(res.data)
		})
	}, [])
	return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodoLists = () => {
	const [state, setState] = useState<any>(null)
	useEffect(() => {
		// Тут зробимо запит, а відповідь закинемо у state
		const todolistId = '8a5028bd-dfe6-4a2c-93cc-92f03ae1a84e'
		todolistsAPI.updateTodolists(todolistId, 'Updated title').then(res => {
			setState(res.data)
		})
	}, [])
	return <div>{JSON.stringify(state)}</div>
}

export const GetTasks = () => {
	const [state, setState] = useState<any>(null)
	useEffect(() => {
		// Тут зробимо запит, а відповідь закинемо у state
		const todolistId = '8a5028bd-dfe6-4a2c-93cc-92f03ae1a84e'
		todolistsAPI.getTasks(todolistId).then(res => {
			setState(res.data)
		})
	}, [])
	return <div>{JSON.stringify(state)}</div>
}
// export const GetTasks = () => {
// 	const [state, setState] = useState<any>(null)
// 	const [todolistId, setTodolistId] = useState<string>('')

// 	const getTasks = () => {
// 		todolistsAPI.getTasks(todolistId).then(res => {
// 			setState(res.data)
// 		})
// 	}
// 	return (
// 		<div>
// 			<input
// 				placeholder={'todolistId'}
// 				value={todolistId}
// 				onChange={e => {
// 					setTodolistId(e.currentTarget.value)
// 				}}
// 			/>
// 			<button onClick={getTasks}>Get tasks from Todolist</button>
// 		</div>
// 	)
// }

// export const DeleteTask = () => {
// 	const [state, setState] = useState<any>(null)
// 	useEffect(() => {
// 		// Тут зробимо запит, а відповідь закинемо у state
// 		const todolistId = '8a5028bd-dfe6-4a2c-93cc-92f03ae1a84e'
// 		const taskId = '7295bd87-d613-4162-b0c1-047639c59221'
// 		todolistsAPI.deleteTask(todolistId, taskId).then(res => {
// 			setState(res.data)
// 		})
// 	}, [])
// 	return <div>{JSON.stringify(state)}</div>
// }
export const DeleteTask = () => {
	const [state, setState] = useState<any>(null)
	const [taskId, setTaskId] = useState<string>('')
	const [todolistId, setTodolistId] = useState<string>('')

	const deleteTask = () => {
		todolistsAPI.deleteTask(todolistId, taskId).then(res => {
			setState(res.data)
		})
	}
	return (
		<div>
			<input
				placeholder={'todolistId'}
				value={todolistId}
				onChange={e => {
					setTodolistId(e.currentTarget.value)
				}}
			/>
			<input
				placeholder={'taskId'}
				value={taskId}
				onChange={e => {
					setTaskId(e.currentTarget.value)
				}}
			/>
			<button onClick={deleteTask}>Delete task</button>
		</div>
	)
}

export const UpdateTask = () => {
	const [state, setState] = useState<any>(null)
	useEffect(() => {
		// Тут зробимо запит, а відповідь закинемо у state
		const todolistId = '8a5028bd-dfe6-4a2c-93cc-92f03ae1a84e'
		const taskId = '8e466192-10d4-4fe6-ac8f-ff21d9561f18'
		let newTitle = 'New title is Andrii Box'

		todolistsAPI.updateTask(todolistId, taskId, newTitle).then(res => {
			setState(res.data)
		})
	}, [])
	return <div>{JSON.stringify(state)}</div>
}

export const CreateTask = () => {
	const [state, setState] = useState<any>(null)
	useEffect(() => {
		// Тут зробимо запит, а відповідь закинемо у state
		const todolistId = '8a5028bd-dfe6-4a2c-93cc-92f03ae1a84e'
		todolistsAPI.createTask(todolistId, 'Task title is Ledo').then(res => {
			setState(res.data)
		})
	}, [])
	return <div>{JSON.stringify(state)}</div>
}
