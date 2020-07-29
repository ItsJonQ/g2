import { hoistNonReactStatics, is } from '@wp-g2/utils';
import React from 'react';

import { Box } from './components';
import { tags } from './create-system';
import { css, cx } from './style-system';

function createStyled(tagName, options = {}) {
	const { props: extraProps } = options;

	return (...interpolatedProps) => {
		const render = (
			{ as: asProp, className, cx: cxProp, ...props },
			ref,
		) => {
			const mergedProps = { ...extraProps, ...props, ref };
			const baseTag = asProp || tagName;
			const isBaseTag = asProp ? is.string(asProp) : is.string(tagName);

			let finalCxProp;
			let finalClasses;

			if (!isBaseTag) {
				finalClasses = cx([
					css(...interpolatedProps),
					cxProp,
					className,
				]);
			} else {
				finalCxProp = [css(...interpolatedProps), cxProp];
			}

			return (
				<Box
					as={baseTag}
					{...mergedProps}
					className={finalClasses}
					cx={finalCxProp}
				/>
			);
		};

		const StyledComponent = React.forwardRef(render);

		/*
		 * Enhancing the displayName.
		 */
		StyledComponent.displayName = is.defined(tagName?.displayName)
			? tagName.displayName
			: `Styled(${getDisplayName(tagName)})`;

		/*
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
			/*
			 * Hoisting statics one last time, if the tagName is a Component,
			 * rather than an HTML tag, like `div`.
			 */
			return hoistNonReactStatics(StyledComponent, tagName);
		} else {
			return StyledComponent;
		}
	};
}

function getDisplayName(tagName) {
	const displayName = is.string(tagName)
		? tagName
		: tagName.displayName || tagName.name || 'Component';

	return displayName;
}

// Bind it to avoid mutating the original function. Just like @emotion/styled:
// https://github.com/emotion-js/emotion/blob/master/packages/styled/src/index.js
export const styled = createStyled.bind();

// Generating the core collection of styled[tagName], with our enhanced
// version of styled.
tags.forEach((tagName) => {
	styled[tagName] = createStyled(tagName);
});
