import { ThemeProvider as BaseThemeProvider } from 'emotion-theming';
import React, { useEffect, useRef } from 'react';

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

export function ThemeProvider({
	children,
	isGlobal = true,
	isDark = false,
	theme = {},
	...props
}) {
	const nodeRef = useRef();
	useDarkMode({ isDark, isGlobal, ref: nodeRef });

	return (
		<BaseThemeProvider theme={theme}>
			<div {...props} data-system-theme-provider ref={nodeRef}>
				{children}
			</div>
		</BaseThemeProvider>
	);
}

export default ThemeProvider;
