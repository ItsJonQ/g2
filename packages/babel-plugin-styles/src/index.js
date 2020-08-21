import jsx from 'babel-plugin-syntax-jsx';

export default function (babel) {
	const t = babel.types;

	const visitor = {
		JSXAttribute(path, state) {
			if (
				path.node.name.name === 'className' &&
				path.node.value.type === 'JSXExpressionContainer' &&
				path.node.value.expression &&
				path.node.value.expression.type !== 'StringLiteral'
			) {
				path.node.value = t.JSXExpressionContainer(
					t.callExpression(state.addImport('@wp-g2/styles', 'cx'), [
						path.node.value.expression,
					]),
				);
			}
		},
	};

	return {
		inherits: jsx,
		visitor,
	};
}
