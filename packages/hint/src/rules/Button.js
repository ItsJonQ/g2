export default {
	rules: {
		'button-siblings-layout-wrap': {
			create: (context) => {
				return (node, { getClosestComponent, getComponentName }) => {
					const isButton = getComponentName(node) === 'Button';
					if (!isButton) return;

					const sibling = node.nextElementSibling;
					const isNextButton = getComponentName(sibling) === 'Button';
					const gridWrapper = getClosestComponent(node, 'Grid');

					if (isNextButton && !gridWrapper) {
						context.report({
							title: 'Button / Siblings: Layout wrap',
							message:
								'Buttons should not be next to each other. Wrap them with a Layout container, such as Grid, Flex, HStack, or VStack.',
						});
					}
				};
			},
		},
	},
};
