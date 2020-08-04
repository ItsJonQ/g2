import { deepEqual, is } from '@wp-g2/utils';
import { ThemeProvider as BaseThemeProvider } from 'emotion-theming';
import React, { useLayoutEffect, useRef, useState } from 'react';

import { transformValuesToVariables } from '../theme/utils';

function useDarkMode({ isDark, isGlobal = true, ref }) {
	useLayoutEffect(() => {
		if (!is.defined(isDark)) return;

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

function useHighContrastMode({ isGlobal = true, isHighContrast, ref }) {
	useLayoutEffect(() => {
		if (!is.defined(isHighContrast)) return;

		let target = document.documentElement;

		if (!isGlobal && ref.current) {
			target = ref.current;
		}

		if (isHighContrast) {
			target.setAttribute('data-system-ui-contrast-mode', 'high');
		} else {
			target.setAttribute('data-system-ui-contrast-mode', 'normal');
		}
	}, [isGlobal, isHighContrast, ref]);
}

function useThemeStyles({ isGlobal = true, theme = {} }) {
	const themeRef = useRef();
	const [themeStyles, setThemeStyles] = useState({});

	useLayoutEffect(() => {
		if (deepEqual(themeRef.current, theme)) return;
		themeRef.current = theme;
		const rootNode = document.documentElement;
		const nextTheme = transformValuesToVariables(theme);
		if (isGlobal) {
			requestAnimationFrame(() => {
				for (const [k, v] of Object.entries(nextTheme)) {
					rootNode && rootNode.style.setProperty(k, v);
				}
			});
		} else {
			setThemeStyles((prev) => ({ ...prev, ...nextTheme }));
		}
	}, [isGlobal, theme]);

	return themeStyles;
}

export function ThemeProvider({
	children,
	isGlobal = true,
	isDark,
	isHighContrast,
	theme = {},
	...props
}) {
	const nodeRef = useRef();
	const themeStyles = useThemeStyles({ isGlobal, theme });

	useHighContrastMode({ isGlobal, isHighContrast, ref: nodeRef });
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
