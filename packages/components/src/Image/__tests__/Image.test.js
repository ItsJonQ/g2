import { render } from '@testing-library/react';
import React from 'react';

import { Image } from '../index';

describe('props', () => {
	test('should render correctly', () => {
		const { container } = render(<Image src="/olaf.png" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render with custom aspectRatio', () => {
		const { container } = render(
			<Image aspectRatio={4 / 3} src="/olaf.png" />,
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render with custom fit', () => {
		const { container } = render(
			<Image aspectRatio={4 / 3} fit="fill" src="/olaf.png" />,
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render with custom dimensions', () => {
		const { container } = render(
			<Image fit="fill" height={275} src="/olaf.png" width={320} />,
		);
		expect(container.firstChild).toMatchSnapshot();
	});
});
