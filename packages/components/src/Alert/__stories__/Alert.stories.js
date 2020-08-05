import React, { useState } from 'react';

import { Button, Spacer, Text, View } from '../../index';
import { Alert, Alerts } from '../index';

export default {
	component: Alert,
	title: 'Components/Alert',
};

const statuses = ['default', 'success', 'warning', 'info', 'critical'];

const Example = () => {
	const [alerts, setAlerts] = useState(statuses);
	const remove = (id) => setAlerts((prev) => prev.filter((i) => i !== id));
	const reset = () => setAlerts(statuses);

	return (
		<View
			css={`
				max-width: 480px;
				margin: auto;
			`}
		>
			<Spacer>
				<Button disabled={alerts.length === 5} onClick={reset}>
					Reset
				</Button>
			</Spacer>
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
		</View>
	);
};

export const _default = () => {
	return <Example />;
};
