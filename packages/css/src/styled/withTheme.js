import { ThemeContext } from '@emotion/core';
import { getDisplayName, hoistNonReactStatics } from '@g2/utils';
import React from 'react';

import { mergeThemeProps } from './utils';

export function withTheme(Component) {
	let render = (props, ref) => {
		return (
			<ThemeContext.Consumer>
				{(theme) => {
					const mergedProps = mergeThemeProps(props, theme);
					return <Component ref={ref} {...mergedProps} />;
				}}
			</ThemeContext.Consumer>
		);
	};
	let WithTheme = React.forwardRef(render);

	WithTheme.displayName = `WithTheme(${getDisplayName(Component)})`;

	return hoistNonReactStatics(WithTheme, Component);
}
