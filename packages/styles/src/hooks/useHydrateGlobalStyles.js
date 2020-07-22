import { injectGlobal } from '../style-system';
import { GLOBAL_CSS_VARIABLES, GLOBAL_DARK_MODE_CSS_VARIABLES } from '../theme';

const __INTERNAL_STATE__ = {
	didInjectGlobal: false,
};

export function useHydrateGlobalStyles() {
	if (__INTERNAL_STATE__.didInjectGlobal) return;

	injectGlobal`
		${GLOBAL_CSS_VARIABLES};
		${GLOBAL_DARK_MODE_CSS_VARIABLES};
	`;

	__INTERNAL_STATE__.didInjectGlobal = true;
}
