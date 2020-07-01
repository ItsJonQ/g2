import React from 'react';
import emotionStyled from '@emotion/styled';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { ThemeContext } from '@emotion/core';
import { is } from '../utils';
import { mergeThemeProps, getDisplayName } from './utils';

export function createStyled(tagName) {
	// Source:
	// https://github.com/emotion-js/emotion/blob/master/packages/styled-base/src/index.js#L22
	if (process.env.NODE_ENV !== 'production') {
		if (is.undefined(tagName)) {
			throw new Error(
				'You are trying to create a styled element with an undefined component.\nYou may have forgotten to import it.',
			);
		}
	}

	return (...interpolatedProps) => {
		const PrivateStyledComponent = emotionStyled(tagName)(
			...interpolatedProps,
		);

		const render = (props, ref) => (
			<ThemeContext>
				{(theme) => {
					const mergedProps = mergeThemeProps(props, theme);
					return (
						<PrivateStyledComponent ref={ref} {...mergedProps} />
					);
				}}
			</ThemeContext>
		);

		const StyledComponent = React.forwardRef(render);

		StyledComponent.displayName = is.defined(tagName?.displayName)
			? tagName.displayName
			: `Styled(${getDisplayName(tagName)})`;

		if (!is.string(tagName)) {
			return hoistNonReactStatics(StyledComponent, tagName);
		} else {
			return StyledComponent;
		}
	};
}

export const styled = createStyled;
