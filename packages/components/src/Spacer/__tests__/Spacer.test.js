import { render } from '@testing-library/react';
import React from 'react';

import { Spacer } from '../index';

describe('props', () => {
	test('should render correctly', () => {
		const { container } = render(<Spacer />);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render margin', () => {
		const { container } = render(<Spacer m={5} />);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render marginX', () => {
		const { container } = render(<Spacer mx={5} />);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render marginY', () => {
		const { container } = render(<Spacer my={5} />);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render marginTop', () => {
		const { container } = render(<Spacer mt={5} />);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render marginBottom', () => {
		const { container } = render(<Spacer mb={5} />);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render marginLeft', () => {
		const { container } = render(<Spacer ml={5} />);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render marginRight', () => {
		const { container } = render(<Spacer mr={5} />);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render padding', () => {
		const { container } = render(<Spacer p={5} />);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render paddingX', () => {
		const { container } = render(<Spacer px={5} />);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render paddingY', () => {
		const { container } = render(<Spacer py={5} />);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render paddingTop', () => {
		const { container } = render(<Spacer pt={5} />);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render paddingBottom', () => {
		const { container } = render(<Spacer pb={5} />);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render paddingLeft', () => {
		const { container } = render(<Spacer pl={5} />);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render paddingRight', () => {
		const { container } = render(<Spacer pr={5} />);
		expect(container.firstChild).toMatchSnapshot();
	});
});
