import './styles/App.css'
import { TasksType } from './components/Todolist'
import { Todolist } from './components/Todolist'
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
} from './state/todolists-reducer'
import {
	addTaskAC,
	changeTaskStatusAC,
	changeTaskTitleAC,
	removeTaskAC,
} from './state/tasks-reducer'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { AppRootStateType } from './state/store'
import { useCallback } from 'react'

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

function AppWithRedux() {
	const todolists = useSelector<AppRootStateType, Array<TodolistType>>(
		state => state.todolists
	)
	const tasks = useSelector<AppRootStateType, TasksStateType>(
		state => state.tasks
	)
	const dispatch = useDispatch()

	//Function for tasksObj setTasks
	const removeTask = useCallback(
		(id: string, todolistId: string) => {
			const action = removeTaskAC(id, todolistId)
			dispatch(action)
		},
		[dispatch]
	)

	const addTask = useCallback(
		(title: string, todolistId: string) => {
			const action = addTaskAC(title, todolistId)
			dispatch(action)
		},
		[dispatch]
	)

	const changeStatus = useCallback(
		(taskId: string, isDone: boolean, todolistId: string) => {
			const action = changeTaskStatusAC(taskId, isDone, todolistId)
			dispatch(action)
		},
		[dispatch]
	)

	const changeTaskTitle = useCallback(
		(taskId: string, newTitle: string, todolistId: string) => {
			// Second variant
			dispatch(changeTaskTitleAC(taskId, newTitle, todolistId))
		},
		[dispatch]
	)
	// Functions for todolists, setTodolists
	const changeFilter = useCallback(
		(value: FilterValuesType, todolistId: string) => {
			dispatch(changeTodolistFilterAC(value, todolistId))
		},
		[dispatch]
	)

	const removeTodolist = useCallback(
		(todolistId: string) => {
			const action = removeTodolistAC(todolistId)
			dispatch(action)
		},
		[dispatch]
	)

	const changeTodolistTitle = useCallback(
		(id: string, newTitle: string) => {
			dispatch(changeTodolistTitleAC(newTitle, id))
		},
		[dispatch]
	)
	// before React.memo  => function addTodolist(title: string)
	const addTodolist = useCallback(
		(title: string) => {
			const action = addTodolistAC(title)
			dispatch(action)
		},
		[dispatch]
	)

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
						let allTodolistTasks = tasks[tl.id]
						let tasksForTodoList = allTodolistTasks

						// if (tl.filter === 'completed') {
						// 	tasksForTodoList = allTodolistTasks.filter(t => t.isDone === true)
						// }
						// if (tl.filter === 'active') {
						// 	tasksForTodoList = allTodolistTasks.filter(
						// 		t => t.isDone === false
						// 	)
						// }

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

export default AppWithRedux
