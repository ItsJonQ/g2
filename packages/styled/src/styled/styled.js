/** @jsx jsx */
import { ThemeContext } from '@emotion/core';
import emotionStyled from '@emotion/styled';
import { css as themeCss, get } from '@theme-ui/css';
import { hoistNonReactStatics, is } from '@wp-g2/utils';
import React from 'react';
import { jsx } from 'theme-ui';

import { Box } from '../components/Box';
import { tags } from './tags';
import { getDisplayName, mergeThemeProps, RENDERED_BASE_STYLES } from './utils';

const baseStyles = ({ theme }) => {
	return themeCss({
		MozOsxFontSmoothing: 'grayscale',
		WebkitFontSmoothing: 'antialiased',
		fontFamily: get(theme, 'fonts.body'),
		fontSize: 2,
	})(theme);
};

/*
 * We're enhancing the styled function from @emotion/styled.
 * This will allow us to reliably pass in our enhanced theme object.
 */
function createStyled(tagName, options = {}) {
	const { props: extraProps, pure = true } = options;
	// Source:
	// https://github.com/emotion-js/emotion/blob/master/packages/styled-base/src/index.js#L22
	if (process.env.NODE_ENV !== 'production') {
		if (is.undefined(tagName)) {
			throw new Error(
				'You are trying to create a styled element with an undefined component.\nYou may have forgotten to import it.',
			);
		}
	}

	/*
	 * interpolationProps will be the CSS-in-JS values defined in something like
	 * a styled.div`...`
	 */
	return (...interpolatedProps) => {
		const styledArgs = tagName[RENDERED_BASE_STYLES]
			? interpolatedProps
			: [baseStyles, ...interpolatedProps];
		/*
		 * We're not mutating the original @emotion/styled function.
		 * We'll be creating a styled component using the core library
		 * implementation.
		 *
		 * The next steps will be the enhancements.
		 * The baseStyles argument is essential as we want a consistent
		 * base style for all of our components (or anything rendered with
		 * styled).
		 */
		const SC = emotionStyled(tagName)(styledArgs);

		/*
		 * Theme support.
		 * We want to provide the styled components with theme values.
		 * This avoids having consumers of these components having to use
		 * a <ThemeProvider />.
		 */
		const render = (props, ref) => (
			<ThemeContext.Consumer>
				{(theme) => {
					/*
					 * The mergeThemeProps consolidates incoming props.theme
					 * and theme derived from context. This step also enhances
					 * the theme object with utilities that are core to this
					 * experience.
					 */
					const mergedProps = mergeThemeProps(props, theme);
					/*
					 * Lastly, we'll pass the enhanced theme value into
					 * our styled component to interpolate.
					 */

					return <SC ref={ref} {...extraProps} {...mergedProps} />;
				}}
			</ThemeContext.Consumer>
		);

		const ForwardedComponent = React.forwardRef(render);
		const RenderedComponent = pure
			? React.memo(ForwardedComponent)
			: ForwardedComponent;

		/*
		 * Hoisting statics from the @emotion/styled function to our
		 * enhanced styled component.
		 */
		const StyledComponent = hoistNonReactStatics(RenderedComponent, SC);

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
			)(styledArgs);
		};

		if (!StyledComponent[RENDERED_BASE_STYLES]) {
			StyledComponent[RENDERED_BASE_STYLES] = true;
		}

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

// Bind it to avoid mutating the original function. Just like @emotion/styled:
// https://github.com/emotion-js/emotion/blob/master/packages/styled/src/index.js
export const styled = createStyled.bind();

// Generating the core collection of styled[tagName], with our enhanced
// version of styled.
tags.forEach((tagName) => {
	styled[tagName] = styled(Box, { props: { as: tagName } });
});
