import { getScaleStyles, responsive } from '../css';
import { space } from '../mixins/space';

describe('scales', () => {
	test('should transform space values', () => {
		const numberValues = {
			margin: 4,
			marginTop: 4,
			marginRight: 4,
			marginBottom: 4,
			marginLeft: 4,
			marginX: 4,
			marginY: 4,
			marginBlock: 4,
			marginBlockEnd: 4,
			marginBlockStart: 4,
			marginInline: 4,
			marginInlineEnd: 4,
			marginInlineStart: 4,
			padding: 4,
			paddingTop: 4,
			paddingRight: 4,
			paddingBottom: 4,
			paddingLeft: 4,
			paddingX: 4,
			paddingY: 4,
			paddingBlock: 4,
			paddingBlockEnd: 4,
			paddingBlockStart: 4,
			paddingInline: 4,
			paddingInlineEnd: 4,
			paddingInlineStart: 4,
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
			margin: '6px',
			marginTop: '6px',
			marginRight: '6px',
			marginBottom: '6px',
			marginLeft: '6px',
			marginX: '6px',
			marginY: '6px',
			marginBlock: '6px',
			marginBlockEnd: '6px',
			marginBlockStart: '6px',
			marginInline: '6px',
			marginInlineEnd: '6px',
			marginInlineStart: '6px',
			padding: '6px',
			paddingTop: '6px',
			paddingRight: '6px',
			paddingBottom: '6px',
			paddingLeft: '6px',
			paddingX: '6px',
			paddingY: '6px',
			paddingBlock: '6px',
			paddingBlockEnd: '6px',
			paddingBlockStart: '6px',
			paddingInline: '6px',
			paddingInlineEnd: '6px',
			paddingInlineStart: '6px',
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
			marginTop: [5, null, 10],
		};

		expect(responsive(styles)).toEqual({
			'@media screen and (min-width: 40em)': {},
			'@media screen and (min-width: 52em)': {
				marginTop: space(10),
			},
			marginTop: space(5),
		});
	});

	test('should transform responsive space string values', () => {
		const styles = {
			marginTop: ['5px', null, '10em'],
		};

		expect(responsive(styles)).toEqual({
			'@media screen and (min-width: 40em)': {},
			'@media screen and (min-width: 52em)': {
				marginTop: '10em',
			},
			marginTop: '5px',
		});
	});
});
