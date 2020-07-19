import {
	transformValuesToReferences,
	transformValuesToVariables,
	transformValuesToVariablesString,
} from './utils';

const G2_COLORS = {
	black: '#000000',
	blueberry: '#3858E9',
	blueberryDark: '#1D35B4',
	greens: '#33F078',
	grey: '#40464D',
	greyBlack: '#1E1E1E',
	lightBlue: '#33F078',
	lightGrey: '#40464D',
	lighterGrey: '#dddddd',
	pomegrade: '#E26F56',
	white: '#ffffff',
};

const COLOR_PALETTE = {
	brand: G2_COLORS.blueberry,
	destructive: G2_COLORS.pomegrade,
	positive: G2_COLORS.greens,
};

const COLOR_PROPS = {
	colorBodyBackground: G2_COLORS.white,
	colorBodyBackgroundDark: '#18191A',
	colorBrand: COLOR_PALETTE.brand,
	colorText: '#050505',
};

const FONT_PROPS = {
	fontFamily:
		'Cabin,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",sans-serif',
};

const SURFACE_PROPS = {
	surfaceBackgroundBackgroundColor: '#EFEFF3',
	surfaceBackgroundColor: '#fff',
};

const DARK_MODE_PROPS = {
	colorText: '#E4E6EB',
	surfaceBackgroundBackgroundColor: COLOR_PROPS.colorBodyBackgroundDark,
	surfaceBackgroundColor: '#292929',
};

export const BASE_THEME = {
	...G2_COLORS,
	...COLOR_PALETTE,
	...COLOR_PROPS,
	...FONT_PROPS,
	...SURFACE_PROPS,
};

export const DARK_THEME = {
	...DARK_MODE_PROPS,
};

export const THEME = transformValuesToReferences(BASE_THEME);
export const GLOBAL_VARIABLES = transformValuesToVariables(BASE_THEME);
export const GLOBAL_CSS_VARIABLES = transformValuesToVariablesString(
	':root',
	BASE_THEME,
);

export const GLOBAL_DARK_MODE_CSS_VARIABLES = transformValuesToVariablesString(
	'[data-system-ui-mode="dark"]',
	DARK_MODE_PROPS,
);
