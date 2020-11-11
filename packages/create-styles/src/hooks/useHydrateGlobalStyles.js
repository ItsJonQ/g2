const __INTERNAL_STATE__ = {
	didInjectGlobal: false,
};

/** @typedef {import('../components/ThemeProvider/ThemeProvider').StyleConfiguration} StyleConfiguration */

/**
 * @typedef GlobalStyles
 * @property {StyleConfiguration} [darkHighContrastModeCSSVariables]
 * @property {StyleConfiguration} [darkModeCSSVariables]
 * @property {StyleConfiguration} [globalCSSVariables]
 * @property {StyleConfiguration} [highContrastModeCSSVariables]
 */

/**
 * @typedef UseHydrateGlobalStylesProps
 * @property {import('create-emotion').Emotion['injectGlobal']} injectGlobal injectGlobal function from the compiler (Emotion).
 * @property {GlobalStyles} globalStyles Global style values to be injected.
 */

/**
 * Renders configs (global styles) from the Style system into the DOM on
 * initial render.
 *
 * This is a very important custom hook for the Style system.
 * This hook injects the global styles (theme configs, dark mode configs, etc...)
 * from the Style system into the DOM. It does so seamlessly (once) on initial
 * render, enabling the styled coreElements, components, and CSS compiler
 * to work without the need for Context Providers/Consumers.
 *
 * @param {UseHydrateGlobalStylesProps} props Props for the hook.
 */
export function useHydrateGlobalStyles({ injectGlobal, globalStyles = {} }) {
	if (__INTERNAL_STATE__.didInjectGlobal) return;

	const {
		darkHighContrastModeCSSVariables,
		darkModeCSSVariables,
		globalCSSVariables,
		highContrastModeCSSVariables,
	} = globalStyles;

	/**
	 * Using the compiler's (Emotion) injectGlobal function.
	 */
	if (injectGlobal) {
		injectGlobal`
			${globalCSSVariables};
			${darkModeCSSVariables};
			${highContrastModeCSSVariables};
			${darkHighContrastModeCSSVariables};
		`;

		/**
		 * Ensure that this only happens once with a singleton state.
		 */
		__INTERNAL_STATE__.didInjectGlobal = true;
	}
}
