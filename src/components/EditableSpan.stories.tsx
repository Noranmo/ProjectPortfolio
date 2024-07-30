import { action } from '@storybook/addon-actions'
import { EditableSpan } from './EditableSpan'

export default {
	title: 'EditableSpan Component',
	component: EditableSpan,
}

const onChangeCallback = action('Status changed')


export const EditableSpanBaseExample = (props: any) => {
	return <EditableSpan title='Start value' onChange={onChangeCallback} />
}
