import { ThemeContext } from '@emotion/core';
import { getDisplayName, hoistNonReactStatics } from '@wp-g2/utils';
import React from 'react';

import { mergeThemeProps } from './utils';

export function withTheme(Component, options = {}) {
	const { pure = true } = options;

	const render = (props, ref) => {
		return (
			<ThemeContext.Consumer>
				{(theme) => {
					const mergedProps = mergeThemeProps(props, theme);
					return <Component ref={ref} {...mergedProps} />;
				}}
			</ThemeContext.Consumer>
		);
	};
	const ForwardedComponent = React.forwardRef(render);
	const WithTheme = pure
		? React.memo(ForwardedComponent)
		: ForwardedComponent;

	WithTheme.displayName = `WithTheme(${getDisplayName(Component)})`;

	return hoistNonReactStatics(WithTheme, Component);
}
