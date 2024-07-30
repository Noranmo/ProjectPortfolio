import AppWithRedux from './AppWithRedux'
// import AppWithRedux from '!!raw-loader!./AppWithRedux'
import { ReduxStoreProviderDecorator } from './stories/ReduxStoreProviderDecorator'

export default {
	title: 'AppWithRedux Component',
	component: AppWithRedux,
	decorators: [ReduxStoreProviderDecorator],
}

export const AppWithReduxBaseExample = () => {
	return <AppWithRedux />
}
