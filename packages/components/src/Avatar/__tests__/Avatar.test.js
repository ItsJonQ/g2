import { render } from '@testing-library/react';
import React from 'react';

import { Avatar } from '../index';

describe('props', () => {
	test('should render correctly', () => {
		const { container } = render(<Avatar name="Elsa Oldenburg" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render with image src', () => {
		const { container } = render(
			<Avatar name="Elsa Oldenburg" src="/elsa.png" />,
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render with animateOnImageLoad disabled', () => {
		const { container } = render(
			<Avatar
				animateOnImageLoad={false}
				name="Elsa Oldenburg"
				src="/elsa.png"
			/>,
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render with a border', () => {
		const { container } = render(
			<Avatar border={true} name="Elsa Oldenburg" src="/elsa.png" />,
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render with a custom color', () => {
		const { container } = render(
			<Avatar
				border={true}
				color="dodgerblue"
				name="Elsa Oldenburg"
				src="/elsa.png"
			/>,
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render with an alternate shape', () => {
		const { container } = render(
			<Avatar
				border={true}
				color="dodgerblue"
				name="Elsa Oldenburg"
				shape="square"
				src="/elsa.png"
			/>,
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render with an alternate size', () => {
		const { container } = render(
			<Avatar border={true} name="Elsa Oldenburg" size="large" />,
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render with a custom size', () => {
		const { container } = render(
			<Avatar border={true} name="Elsa Oldenburg" size={41} />,
		);
		expect(container.firstChild).toMatchSnapshot();
	});
});
