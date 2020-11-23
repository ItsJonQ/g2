import { render } from '@testing-library/react';
import { noop } from '@wp-g2/utils';
import React from 'react';

import { Alert, Alerts } from '../index';

describe('props', () => {
	test('should render correctly', () => {
		const { container } = render(<Alert>I like warm hugs</Alert>);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render with status', () => {
		const { container } = render(
			<Alerts>
				<Alert isDismissable key="warning" status="warning">
					I like warm hugs
				</Alert>
				<Alert isDismissable key="success" status="success">
					I like warm hugs
				</Alert>
				<Alert isDismissable key="critical" status="critical">
					I like warm hugs
				</Alert>
				<Alert isDismissable key="info" status="info">
					I like warm hugs
				</Alert>
				<Alert isDismissable key="standard">
					I like warm hugs
				</Alert>
			</Alerts>,
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
