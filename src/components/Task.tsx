import React, { ChangeEvent, useCallback } from 'react'
import { EditableSpan } from './EditableSpan'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import Checkbox from '@mui/material/Checkbox'
import { TasksType } from './Todolist'

type TaskPropsType = {
	removeTask: (id: string, todolistId: string) => void
	changeStatus: (taskId: string, isDone: boolean, todolistId: string) => void
	changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void
	task: TasksType
	todolistId: string
}
export const Task = React.memo((props: TaskPropsType) => {
	const onRemoveHandler = () => {
		props.removeTask(props.task.id, props.todolistId)
	}
	const onChangeCheckHandler = (e: ChangeEvent<HTMLInputElement>) => {
		let newIsDoneValue = e.currentTarget.checked
		props.changeStatus(props.task.id, newIsDoneValue, props.todolistId)
	}
	const onChangeTitleHandler = useCallback(
		(newValue: string) => {
			props.changeTaskTitle(props.task.id, newValue, props.todolistId)
		},
		// eslint-disable-next-line
		[props.changeTaskTitle, props.task.id, props.todolistId]
	)
	return (
		<div key={props.task.id} className={props.task.isDone ? 'is-done' : ''}>
			<Checkbox
				onChange={onChangeCheckHandler}
				color='secondary'
				checked={props.task.isDone}
			/>
			<EditableSpan title={props.task.title} onChange={onChangeTitleHandler} />
			{/* <button onClick={onRemoveHandler}>x</button> */}
			<IconButton onClick={onRemoveHandler} aria-label='delete'>
				<DeleteIcon />
			</IconButton>
		</div>
	)
})
