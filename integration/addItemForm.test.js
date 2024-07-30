// Can not start the file inside the package-json
// https://jestjs.io/docs/snapshot-testing
// https://storybook.js.org/docs/writing-tests/snapshot-testing/snapshot-testing

describe('addItemForm', () => {
	it('base example, visually looks correct', async () => {
		//'http://localhost:62022/?path=/story/additemform-component--add-item-form-base-example'
		await page.goto(
			'http://localhost:9011/iframe.html?id=additemform-component--add-item-form-base-example&viewMode=story'
		)
		const image = await page.screenshot()

		// API from jest-image-snapshot
		expect(image).toMatchImageSnapshot()
	})
})
