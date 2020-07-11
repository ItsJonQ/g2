import basePresetTheme from '@theme-ui/preset-base';
import { isEmpty } from '@wp-g2/utils';
import colorize from 'tinycolor2';

import { toPx } from './utils';

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

const ANIMATION_PROPS = {
	transitionDuration: '200ms',
	transitionDurationFast: '120ms',
	transitionDurationFaster: '100ms',
	transitionTimingFunction: 'cubic-bezier(0.08, 0.52, 0.52, 1)',
	transitionTimingFunctionControl: 'cubic-bezier(0.12, 0.8, 0.32, 1)',
};

const COLOR_PROPS = {
	colorBaseDark: G2_COLORS.greyBlack,
	colorBaseLight: G2_COLORS.lighterGrey,
	colorBlack: G2_COLORS.black,
	colorBodyBackground: G2_COLORS.white,
	colorBodyBackgroundDark: '#18191A',
	colorBrand: COLOR_PALETTE.brand,
	colorBrandActive: colorize(COLOR_PALETTE.brand).darken(5).toHexString(),
	colorBrandFocus: colorize(COLOR_PALETTE.brand).lighten(10).toHexString(),
	colorBrandHover: colorize(COLOR_PALETTE.brand).darken(5).toHexString(),
	colorDestructive: COLOR_PALETTE.destructive,
	colorDestructiveActive: colorize(COLOR_PALETTE.destructive)
		.darken(5)
		.toHexString(),
	colorDestructiveFocus: colorize(COLOR_PALETTE.destructive)
		.lighten(10)
		.toHexString(),
	colorDestructiveHover: colorize(COLOR_PALETTE.destructive)
		.lighten(5)
		.toHexString(),
	colorPositive: COLOR_PALETTE.positive,
	colorPositiveActive: colorize(COLOR_PALETTE.positive)
		.darken(5)
		.toHexString(),
	colorPositiveFocus: colorize(COLOR_PALETTE.positive)
		.lighten(10)
		.toHexString(),
	colorPositiveHover: colorize(COLOR_PALETTE.positive)
		.lighten(5)
		.toHexString(),
	colorText: '#050505',
	colorTextDark: '#E4E6EB',
	colorWhite: G2_COLORS.white,
};

const SURFACE_PROPS = {
	surfaceBackgroundBackgroundColor: '#EFEFF3',
	surfaceBackgroundBackgroundColorDark: COLOR_PROPS.colorBodyBackgroundDark,
	surfaceBackgroundColor: '#fff',
	surfaceBackgroundColorDark: '#292929',
};

const ELEVATION_PROPS = {
	elevationTransitionDuration: ANIMATION_PROPS.transitionDuration,
	elevationTransitionTimingFunction: ANIMATION_PROPS.transitionTimingFunction,
};

const GRID_PROPS = {
	gridBase: 4,
};

const FONT_PROPS = {
	fontFamily:
		"Cabin, Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
	fontSize: '14px',
};

const CONTROL_PROPS = {
	controlBackgroundColor: '#F0F2F5',
	controlBackgroundColorActive: colorize('#F0F2F5').darken(10).toHexString(),
	controlBackgroundColorActiveDark: colorize('#3A3B3C')
		.darken(5)
		.toHexString(),
	controlBackgroundColorDark: '#3A3B3C',
	controlBackgroundColorHover: colorize('#F0F2F5').darken(5).toHexString(),
	controlBackgroundColorHoverDark: colorize('#3A3B3C')
		.lighten(5)
		.toHexString(),
	controlBorderColor: '#DCDEE1',
	controlBorderColorDark: '#4E4F50',
	controlBorderRadius: '4px',
	controlBorderRadiusRound: '20px',
	controlBoxShadowFocusSize: '2px',
	controlHeight: '36px',
	controlHeightLarge: '40px',
	controlHeightSmall: '32px',
	controlHeightXLarge: '48px',
	controlHeightXSmall: '28px',
	controlHeightXXSmall: '20px',
	controlLineHeight: '18px',
};

