import { render } from '@testing-library/react';
import { contextConnect, useContextSystem } from '@wp-g2/context';
import React from 'react';

import { css, getScaleStyles } from '../css';
import { space } from '../mixins/space';
import { $ as getStyleQuery } from '../presets/style-query';
import { styled } from '../system';

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

	it('should interpolate styled components from core components', () => {
		const StyledA = styled.div`
			background-color: blue;
		`;

		const classes = css`
			color: red;
			${StyledA} {
				color: blue;
			}
		`;

		const rule = getLastAppliedCssRule();

		const { container } = render(
			<div className={classes}>
				<StyledA />
			</div>,
		);
		const styledA = container.firstChild.firstChild;

		expect(styledA.matches(rule.selectorText)).toBe(true);
	});

	it('should interpolate styled components', () => {
		const Component = ({ className }) => <div className={className} />;
		const StyledComponent = styled(Component)``;

		const classes = css`
			color: red;
			${StyledComponent} {
				color: blue;
			}
		`;

		const rule = getLastAppliedCssRule();

		const { container } = render(
			<div className={classes}>
				<StyledComponent />
			</div>,
		);
		const styledComponent = container.firstChild.firstChild;
		expect(styledComponent.matches(rule.selectorText)).toBe(true);
	});

	it('should interpolate styled components inside of styled component styles', () => {
		const StyledA = styled.div``;
		const StyledB = styled.div`
			${StyledA} {
				color: blue;
			}
		`;

		const { container } = render(
			<StyledB>
				<StyledA />
			</StyledB>,
		);
		const rule = getLastAppliedCssRule();

		const styledA = container.firstChild.firstChild;
		expect(styledA.matches(rule.selectorText)).toBe(true);
	});

	it('should interpolate context-connected components', () => {
		const TestConnectedStyledComponent = (props, forwardedRef) => {
			const connectedProps = useContextSystem(
				props,
				'TestConnectedStyledComponent',
			);
			return <div {...connectedProps} ref={forwardedRef} />;
		};

		const Connected = contextConnect(
			TestConnectedStyledComponent,
			'TestConnectedStyledComponent',
		);

		const classes = css`
			color: red;
			${Connected} {
				color: blue;
			}
		`;

		const rule = getLastAppliedCssRule();

		const { container } = render(
			<div className={classes}>
				<Connected />
			</div>,
		);

		const connected = container.firstChild.firstChild;
		expect(connected.matches(rule.selectorText)).toBe(true);
	});

	it('should interpolate context-connected-components in styled', () => {
		const TestConnectedStyledComponent = (props, forwardedRef) => {
			const connectedProps = useContextSystem(
				props,
				'TestConnectedStyledComponent',
			);
			return <div {...connectedProps} ref={forwardedRef} />;
		};

		const Connected = contextConnect(
			TestConnectedStyledComponent,
			'TestConnectedStyledComponent',
		);

		const Container = styled.div`
			color: red;
			${Connected} {
				color: blue;
			}
		`;

		const { container } = render(
			<Container>
				<Connected />
			</Container>,
		);
		const rule = getLastAppliedCssRule();

		const connected = container.firstChild.firstChild;
		expect(connected.matches(rule.selectorText)).toBe(true);
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
