import { ThemeContext } from '@emotion/core';
import emotionStyled from '@emotion/styled';
import { is } from '@g2/utils';
import hoistNonReactStatics from 'hoist-non-react-statics';
import React from 'react';

import { Box } from '../components/Box';
import { tags } from './tags';
import { getDisplayName, mergeThemeProps } from './utils';

function createStyled(tagName, options = {}) {
	const { props: extraProps } = options;
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
		const SC = emotionStyled(tagName)(...interpolatedProps);

		const render = (props, ref) => (
			<ThemeContext.Consumer>
				{(theme) => {
					const mergedProps = mergeThemeProps(props, theme);
					return <SC ref={ref} {...extraProps} {...mergedProps} />;
				}}
			</ThemeContext.Consumer>
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

export const styled = createStyled.bind();

tags.forEach((tagName) => {
	styled[tagName] = styled(Box, { props: { as: tagName } });
});

styled.Box = styled(Box);
styled.BaseView = styled(Box);
