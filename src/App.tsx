import './styles/App.css'
import { TasksType } from './components/Todolist'
import { Todolist } from './components/Todolist'
import { useState } from 'react'
import { v1 } from 'uuid'
import { AddItemForm } from './components/AddItemForm'

import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import { Container, Grid, Paper } from '@mui/material'

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

function App() {
	let todolistId1 = v1()
	let todolistId2 = v1()

	let [todolists, setTodolists] = useState<Array<TodolistType>>([
		{ id: todolistId1, title: 'What to learn', filter: 'active' },
		{ id: todolistId2, title: 'What to buy', filter: 'completed' },
	])
	let [tasksObj, setTasks] = useState<TasksStateType>({
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
		let tasks = tasksObj[todolistId]
		let filteredTasks = tasks.filter(t => t.id !== id)
		tasksObj[todolistId] = filteredTasks

		setTasks({ ...tasksObj })
	}

	function addTask(title: string, todolistId: string) {
		let newTask = { id: v1(), title: title, isDone: false }
		let tasks = tasksObj[todolistId]
		let newTasks = [newTask, ...tasks]
		tasksObj[todolistId] = newTasks

		setTasks({ ...tasksObj })
	}

	function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
		let tasks = tasksObj[todolistId]
		let task = tasks.find(t => {
			return t.id === taskId
		})
		if (task) {
			task.isDone = isDone

			setTasks({ ...tasksObj })
		}
	}

	function changeTaskTitle(
		taskId: string,
		newTitle: string,
		todolistId: string
	) {
		let tasks = tasksObj[todolistId]
		let task = tasks.find(t => {
			return t.id === taskId
		})
		if (task) {
			task.title = newTitle

			setTasks({ ...tasksObj })
		}
	}
	// Functions for todolists, setTodolists
	function changeFilter(value: FilterValuesType, todolistId: string) {
		let todolist = todolists.find(tl => tl.id === todolistId)
		if (todolist) {
			todolist.filter = value
			setTodolists([...todolists])
		}
	}
	let removeTodolist = (todolistId: string) => {
		let filteredTodolist = todolists.filter(tl => tl.id !== todolistId)
		setTodolists(filteredTodolist)
		delete tasksObj[todolistId]
		setTasks({ ...tasksObj })
	}

	function changeTodolistTitle(id: string, newTitle: string) {
		const todolist = todolists.find(tl => tl.id === id)
		if (todolist) {
			todolist.title = newTitle
			setTodolists([...todolists])
		}
	}

	function addTodolist(title: string) {
		let todolist: TodolistType = {
			id: v1(),
			filter: 'all',
			title: title,
		}
		setTodolists([todolist, ...todolists])
		setTasks({
			...tasksObj,
			[todolist.id]: [],
		})
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

export default App
