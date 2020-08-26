export default {
	rules: {
		'text-no-text-in-view': {
			create: (context) => {
				return (node, { getComponentName }) => {
					if (node.children.length) return;

					const isText = node.innerHTML === node.innerText;
					if (!isText) return;

					const name = getComponentName(node);
					const isInvalid = name === 'View';

					if (isInvalid) {
						context.report({
							title: 'Text: Rendering',
							message:
								'Text content should not be rendered directly in a View.',
						});
					}
				};
			},
		},
	},
};
