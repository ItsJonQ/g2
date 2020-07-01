import React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { ThemeContext } from '@emotion/core';
import { mergeThemeProps, getDisplayName } from './utils';

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

export default withTheme;
