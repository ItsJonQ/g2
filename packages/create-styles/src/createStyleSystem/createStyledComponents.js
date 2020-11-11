import { hoistNonReactStatics, is } from '@wp-g2/utils';
import { create } from 'lodash';
import React from 'react';

import { tags } from './tags';
import { getDisplayName } from './utils';

/**
 * @typedef {(interpolations: any[]) => import('react').FunctionComponent} CreateStyledComponent
 */

/**
 * @typedef {((tagName: import('react').ElementType, options: any) => CreateStyledComponent) & Record<string, CreateStyledComponent>} CreateStyled
 * @property {() => CreateStyled} bind
 */

/**
 * @typedef CreateStyledComponentsProps
 * @property {import('../createCompiler').Compiler} compiler The (custom) Emotion instance.
 * @property {import('./createcoreElements').CoreElements} core The collection of coreElements.
 */

/**
 * Creates a set of styled components for the Style system.
 * These styled components are similarly to Emotion's or Styled-Components styled.div``.
 *
 * A big difference is that the Style system's styled components do NOT require
 * context connection at all. This is HUGE for performance as there are far less
 * React.Component nodes within the render tree.
 *
 * This is thanks to how the Style system compiles and coordinates style values.
 *
 * @param {CreateStyledComponentsProps} props Props to create styled components with.
 * @returns {object} A set of styled components.
 */
export function createStyledComponents({ compiler, core }) {
	/**
	 * A compiler (Emotion) and core (coreElements) are required.
	 */
	if (!core || !compiler) return {};

	const { css, cx } = compiler;

	/**
	 * That's all a <Box /> is :). A core.div.
	 */
	const Box = core.div;

	/** @type {CreateStyled} */
	function createStyled(tagName, options = {}) {
		const {
			/**
			 * A way to pass in extraProps when created a styled component.
			 */
			props: extraProps,
		} = options;

		return (/**@type {any[]} */...interpolatedProps) => {
			/**
			 * @param {any} props 
			 * @param {import('react').Ref<any>} ref 
			 */
			const render = (
				{
					/**
					 * Supporting the ability to render a styled component as anything else.
					 */
					__css,
					as: asProp,
					className,
					cx: cxProp, // Deprecated. Use __css instead.
					...props
				},
				ref,
			) => {
				// Combine all of te props together.
				const mergedProps = { ...extraProps, ...props, ref };

				const baseTag = asProp || tagName;

				const classes = cx(
					css(...interpolatedProps),
					__css && css(__css),
					cxProp && css(cxProp),
					className,
				);

				return (
					<Box as={baseTag} {...mergedProps} className={classes} />
				);
			};

			/** @type {React.ForwardRefExoticComponent<Pick<any, string | number | symbol> & React.RefAttributes<any>> & { withComponent?: ReturnType<createStyled> }} */
			const StyledComponent = React.forwardRef(render);

			/**
			 * Enhancing the displayName.
			 */
			StyledComponent.displayName = is.defined(tagName?.displayName)
				? tagName.displayName
				: `Styled(${getDisplayName(tagName)})`;

			/**
			 * Enhancing .withComponent()
			 * https://github.com/emotion-js/emotion/blob/master/packages/styled-base/src/index.js#L210
			 *
			 * This step is essential as we want styled components generated with
			 * .withComponent to have the correct baseStyles.
			 */
			StyledComponent.withComponent = (nextTag, nextOptions) => {
				return createStyled(
					nextTag,
					nextOptions !== undefined
						? { ...(options || {}), ...nextOptions }
						: options,
				)(...interpolatedProps);
			};

			if (!is.string(tagName)) {
				/**
				 * Hoisting statics one last time, if the tagName is a Component,
				 * rather than an HTML tag, like `div`.
				 */
				return hoistNonReactStatics(StyledComponent, tagName);
			} else {
				return StyledComponent;
			}
		};
	}

	// Bind it to avoid mutating the original function. Just like @emotion/styled:
	// https://github.com/emotion-js/emotion/blob/master/packages/styled/src/index.js
	const styled = createStyled.bind(undefined);

	// Generating the core collection of styled[tagName], with our enhanced
	// version of styled.
	tags.forEach((tagName) => {
		// @ts-ignore
		styled[tagName] = createStyled(tagName);
	});

	return styled;
}
