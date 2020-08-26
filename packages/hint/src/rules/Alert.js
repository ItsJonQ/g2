export default {
	rules: {
		'alert-alerts-container': {
			create: (context) => {
				return (node, { getClosestComponent, getComponentName }) => {
					const isAlert = getComponentName(node) === 'Alert';
					if (!isAlert) return;

					const container = getClosestComponent(node, 'Alerts');

					if (!container) {
						context.report({
							title: 'Alert: Container',
							message:
								'Alert should be wrapped with a Alerts container.',
						});
					}
				};
			},
		},
	},
};
