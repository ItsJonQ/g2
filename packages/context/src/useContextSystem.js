import { css, cx } from '@wp-g2/styles';
import { is, kebabCase, uniq } from '@wp-g2/utils';

import { useComponentsContext } from './ComponentsProvider';
import { CONNECTED_NAMESPACE } from './constants';
import { ns } from './utils';

/**
 * Custom hook that derives registered props from the Context system.
 * These derived props are then consolidated with incoming component props.
 *
 * @param {Object} props Incoming props from the component.
 * @param {Array<string>|string} namespace The namespace to register and to derive context props from.
 * @param {function} forwardedRef React.forwardRef reference object.
 */
export function useContextSystem(props, namespace, forwardedRef) {
	const context = useComponentsContext();
	let contextProps;

	const displayName = is.array(namespace) ? namespace[0] : namespace;
	const key = namespace;

	const finalComponentProps = {
		[CONNECTED_NAMESPACE]: true,
	};

	const nextNs = ns(displayName);
	for (const k in nextNs) {
		if (is.string(nextNs[k])) {
			finalComponentProps[k] = nextNs[k];
		}
	}

	/**
	 * It's possible to connect (register) a component under multiple namespaces.
	 * This is done when passing the namespace as an array (Array<string>).
	 *
	 * To properly retrieve props from the Context system, we must accomodate
	 * both singular and multi connections.
	 */
	if (is.array(key)) {
		contextProps = key.reduce((acc, k) => {
			const v = context[k];
			if (is.plainObject(v)) {
				for (const vk in v) {
					acc[vk] = v[vk];
				}
			}
			return acc;
		}, {});
	} else {
		contextProps =
			context[key] ||
			// Fallback
			{};
	}

	const {
		/**
		 * "Forceful" overrides of component props coming from the Provider
		 */
		_overrides: overrideProps = {},
		css: contextCSS,
		...otherContextProps
	} = contextProps;

	const initialMergedProps = is.plainObject(contextProps)
		? { ...otherContextProps, ...props }
		: props;

	const classes = cx(
		// Resolve custom CSS from ComponentsProvider
		css(contextCSS),
		// Resolve custom CSS from props
		initialMergedProps.cx,
		initialMergedProps.__css && css(initialMergedProps.__css),
		initialMergedProps.css && css(initialMergedProps.css),
		getStyledClassNameFromKey(key),
		props.className,
	);

	// Provides the ability to customize the render of the component.
	const rendered = is.function(initialMergedProps.renderChildren)
		? initialMergedProps.renderChildren(initialMergedProps)
		: initialMergedProps.children;

	for (const k in initialMergedProps) {
		/**
		 * Omitting CSS props.
		 */
		if (!['cx', 'css', '__css'].includes(k)) {
			finalComponentProps[k] = initialMergedProps[k];
		}
	}

	for (const k in overrideProps) {
		finalComponentProps[k] = overrideProps[k];
	}

	finalComponentProps.children = rendered;
	finalComponentProps.className = classes;
	finalComponentProps.forwardedRef = forwardedRef;

	/**
	 * Omit props from finalComponentProps
	 */
	if (finalComponentProps._shallow) {
		finalComponentProps._shallow = undefined;
	}

	return finalComponentProps;
}

/**
 * Generates the connected component CSS className based on the namespace.
 *
 * @param {string} displayName The name of the connected component.
 * @returns {string} The generated CSS className.
 */
function getStyledClassName(displayName) {
	if (!displayName || !is.string(displayName)) return '';

	return `wp-components-${kebabCase(displayName)}`;
}

/**
 * Generates the connected component CSS className based on the namespace.
 *
 * @param {string} displayName The name of the connected component.
 * @returns {string} The generated CSS className.
 */
function getStyledClassNameFromKey(key) {
	if (!key) return '';

	if (is.array(key)) {
		return cx(uniq(key).map(getStyledClassName));
	}
	if (is.string(key)) {
		return getStyledClassName(key);
	}

	return '';
}
