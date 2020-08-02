import { deepEqual } from '@wp-g2/utils';
import { ThemeProvider as BaseThemeProvider } from 'emotion-theming';
import React, { useLayoutEffect, useRef, useState } from 'react';

import { transformValuesToVariables } from '../theme/utils';

function useDarkMode({ isDark = false, isGlobal = true, ref }) {
	useLayoutEffect(() => {
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

	useLayoutEffect(() => {
		if (deepEqual(themeRef.current, theme)) return;
		themeRef.current = theme;
		const nextTheme = transformValuesToVariables(theme);
		if (isGlobal) {
			requestAnimationFrame(() => {
				const rootNode = document.documentElement;
				for (const [k, v] of Object.entries(nextTheme)) {
					rootNode.style.setProperty(k, v);
				}
			});
		} else {
			setThemeStyles(nextTheme);
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
