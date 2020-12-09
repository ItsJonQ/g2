import { css, cx } from '@wp-g2/styles';
import { is, memoize } from '@wp-g2/utils';
import { kebabCase, omit, uniq } from 'lodash';

import { CONNECTED_NAMESPACE } from './constants';
import { useContextStoreContext } from './context-system-provider';
import { ns } from './utils';

/**
 * @template TProps
 * @typedef {TProps & { [CONNECTED_NAMESPACE]: boolean; className: string; children?: import('react').ReactNode }} ConnectedProps
 */

/**
 * Custom hook that derives registered props from the Context system.
 * These derived props are then consolidated with incoming component props.
 *
 * @template {{ className?: string }} P
 * @param {P} props Incoming props from the component.
 * @param {string} namespace The namespace to register and to derive context props from.
 * @return {ConnectedProps<P>}
 */
export function useContextSystem(props, namespace) {
	const { store } = useContextStoreContext();
	const { context } = store();
	let contextProps;

	const displayName = is.array(namespace) ? namespace[0] : namespace;

	/** @type {ConnectedProps<P>} */
	// @ts-ignore We fill in the missing properties below
	const finalComponentProps = {
		[CONNECTED_NAMESPACE]: true,
	};

	const nextNs = ns(displayName);
	for (const k in nextNs) {
		if (is.string(nextNs[k])) {
			finalComponentProps[k] = nextNs[k];
		}
	}

	contextProps =
		context[displayName] ||
		// Fallback
		{};

	const otherContextProps = omit(contextProps, ['_overrides', 'css']);
	const contextCSS = contextProps.css;
	const overrideProps = contextProps._overrides || {};

	const initialMergedProps = Object.assign({}, otherContextProps, props);

	const classes = cx(
		// Resolve custom CSS from ContextSystemProvider
		contextCSS && css(contextCSS),
		initialMergedProps.css && css(initialMergedProps.css),
		memoizedGetStyledClassNameFromKey(displayName),
		props.className,
	);

	// Provides the ability to customize the render of the component.
	const rendered = is.function(initialMergedProps.renderChildren)
		? initialMergedProps.renderChildren(initialMergedProps)
		: initialMergedProps.children;

	for (const k in initialMergedProps) {
		/**
		 * Omitting CSS prop.
		 */
		if (k !== 'css') {
			finalComponentProps[k] = initialMergedProps[k];
		}
	}

	for (const k in overrideProps) {
		finalComponentProps[k] = overrideProps[k];
	}

	finalComponentProps.children = rendered;
	finalComponentProps.className = classes;

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

	const kebab = kebabCase(displayName);
	return `components-${kebab} wp-components-${kebab}`;
}

/**
 * Generates the connected component CSS className based on the namespace.
 *
 * @param {string} key The name of the connected component.
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

const memoizedGetStyledClassNameFromKey = memoize(getStyledClassNameFromKey);
