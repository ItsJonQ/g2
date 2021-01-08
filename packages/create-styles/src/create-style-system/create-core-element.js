import isPropValid from '@emotion/is-prop-valid';
import { mergeRefs } from '@wp-g2/utils';
import React, { forwardRef } from 'react';

import { useHydrateGlobalStyles } from '../hooks';
import { REDUCED_MOTION_MODE_ATTR } from './constants';
import { DEFAULT_STYLE_SYSTEM_OPTIONS } from './utils';

const shouldForwardProp = isPropValid;

const defaultOptions = DEFAULT_STYLE_SYSTEM_OPTIONS;

/**
 * @typedef CreateCoreElementOptions
 * @property {import('create-emotion').ObjectInterpolation<any>} baseStyles The baseStyles from the Style system.
 * @property {import('../create-compiler').Compiler} compiler The injectGlobal from the Style system's compiler.
 * @property {import('./generate-theme').GenerateThemeResults} globalStyles The globalStyles from the Style system.
 */

/**
 * Creates the core styled elements for the Style system. These elements are
 * an in-between of Emotion's <div css="" /> solution and a styled.div``
 * solution.
 *
 * createCoreElement is a super light-weight higher-order wrapper that
 * enhances base elements (like `div`, `input`, or even Components) with
 * features provided by the Style system, such as direct CSS compiling via
 * the `css` prop.
 *
 * A styled element also has built-in baseStyles (which can be adjusted using
 * the createStyleSystem factory).
 *
 * @example
 * ```jsx
 * const alwaysBlueDiv = createCoreElement('div', { baseStyles: { background: 'blue' }})
 * ```
 *
 * @template {keyof JSX.IntrinsicElements} TTagName
 * @param {TTagName} tagName The HTMLElement/React.Component to connect with the Style system.
 * @param {CreateCoreElementOptions} options Options to custom coreElement styles.
 * @returns {import('./polymorphic-component').PolymorphicComponent<TTagName, {}>} The Style system wrapped HTMLElement/React.Component.
 */
export const createCoreElement = (tagName, options) => {
	const { baseStyles, compiler, globalStyles } = {
		...defaultOptions,
		...options,
	};

	const { css, cx, injectGlobal } = compiler;

	/**
	 * Default baseStyles for the system.
	 */
	const styles = {
		Base: css({
			// Automatic box-sizing resets.
			boxSizing: 'border-box',
		}),
		// Enforced reduced-motion preferred styles.
		reduceMotion: css`
			@media (prefers-reduced-motion) {
				transition: none !important;
			}
			${REDUCED_MOTION_MODE_ATTR} & {
				transition: none !important;
			}
		`,
	};

	const compiledBaseStyles = css(baseStyles);

	/**
	 * @param {any} props
	 * @param {import('react').Ref<any>} ref
	 */
	const render = (
		{
			// Internal props
			css: cssProp,
			// External props
			// eslint-disable-next-line
			as,
			children,
			className: classNameProp,
			forwardedRef,
			...props
		},
		ref,
	) => {
		/**
		 * useHydrateGlobalStyles an incredibly important hook, and is vital
		 * to the Style system. It automatically injects the variables Style
		 * system configs (configs, dark mode, etc...) on first-render.
		 *
		 * This way avoids....
		 *
		 * 1. The need to wrap coreElements / styled components in any <Provider />.
		 * 2. The need to use Context connectors (e.g. for ThemeProvider), which is HUGE for performance.
		 */
		// eslint-disable-next-line
		useHydrateGlobalStyles({ globalStyles, injectGlobal });

		const element = as || tagName;
		const className =
			typeof classNameProp !== 'string'
				? cx(classNameProp)
				: classNameProp;

		/**
		 * Compiles all of the custom styles into classNames before binding it
		 * to the HTMLElement / React.Component.
		 */
		const classes = cx(
			styles.Base,
			styles.reduceMotion,
			compiledBaseStyles,
			className,
			cssProp && css(cssProp),
		);

		/**
		 * A conventient feature to (attempt to) filter out non HTML-friendly
		 * props for HTMLElements.
		 */
		const shouldFilterProps = typeof element === 'string';

		/** @type {Record<string, any>} */
		let newProps = {};

		for (let key in props) {
			if (shouldFilterProps) {
				if (shouldForwardProp(key)) {
					newProps[key] = props[key];
				}
			} else {
				newProps[key] = props[key];
			}
		}

		// eslint-disable-next-line
		const refs = React.useMemo(() => {
			return forwardedRef ? mergeRefs([forwardedRef, ref]) : ref;
		}, [forwardedRef, ref]);

		return React.createElement(
			element,
			{
				className: classes,
				ref: refs,
				...newProps,
			},
			children,
		);
	};

	const SystemComponent = forwardRef(render);

	if (process.env.NODE_ENV === 'development') {
		const displayName = typeof tagName === 'string' ? tagName : 'Component';

		SystemComponent.displayName = displayName;
	}

	return SystemComponent;
};
