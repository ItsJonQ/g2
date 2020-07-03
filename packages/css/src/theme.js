import basePresetTheme from '@theme-ui/preset-base';
import colorize from 'tinycolor2';

import { toPx } from './utils';

const COLOR_PALETTE = {
	brand: '#3958E8',
	destructive: '#F6372B',
};

const THEME_CONFIG_PROPS = {
	isDark: false,
};

const ANIMATION_PROPS = {
	transitionDuration: '200ms',
	transitionDurationFast: '120ms',
	transitionDurationFaster: '100ms',
	transitionTimingFunction: 'cubic-bezier(0.08, 0.52, 0.52, 1)',
	transitionTimingFunctionControl: 'cubic-bezier(0.12, 0.8, 0.32, 1)',
};

const COLOR_PROPS = {
	colorBodyBackground: '#FFFFFF',
	colorBodyBackgroundDark: '#18191A',
	colorBrand: COLOR_PALETTE.brand,
	colorBrandActive: colorize(COLOR_PALETTE.brand).darken(5).toHexString(),
	colorBrandFocus: colorize(COLOR_PALETTE.brand).lighten(10).toHexString(),
	colorBrandHover: colorize(COLOR_PALETTE.brand).lighten(5).toHexString(),
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
	colorText: '#050505',
	colorTextDark: '#E4E6EB',
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
	buttonBackgroundColorPrimaryActive: COLOR_PROPS.colorBrandActive,
	buttonBackgroundColorPrimaryHover: COLOR_PROPS.colorBrandHover,
	buttonBorderColorFocus: 'transparent',
	buttonBorderColorOutline: CONTROL_PROPS.controlBorderColor,
	buttonBorderColorOutlineDark: CONTROL_PROPS.controlBorderColorDark,
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
	buttonTextColorPrimary: '#FFFFFF',
	buttonTransform: 'scale(1)',
	buttonTransformActive: 'scale(0.96)',
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
	inputBackgroundColor: CONTROL_PROPS.controlBackgroundColor,
	inputBackgroundColorDark: CONTROL_PROPS.controlBackgroundColorDark,
	inputBackgroundColorHover: CONTROL_PROPS.controlBackgroundColorHover,
	inputBackgroundColorHoverDark:
		CONTROL_PROPS.controlBackgroundColorHoverDark,
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
	...THEME_CONFIG_PROPS,
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
	...SPINNER_PROPS,
	...SWITCH_PROPS,
};

export const BASE_THEME = {
	...basePresetTheme,
	config: THEME_PROPS,
};

export const baseTheme = {
	...BASE_THEME,
	fontSizes: [11, 12, 14, 16, 20, 24, 32, 48, 64],
};

export function getTheme(theme) {
	if (!theme || Object.keys(theme).length === 0) {
		return baseTheme;
	}

	return theme;
}
