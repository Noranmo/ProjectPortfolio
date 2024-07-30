import React, { useCallback } from 'react'
import { FilterValuesType } from '../App'
import { AddItemForm } from './AddItemForm'
import { EditableSpan } from './EditableSpan'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import { Button } from '@mui/material'
import { Task } from './Task'

export type TasksType = {
	id: string
	title: string
	isDone: boolean
}

type PropsType = {
	id: string
	title: string
	tasks: Array<TasksType>
	filter: FilterValuesType
	addTask: (title: string, todolistId: string) => void
	changeFilter: (value: FilterValuesType, todolistId: string) => void
	removeTodolist: (todolistId: string) => void
	changeTodolistTitle: (id: string, newTitle: string) => void
	removeTask: (id: string, todolistId: string) => void
	changeStatus: (taskId: string, isDone: boolean, todolistId: string) => void
	changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void
}
// export default function Todolist(props: PropsType) before using React.memo
export const Todolist = React.memo(function (props: PropsType) {
	const onAllClickHandler = useCallback(() => {
		props.changeFilter('all', props.id)
		// eslint-disable-next-line
	}, [props.changeFilter, props.id])
	const onActiveClickHandler = useCallback(() => {
		props.changeFilter('active', props.id)
		// eslint-disable-next-line
	}, [props.changeFilter, props.id])
	const onCompletedClickHandler = useCallback(() => {
		props.changeFilter('completed', props.id)
		// eslint-disable-next-line
	}, [props.changeFilter, props.id])
	const removeTodolist = () => {
		props.removeTodolist(props.id)
	}
	const changeTodolistTitle = useCallback(
		(newTitle: string) => {
			props.changeTodolistTitle(props.id, newTitle)
		},
		// eslint-disable-next-line
		[props.changeTodolistTitle, props.id]
	)
	const addTask = useCallback(
		(title: string) => {
			props.addTask(title, props.id)
		},
		// Чомусь потребує повний props, а не тільки те з чим працюєм
		// eslint-disable-next-line
		[props.addTask, props.id]
	)

	let tasksForTodoList = props.tasks

	if (props.filter === 'completed') {
		tasksForTodoList = props.tasks.filter(t => t.isDone === true)
	}
	if (props.filter === 'active') {
		tasksForTodoList = props.tasks.filter(t => t.isDone === false)
	}

	return (
		<div>
			<h3 className='EditableSpan'>
				<EditableSpan title={props.title} onChange={changeTodolistTitle} />{' '}
				{/* <button onClick={removeTodolist}>x</button> */}
				<IconButton onClick={removeTodolist} aria-label='delete'>
					<DeleteIcon />
				</IconButton>
			</h3>
			<ul>
				{/* <li>
					<input type='checkbox' checked />
					<span>ItemStaticTitle</span>
					<button onClick={() => {}}>x</button>
				</li> */}
				<br></br>
				<AddItemForm addItem={addTask} />
				<br></br>
				<div>
					{tasksForTodoList.map(t => (
						<Task
							task={t}
							changeStatus={props.changeStatus}
							changeTaskTitle={props.changeTaskTitle}
							removeTask={props.removeTask}
							todolistId={props.id}
							key={t.id}
						/>
					))}
				</div>
				<br></br>
				<Button
					variant={props.filter === 'all' ? 'contained' : 'text'}
					//className={props.filter === 'all' ? 'active-filter' : ''}
					onClick={onAllClickHandler}
				>
					All
				</Button>
				<Button
					variant={props.filter === 'active' ? 'contained' : 'text'}
					color={'success'}
					//className={props.filter === 'active' ? 'active-filter' : ''}
					onClick={onActiveClickHandler}
				>
					Active
				</Button>
				<Button
					variant={props.filter === 'completed' ? 'contained' : 'text'}
					color={'error'}
					className={props.filter === 'completed' ? 'active-filter' : ''}
					onClick={onCompletedClickHandler}
				>
					Completed
				</Button>
			</ul>
		</div>
	)
})
