import { getScaleStyles, responsive } from '../css';
import { space } from '../mixins/space';

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
			expect(getScaleStyles({ [key]: value })).toEqual({
				[key]: space(value),
			});
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
			expect(getScaleStyles({ [key]: value })).toEqual({
				[key]: '6px',
			});
		}
	});

	test('should transform responsive space values', () => {
		const styles = {
			gap: [5, null, 10],
		};

		expect(responsive(styles)).toEqual({
			'@media screen and (min-width: 40em)': {},
			'@media screen and (min-width: 52em)': {
				gap: space(10),
			},
			gap: space(5),
		});
	});

	test('should transform responsive space string values', () => {
		const styles = {
			gap: ['5px', null, '10em'],
		};

		expect(responsive(styles)).toEqual({
			'@media screen and (min-width: 40em)': {},
			'@media screen and (min-width: 52em)': {
				gap: '10em',
			},
			gap: '5px',
		});
	});
});
