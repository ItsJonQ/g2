import { css, getScaleStyles } from '../css';
import { space } from '../mixins/space';
import { $ as getStyleQuery } from '../presets/style-query';

describe('css', () => {
	const getLastAppliedCssRule = () => {
		const styles = document.getElementsByTagName('style');
		const lastSheet = Array.from(styles).slice(-1)[0];
		const rules = Array.from(lastSheet.sheet.cssRules);
		return rules.slice(-1)[0];
	};

	beforeEach(() => {
		// clean up generated styles and elements
		document.head.innerHTML = '';
		document.body.innerHTML = '';
	});

	it('should interpolate style queries', () => {
		const classes = css`
			color: red;
			${getStyleQuery('TestComponent')} {
				color: black;
			}
		`;

		const rule = getLastAppliedCssRule();

		/**
		 * Generate the following:
		 * <View className={classes}>
		 * 	<TestComponent />
		 * </View>
		 */
		const container = document.createElement('div');
		const testElement = document.createElement('div');
		container.className = classes;
		testElement.dataset.g2Component = 'TestComponent';
		container.appendChild(testElement);

		expect(testElement.matches(rule.selectorText)).toBe(true);
	});
});

describe('scales', () => {
	test('should transform space values', () => {
		const numberValues = {
			gridGap: 4,
			gridColumnGap: 4,
			gridRowGap: 4,
			gap: 4,
			columnGap: 4,
			rowGap: 4,
		};

		for (const key in numberValues) {
			const value = numberValues[key];
			const assert = {};
			const result = {};

			assert[key] = value;
			result[key] = space(value);

			expect(getScaleStyles(assert)).toEqual(result);
		}

		const stringValues = {
			gridGap: '6px',
			gridColumnGap: '6px',
			gridRowGap: '6px',
			gap: '6px',
			columnGap: '6px',
			rowGap: '6px',
		};

		for (const key in stringValues) {
			const value = stringValues[key];
			const assert = {};
			const result = {};

			assert[key] = value;
			result[key] = space(value);

			expect(getScaleStyles(assert)).toEqual(result);
		}
	});
});
