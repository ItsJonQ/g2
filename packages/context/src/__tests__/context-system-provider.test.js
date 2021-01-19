import { render } from '@testing-library/react';
import { View } from '@wp-g2/styles';
import React from 'react';

import { contextConnect } from '../context-connect';
import { ContextSystemProvider } from '../context-system-provider';
import { useContextSystem } from '../use-context-system';

describe('props', () => {
	test('should render correctly', () => {
		const Olaf = (props, ref) => (
			<View {...useContextSystem(props, 'Olaf')} ref={ref} />
		);
		const ConnectedOlaf = contextConnect(Olaf, 'Olaf');
		const { container } = render(
			<ContextSystemProvider>
				<ConnectedOlaf />
			</ContextSystemProvider>,
		);

		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render context props', () => {
		const Olaf = (props, ref) => {
			const { quote, ...otherProps } = useContextSystem(props, 'Olaf');
			return (
				<View {...otherProps} ref={ref}>
					{quote}
				</View>
			);
		};

		const ConnectedOlaf = contextConnect(Olaf, 'Olaf');

		const contextValue = {
			Olaf: {
				quote: 'Warm Hugs',
			},
		};

		const { container } = render(
			<ContextSystemProvider value={contextValue}>
				<ConnectedOlaf />
			</ContextSystemProvider>,
		);

		expect(container.firstChild).toMatchSnapshot();
		expect(container.firstChild.innerHTML).toContain('Warm Hugs');
	});

	test('should render css props', () => {
		const Olaf = (props, ref) => {
			const { quote, ...otherProps } = useContextSystem(props, 'Olaf');
			return (
				<View {...otherProps} ref={ref}>
					{quote}
				</View>
			);
		};

		const ConnectedOlaf = contextConnect(Olaf, 'Olaf');

		const contextValue = {
			Olaf: {
				css: [{ background: 'white' }, `padding: 20px;`],
			},
		};

		const { container } = render(
			<>
				<ContextSystemProvider value={contextValue}>
					<ConnectedOlaf className="olaf" />
				</ContextSystemProvider>
				<ConnectedOlaf className="olaf" />
			</>,
		);

		const [first, second] = [...container.querySelectorAll('.olaf')];

		expect(container).toMatchSnapshot();

		const firstCSS = first.classList.toString();
		const secondCSS = second.classList.toString();

		expect(first).toHaveStyle(`background: white`);
		expect(first).toHaveStyle(`padding: 20px`);

		expect(second).not.toHaveStyle(`background: white`);
		expect(second).not.toHaveStyle(`padding: 20px`);

		expect(firstCSS).not.toEqual(secondCSS);
	});

	test('should render css props + provided css', () => {
		const Olaf = (props, ref) => {
			const { quote, ...otherProps } = useContextSystem(props, 'Olaf');
			return (
				<View {...otherProps} ref={ref}>
					{quote}
				</View>
			);
		};

		const ConnectedOlaf = contextConnect(Olaf, 'Olaf');

		const contextValue = {
			Olaf: {
				css: [{ background: 'white' }, { border: '2px solid blue' }],
			},
		};

		const { container } = render(
			<>
				<ContextSystemProvider value={contextValue}>
					<ConnectedOlaf
						className="olaf"
						css={`
							font-weight: bold;
						`}
					/>
				</ContextSystemProvider>
			</>,
		);

		expect(container).toMatchSnapshot();

		const el = container.querySelector('.olaf');

		expect(el).toHaveStyle(`border: 2px solid blue`);
		expect(el).toHaveStyle(`background: white`);
		expect(el).toHaveStyle(`font-weight: bold`);
	});

	test('should render _override props', () => {
		const Olaf = (props, ref) => {
			const { quote, ...otherProps } = useContextSystem(props, 'Olaf');
			return (
				<View {...otherProps} ref={ref}>
					{quote}
				</View>
			);
		};

		const ConnectedOlaf = contextConnect(Olaf, 'Olaf');

		const contextValue = {
			Olaf: {
				_overrides: {
					quote: 'Warm Hugs!',
				},
			},
		};

		const { container } = render(
			<>
				<ContextSystemProvider value={contextValue}>
					<ConnectedOlaf className="olaf" quote="Hello" />
				</ContextSystemProvider>
			</>,
		);

		expect(container.firstChild).toMatchSnapshot();

		const el = container.querySelector('.olaf');

		expect(el.innerHTML).toContain('Warm Hugs!');
		expect(el.innerHTML).not.toContain('Hello');
	});
});
