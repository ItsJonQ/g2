function isNodeText(node) {
	if (node.children.length) {
		return false;
	}

	const isText = node.innerHTML === node.innerText && node.innerText.length;

	return isText;
}

export default {
	rules: {
		'text-no-text-in-view': {
			create: (context) => {
				return (node, { getComponentName }) => {
					if (!isNodeText(node)) return;

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
