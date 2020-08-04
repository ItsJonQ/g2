import React, { useState } from 'react';

import { Text } from '../../Text';
import { Alert, Alerts } from '../index';

export default {
	component: Alert,
	title: 'Components/Alert',
};

const statuses = ['default', 'success', 'warning', 'info', 'critical'];

export const Example = () => {
	const [alerts, setAlerts] = useState(statuses);
	const remove = (id) => setAlerts((prev) => prev.filter((i) => i !== id));

	return (
		<Alerts>
			{alerts.map((status) => (
				<Alert
					isDismissable
					key={status}
					onDismiss={() => {
						remove(status);
					}}
					status={status}
					title="Title"
				>
					<Text>Alert Content</Text>
				</Alert>
			))}
		</Alerts>
	);
};

export const _default = () => {
	return <Example />;
};
