import { deepEqual } from '@wp-g2/utils';
import { ThemeProvider as BaseThemeProvider } from 'emotion-theming';
import React, { useEffect, useRef, useState } from 'react';

import { injectGlobal } from '../style-system';
import {
	transformValuesToReferences,
	transformValuesToVariables,
	transformValuesToVariablesString,
} from '../theme/utils';

function useDarkMode({ isDark = false, isGlobal = true, ref }) {
	useEffect(() => {
		let target = document.documentElement;

		if (!isGlobal && ref.current) {
			target = ref.current;
		}

		if (isDark) {
			target.setAttribute('data-system-ui-mode', 'dark');
		} else {
			target.setAttribute('data-system-ui-mode', 'light');
		}
	}, [isGlobal, isDark, ref]);
}

function useThemeStyles({ isGlobal = true, theme = {} }) {
	const themeRef = useRef(theme);
	const [themeStyles, setThemeStyles] = useState({});

	useEffect(() => {
		if (deepEqual(themeRef.current, theme)) {
			return;
		}
		themeRef.current = theme;

		if (isGlobal) {
			const globalStyles = transformValuesToVariablesString(
				':root',
				theme,
			);
			injectGlobal`
				${globalStyles}
			`;
		} else {
			setThemeStyles(transformValuesToVariables(theme));
		}
	}, [isGlobal, theme]);

	return themeStyles;
}

export function ThemeProvider({
	children,
	isGlobal = true,
	isDark = false,
	theme = {},
	...props
}) {
	const nodeRef = useRef();
	const themeStyles = useThemeStyles({ isGlobal, theme });
	useDarkMode({ isDark, isGlobal, ref: nodeRef });

	return (
		<BaseThemeProvider theme={theme}>
			<div
				{...props}
				data-system-theme-provider
				ref={nodeRef}
				style={themeStyles}
			>
				{children}
			</div>
		</BaseThemeProvider>
	);
}

export default ThemeProvider;