const BUTTON_PROPS = {
	buttonBackgroundColor: CONTROL_PROPS.controlBackgroundColor,
	buttonBackgroundColorActive: CONTROL_PROPS.controlBackgroundColorActive,
	buttonBackgroundColorActiveDark:
		CONTROL_PROPS.controlBackgroundColorActiveDark,
	buttonBackgroundColorDark: CONTROL_PROPS.controlBackgroundColorDark,
	buttonBackgroundColorHover: CONTROL_PROPS.controlBackgroundColorHover,
	buttonBackgroundColorHoverDark:
		CONTROL_PROPS.controlBackgroundColorHoverDark,
	buttonBackgroundColorPrimary: COLOR_PROPS.colorBrand,
	buttonBackgroundColorPrimaryActive: COLOR_PROPS.colorBaseDark,
	buttonBackgroundColorPrimaryHover: COLOR_PROPS.colorBrandHover,
	buttonBorderColorFocus: 'transparent',
	buttonBorderColorOutline: CONTROL_PROPS.controlBorderColor,
	buttonBorderColorOutlineDark: CONTROL_PROPS.controlBorderColorDark,
	buttonBorderColorOutlineHover: COLOR_PROPS.colorBaseDark,
	buttonBorderRadius: CONTROL_PROPS.controlBorderRadius,
	buttonBorderRadiusRound: CONTROL_PROPS.controlHeightXLarge,
	buttonBorderStyle: 'solid',
	buttonBorderWidth: '1px',
	buttonBoxShadow: `0 0 0 ${CONTROL_PROPS.controlBoxShadowFocusSize} transparent`,
	buttonBoxShadowDestructiveFocus: `0 0 0 ${
		CONTROL_PROPS.controlBoxShadowFocusSize
	} ${colorize(COLOR_PROPS.colorDestructive).setAlpha(0.4).toRgbString()}`,
	buttonBoxShadowFocus: `0 0 0 ${
		CONTROL_PROPS.controlBoxShadowFocusSize
	} ${colorize(COLOR_PROPS.colorBrand).setAlpha(0.4).toRgbString()}`,
	buttonContentLineHeight: CONTROL_PROPS.controlLineHeight,
	buttonFontWeight: 600,
	buttonHeight: CONTROL_PROPS.controlHeight,
	buttonHeightLarge: CONTROL_PROPS.controlHeightLarge,
	buttonHeightSmall: CONTROL_PROPS.controlHeightSmall,
	buttonLineHeight: CONTROL_PROPS.controlLineHeight,
	buttonPaddingX: toPx(GRID_PROPS.gridBase * 4),
	buttonPaddingXNarrow: toPx(GRID_PROPS.gridBase * 2),
	buttonTextColor: COLOR_PROPS.colorBrand,
	buttonTextColorActive: COLOR_PROPS.colorBaseDark,
	buttonTextColorActiveDark: COLOR_PROPS.colorBaseLight,
	buttonTextColorPrimary: COLOR_PROPS.colorWhite,
	buttonTextColorPrimaryDark: COLOR_PROPS.colorBaseDark,
	buttonTransform: 'scale(1)',
	buttonTransformActive: 'scale(1)',
	buttonTransitionDuration: ANIMATION_PROPS.transitionDuration,
	buttonTransitionTimingFunction:
		ANIMATION_PROPS.transitionTimingFunctionControl,
};

const CARD_PROPS = {
	cardBackgroundColor: SURFACE_PROPS.surfaceBackgroundColor,
	cardBackgroundColorDark: SURFACE_PROPS.surfaceBackgroundColorDark,
	cardSectionBorderColor: 'rgba(0, 0, 0, 0.1)',
	cardSectionBorderColorDark: 'rgba(255, 255, 255, 0.1)',
};

const ICON_CONTROL_PROPS = {
	iconControlBackgroundColor: CONTROL_PROPS.controlBackgroundColor,
	iconControlBackgroundColorDark: CONTROL_PROPS.controlBackgroundColorDark,
	iconControlBackgroundColorHover: CONTROL_PROPS.controlBackgroundColorHover,
	iconControlBackgroundColorHoverDark:
		CONTROL_PROPS.controlBackgroundColorHoverDark,
	iconControlBorderRadius: '50%',
	iconControlPadding: '0',
	iconControlSize: CONTROL_PROPS.controlHeightLarge,
	iconControlSizeLarge: CONTROL_PROPS.controlHeightXLarge,
	iconControlSizeSmall: CONTROL_PROPS.controlHeightSmall,
	iconControlSizeTiny: '20px',
	iconControlTransform: 'scale(1)',
	iconControlTransformActive: 'scale(0.96)',
	iconControlTransitionDuration: ANIMATION_PROPS.transitionDuration,
	iconControlTransitionTimingFunction:
		ANIMATION_PROPS.transitionTimingFunctionControl,
};

