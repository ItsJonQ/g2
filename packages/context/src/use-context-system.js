import { css, cx } from '@wp-g2/styles';
import { memoize } from '@wp-g2/utils';
import { kebabCase, uniq } from 'lodash';

import { CONNECTED_NAMESPACE } from './constants';
import { useComponentsContext } from './context-system-provider';
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
	const contextSystemProps = useComponentsContext();
	const displayName = Array.isArray(namespace) ? namespace[0] : namespace;

	const contextProps = contextSystemProps?.[displayName] || {};

	/** @type {ConnectedProps<P>} */
	// @ts-ignore We fill in the missing properties below
	const finalComponentProps = {
		[CONNECTED_NAMESPACE]: true,
	};

	const nextNs = ns(displayName);
	for (const k in nextNs) {
		if (typeof nextNs[k] === 'string') {
			finalComponentProps[k] = nextNs[k];
		}
	}

	const {
		_overrides: overrideProps,
		css: contextCSS,
		...otherContextProps
	} = contextProps;

	const initialMergedProps = Object.entries(otherContextProps).length
		? Object.assign({}, otherContextProps, props)
		: props;

	const classes = cx(
		// Resolve custom CSS from ContextSystemProvider
		contextCSS && css(contextCSS),
		initialMergedProps.css && css(initialMergedProps.css),
		memoizedGetStyledClassNameFromKey(displayName),
		props.className,
	);

	// Provides the ability to customize the render of the component.
	const rendered =
		typeof initialMergedProps.renderChildren === 'function'
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
	if (!displayName || typeof displayName !== 'string') return '';

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

	if (Array.isArray(key)) {
		return cx(uniq(key).map(getStyledClassName));
	}
	if (typeof key === 'string') {
		return getStyledClassName(key);
	}

	return '';
}

const memoizedGetStyledClassNameFromKey = memoize(getStyledClassNameFromKey);
