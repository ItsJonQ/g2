import { render } from '@testing-library/react';
import { noop } from '@wp-g2/utils';
import React from 'react';

import { Alert } from '../index';

describe('props', () => {
	test('should render correctly', () => {
		const { container } = render(<Alert>I like warm hugs</Alert>);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render with status', () => {
		const { container } = render(
			<Alert status="success">I like warm hugs</Alert>,
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render as dismissable', () => {
		const { container } = render(
			<Alert isDismissable onDismiss={noop} status="success">
				I like warm hugs
			</Alert>,
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render with title', () => {
		const { container } = render(
			<Alert title="Hi">I like warm hugs</Alert>,
		);
		expect(container.firstChild).toMatchSnapshot();
	});
});
