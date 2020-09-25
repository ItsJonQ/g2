import { render } from '@testing-library/react';
import { View } from '@wp-g2/styles';
import React from 'react';

import { connect } from '../connect';
import { ContextSystemProvider } from '../ContextSystemProvider';

describe('props', () => {
	test('should render correctly', () => {
		const Olaf = (props) => <View {...props} />;
		const ConnectedOlaf = connect(Olaf, 'Olaf');
		const { container } = render(
			<ContextSystemProvider>
				<ConnectedOlaf />
			</ContextSystemProvider>,
		);

		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render context props', () => {
		const Olaf = ({ quote, ...props }) => <View {...props}>{quote}</View>;
		const ConnectedOlaf = connect(Olaf, 'Olaf');

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
		const Olaf = ({ quote, ...props }) => <View {...props}>{quote}</View>;
		const ConnectedOlaf = connect(Olaf, 'Olaf');

		const contextValue = {
			Olaf: {
				css: [{ background: 'white' }, `padding: 20px`],
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

		expect(container.firstChild).toMatchSnapshot();

		const firstCSS = first.classList.toString();
		const secondCSS = second.classList.toString();
		expect(firstCSS).not.toEqual(secondCSS);
	});

	test('should render css props + provided css', () => {
		const Olaf = ({ quote, ...props }) => <View {...props}>{quote}</View>;
		const ConnectedOlaf = connect(Olaf, 'Olaf');

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

		expect(container.firstChild).toMatchSnapshot();

		const el = container.querySelector('.olaf');

		expect(el).toHaveStyle(`background: white`);
		expect(el).toHaveStyle(`font-weight: bold`);
	});

	test('should render _override props', () => {
		const Olaf = ({ quote, ...props }) => <View {...props}>{quote}</View>;
		const ConnectedOlaf = connect(Olaf, 'Olaf');

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
