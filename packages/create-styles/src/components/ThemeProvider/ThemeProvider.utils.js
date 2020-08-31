import { deepEqual, is } from '@wp-g2/utils';
import { useLayoutEffect, useRef, useState } from 'react';

import { transformValuesToVariables } from '../../create-style-system/utils';
import { useReducedMotion } from '../../hooks';

export function useColorBlindMode({ isColorBlind, isGlobal = true, ref }) {
	useLayoutEffect(() => {
		if (!is.defined(isColorBlind)) return;

		let target = document.documentElement;

		if (!isGlobal && ref.current) {
			target = ref.current;
		}

		if (isColorBlind) {
			target.setAttribute('data-system-ui-color-blind-mode', 'true');
		} else {
			target.setAttribute('data-system-ui-color-blind-mode', 'false');
		}
	}, [isGlobal, isColorBlind, ref]);
}

export function useDarkMode({ isDark, isGlobal = true, ref }) {
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

export function useHighContrastMode({ isGlobal = true, isHighContrast, ref }) {
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

export function useReducedMotionMode({
	isGlobal = true,
	isReducedMotion,
	ref,
}) {
	const [, setIsReducedMotion] = useReducedMotion(isReducedMotion);

	useLayoutEffect(() => {
		if (isGlobal) {
			setIsReducedMotion(!!isReducedMotion);
		}
	}, [isGlobal, isReducedMotion, setIsReducedMotion]);

	useLayoutEffect(() => {
		if (!is.defined(isReducedMotion)) return;

		let target = document.documentElement;

		if (!isGlobal && ref.current) {
			target = ref.current;
		}

		if (isReducedMotion) {
			target.setAttribute('data-system-ui-reduced-motion-mode', 'true');
		} else {
			target.setAttribute('data-system-ui-reduced-motion-mode', 'false');
		}
	}, [isGlobal, isReducedMotion, ref]);
}

export function useThemeStyles({ isGlobal = true, theme = {} }) {
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
