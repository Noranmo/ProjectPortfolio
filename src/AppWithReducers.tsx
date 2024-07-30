import './styles/App.css'
import { TasksType } from './components/Todolist'
import { Todolist } from './components/Todolist'
import { useReducer, useState } from 'react'
import { v1 } from 'uuid'
import { AddItemForm } from './components/AddItemForm'

import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import { Container, Grid, Paper } from '@mui/material'
import {
	addTodolistAC,
	changeTodolistFilterAC,
	changeTodolistTitleAC,
	removeTodolistAC,
	todolistsReducer,
} from './state/todolists-reducer'
import {
	addTaskAC,
	changeTaskStatusAC,
	changeTaskTitleAC,
	removeTaskAC,
	tasksReducer,
} from './state/tasks-reducer'

export type FilterValuesType = 'all' | 'completed' | 'active'
export type TodolistType = {
	id: string
	title: string
	filter: FilterValuesType
}
// бібліотека uuid для генерації унікальних id (для додачі нових тасків, щоб не паритись з прорахуванням нових id)

export type TasksStateType = {
	[key: string]: Array<TasksType>
}

function AppWithReducers() {
	let todolistId1 = v1()
	let todolistId2 = v1()

	let [todolists, dispatchTodolistsReducer] = useReducer(todolistsReducer, [
		{ id: todolistId1, title: 'What to learn', filter: 'active' },
		{ id: todolistId2, title: 'What to buy', filter: 'completed' },
	])
	let [tasksObj, dispatchToTasksReducer] = useReducer(tasksReducer, {
		// Вкриваємо [] тому, що не треба нам нова властивість todolistId1, а нам треба велью вже існуючого (тобто стрінг ключ від v1())
		[todolistId1]: [
			{ id: v1(), title: 'HTML&CSS', isDone: true },
			{ id: v1(), title: 'React', isDone: true },
		],
		[todolistId2]: [
			{ id: v1(), title: 'Book', isDone: false },
			{ id: v1(), title: 'Milk', isDone: true },
		],
	})
	//Function for tasksObj setTasks
	function removeTask(id: string, todolistId: string) {
		const action = removeTaskAC(id, todolistId)
		dispatchToTasksReducer(action)
	}

	function addTask(title: string, todolistId: string) {
		const action = addTaskAC(title, todolistId)
		dispatchToTasksReducer(action)
	}

	function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
		const action = changeTaskStatusAC(taskId, isDone, todolistId)
		dispatchToTasksReducer(action)
	}

	function changeTaskTitle(
		taskId: string,
		newTitle: string,
		todolistId: string
	) {
		// const action = changeTaskTitleAC(taskId, newTitle, todolistId)
		// dispatchToTasksReducer(action)

		// Second variant
		dispatchToTasksReducer(changeTaskTitleAC(taskId, newTitle, todolistId))
	}
	// Functions for todolists, setTodolists
	function changeFilter(value: FilterValuesType, todolistId: string) {
		dispatchTodolistsReducer(changeTodolistFilterAC(value, todolistId))
	}

	let removeTodolist = (todolistId: string) => {
		const action = removeTodolistAC(todolistId)
		dispatchToTasksReducer(action)
		dispatchTodolistsReducer(action)
	}

	function changeTodolistTitle(id: string, newTitle: string) {
		dispatchTodolistsReducer(changeTodolistTitleAC(newTitle, id))
	}

	function addTodolist(title: string) {
		const action = addTodolistAC(title)
		dispatchToTasksReducer(action)
		dispatchTodolistsReducer(action)
	}

	return (
		<div className='App'>
			<AppBar position='static'>
				<Toolbar>
					<IconButton edge='start' color='inherit' aria-label='menu'>
						<MenuIcon />
					</IconButton>
					<Typography variant='h6'>News</Typography>
					<Button color='inherit'>Login</Button>
				</Toolbar>
			</AppBar>

			<Container fixed>
				<Grid container style={{ padding: '20px 0px 20px' }}>
					<AddItemForm addItem={addTodolist} />
				</Grid>
				<Grid container spacing={5}>
					{todolists.map(tl => {
						let tasksForTodoList = tasksObj[tl.id]
						if (tl.filter === 'completed') {
							tasksForTodoList = tasksForTodoList.filter(t => t.isDone === true)
						}
						if (tl.filter === 'active') {
							tasksForTodoList = tasksForTodoList.filter(
								t => t.isDone === false
							)
						}
						return (
							<Grid item>
								<Paper style={{ padding: '10px' }}>
									<Todolist
										key={tl.id}
										id={tl.id}
										title={tl.title}
										filter={tl.filter}
										tasks={tasksForTodoList}
										removeTask={removeTask}
										changeFilter={changeFilter}
										addTask={addTask}
										changeStatus={changeStatus}
										changeTaskTitle={changeTaskTitle}
										removeTodolist={removeTodolist}
										changeTodolistTitle={changeTodolistTitle}
									/>
								</Paper>
							</Grid>
						)
					})}
				</Grid>
			</Container>
		</div>
	)
}

export default AppWithReducers
