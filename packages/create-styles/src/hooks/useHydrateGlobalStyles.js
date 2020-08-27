import { injectGlobal } from '../compiler';

const __INTERNAL_STATE__ = {
	didInjectGlobal: false,
};

export function useHydrateGlobalStyles({ globalStyles = {} }) {
	if (__INTERNAL_STATE__.didInjectGlobal) return;

	const {
		darkHighContrastModeCSSVariables,
		darkModeCSSVariables,
		globalCSSVariables,
		highContrastModeCSSVariables,
	} = globalStyles;

	injectGlobal`
		${globalCSSVariables};
		${darkModeCSSVariables};
		${highContrastModeCSSVariables};
		${darkHighContrastModeCSSVariables};
	`;

	__INTERNAL_STATE__.didInjectGlobal = true;
}
