import type { StorybookConfig } from '@storybook/react-webpack5'

const config: StorybookConfig = {
	stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
	addons: [
		'@storybook/preset-create-react-app',
		'@storybook/addon-onboarding',
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@chromatic-com/storybook',
		'@storybook/addon-interactions',
		{
			// Don't work. need to fix
			// https://github.com/storybookjs/storybook/issues/12495
			// https://github.com/storybookjs/storybook/issues/11994
			// https://storybook.js.org/addons/@storybook/addon-storysource
			name: '@storybook/addon-storysource',
			options: {
				rule: {
					test: [/\.stories\.tsx?$/],
				},
				loaderOptions: {
					prettierConfig: {
						printWidth: 80,
						singleQuote: false,
						options: { parser: 'typescript' },
					},
				},
			},
		},
	],
	framework: {
		name: '@storybook/react-webpack5',
		options: {},
	},
	staticDirs: ['../public'],
}
export default config
