import { userReducer } from './Example.user-reducer'

test('user reducer should increment age', () => {
	const startState = { age: 20, childrenCount: 2, name: 'Dimych' }

	const endState = userReducer(startState, { type: 'INCREMENT-AGE' })

	expect(endState.age).toBe(21)
	expect(endState.childrenCount).toBe(2)
})

test('user reducer should incrememnt only childrenCount', () => {
	const startState = { age: 20, childrenCount: 2, name: 'Dimych' }
	const endState = userReducer(startState, { type: 'INCREMENT-CHILDREN-COUNT' })

	expect(endState.age).toBe(20)
	expect(endState.childrenCount).toBe(3)
})
// Try to write a test first, than a code for the test

test('user reducer should change name of user', () => {
	const startState = { age: 20, childrenCount: 2, name: 'Dimych' }
	const newName = "Viktor"
	const endState = userReducer(startState, { type: 'CHANGE-NAME', newName: newName })

	expect(endState.name).toBe(newName)
})