export default {
	rules: {
		'button-siblings-layout-wrap': {
			create: (context) => {
				return (node, { getComponentName }) => {
					const isButton = getComponentName(node) === 'Button';
					if (!isButton) return;

					const sibling = node.nextElementSibling;
					const isNextButton = getComponentName(sibling) === 'Button';
					if (isNextButton) {
						context.report({
							title: 'Button / Siblings: Layout wrap',
							message:
								'Buttons should not be next to each other. Wrap them with a Layout container, such as Flex, HStack, or VStack.',
						});
					}
				};
			},
		},
	},
};
