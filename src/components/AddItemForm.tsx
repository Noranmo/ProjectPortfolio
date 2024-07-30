import { ControlPoint } from '@mui/icons-material'
import { IconButton, TextField } from '@mui/material'
import React, { ChangeEvent, useState, KeyboardEvent } from 'react'

type AddItemFormPropsType = {
	addItem: (title: string) => void
}

// export function AddItemForm(props: AddItemFormPropsType) - it was before the React.memo

export const AddItemForm = React.memo((props: AddItemFormPropsType) => {
	let [newTaskTitle, setNewTaskTitle] = useState('')
	let [error, setError] = useState<string | null>(null)

	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setNewTaskTitle(e.currentTarget.value)
	}

	const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
		if (error !== null) {
			setError(null)
		}
		if (e.charCode === 13) {
			if (newTaskTitle.trim() === '') {
				setError('Title is required')
				return
			} else {
				props.addItem(newTaskTitle)
				setNewTaskTitle('')
			}
		}
	}

	const addTask = () => {
		if (newTaskTitle.trim() === '') {
			setError('Title is required')
			return
		}
		props.addItem(newTaskTitle.trim())
		setNewTaskTitle('')
	}

	return (
		<div>
			{/* <input
				value={newTaskTitle}
				onChange={onChangeHandler}
				onKeyPress={onKeyPressHandler}
				placeholder='new item'
				className={error ? 'error' : ''}
			/> */}
			<TextField
				variant={'outlined'}
				value={newTaskTitle}
				onChange={onChangeHandler}
				onKeyPress={onKeyPressHandler}
				// placeholder='new item'
				label='New item'
				// className={error ? 'error' : ''}
				error={!!error}
				helperText={error}
			/>
			<IconButton onClick={addTask}>
				<ControlPoint color={'primary'} />
			</IconButton>
			{/* {error && <div className='error-message'>{error}</div>} */}
		</div>
	)
})