const INPUT_PROPS = {
	inputBackgroundColor: 'rgba(0, 0, 0, 0.025)',
	inputBackgroundColorDark: 'rgba(255, 255, 255, 0.025)',
	inputBackgroundColorHover: 'rgba(0, 0, 0, 0.06)',
	inputBackgroundColorHoverDark: 'rgba(255, 255, 255, 0.06)',
	inputBorderColor: CONTROL_PROPS.controlBackgroundColor,
	inputBorderColorDark: CONTROL_PROPS.controlBackgroundColorDark,
	inputBorderColorFocus: COLOR_PROPS.colorBrand,
	inputBorderRadius: CONTROL_PROPS.controlBorderRadius,
	inputBorderRadiusRound: CONTROL_PROPS.controlBorderRadiusRound,
	inputBorderStyle: 'solid',
	inputBorderWidth: '1px',
	inputBoxShadow: `0 0 0 ${CONTROL_PROPS.controlBoxShadowFocusSize} transparent`,
	inputBoxShadowFocus: `0 0 0 ${
		CONTROL_PROPS.controlBoxShadowFocusSize
	} ${colorize(COLOR_PROPS.colorBrand).setAlpha(0.2).toRgbString()}`,
	inputFontFamily: FONT_PROPS.fontFamily,
	inputFontSize: FONT_PROPS.fontSize,
	inputHeight: CONTROL_PROPS.controlHeight,
	inputHeightLarge: CONTROL_PROPS.controlHeightLarge,
	inputHeightSmall: CONTROL_PROPS.controlHeightSmall,
	inputLineHeight: CONTROL_PROPS.controlLineHeight,
	inputPadding: '8px',
	inputPaddingLarge: '10px',
	inputPaddingSmall: '6px',
	inputPaddingX: '12px',
	inputTransition: `all ${ANIMATION_PROPS.transitionDurationFast} ${ANIMATION_PROPS.transitionTimingFunction}`,
};

const MENU_PROPS = {
	menuActiveBackgroundColor: 'rgba(0, 0, 0, 0.1)',
	menuActiveBackgroundColorDark: 'rgba(255, 255, 255, 0.1)',
	menuHoverBackgroundColor: 'rgba(0, 0, 0, 0.05)',
	menuHoverBackgroundColorDark: 'rgba(255, 255, 255, 0.05)',
};

const SPINNER_PROPS = {
	spinnerAnimationDuration: '1000ms',
	spinnerOpacity: 0.6,
};

const SWITCH_PROPS = {
	switchBackgroundColor: 'rgba(0, 0, 0, 0.1)',
	switchBackgroundColorActive: '#34c759',
	switchBackgroundColorDark: 'rgba(255, 255, 255, 0.16)',
	switchHeight: CONTROL_PROPS.controlHeightXSmall,
	switchHeightLarge: CONTROL_PROPS.controlHeightSmall,
	switchHeightSmall: CONTROL_PROPS.controlHeightXXSmall,
	switchToggleBoxShadow: '0px 1px 2px rgba(0, 0, 0, 0.3)',
	switchToggleColor: '#fff',
	switchToggleOffset: 2,
	switchToggleTransitionDuration: ANIMATION_PROPS.transitionDurationFaster,
	switchTransitionDuration: ANIMATION_PROPS.transitionDurationFaster,
	switchWidth: '48px',
	switchWidthLarge: '52px',
	switchWidthSmall: '36px',
};

export const THEME_PROPS = {
	// Base theme
	...COLOR_PROPS,
	...SURFACE_PROPS,
	// Props
	...ANIMATION_PROPS,
	...BUTTON_PROPS,
	...CARD_PROPS,
	...CONTROL_PROPS,
	...ELEVATION_PROPS,
	...GRID_PROPS,
	...ICON_CONTROL_PROPS,
	...INPUT_PROPS,
	...MENU_PROPS,
	...SPINNER_PROPS,
	...SWITCH_PROPS,
};

export const BASE_THEME = {
	...basePresetTheme,
	config: THEME_PROPS,
	fonts: {
		body:
			'Cabin, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
		heading: 'inherit',
		monospace: 'Menlo, monospace',
	},
};

export const baseTheme = {
	...BASE_THEME,
	fontSizes: [11, 12, 14, 16, 20, 24, 32, 48, 64],
	headingFontSizes: [48, 32, 24, 20, 16, 14],
};

export function getTheme(theme) {
	if (!theme || isEmpty(theme)) {
		return baseTheme;
	}

	return theme;
}
