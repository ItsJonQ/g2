import { get } from '@wp-g2/create-styles';

import { BACKGROUND_COLOR_PROPS, G2_COLORS, WORDPRESS_COLORS } from './tokens';
import {
	generateColorAdminColors,
	generateColorDestructiveColors,
	space,
} from './utils';

export const SUPPORTED_COLORS = [
	'blue',
	'red',
	'purple',
	'green',
	'yellow',
	'orange',
	'darkGray',
	'lightGray',
];

const ANIMATION_PROPS = {
	transitionDuration: '200ms',
	transitionDurationFast: '160ms',
	transitionDurationFaster: '120ms',
	transitionDurationFastest: '100ms',
	transitionTimingFunction: 'cubic-bezier(0.08, 0.52, 0.52, 1)',
	transitionTimingFunctionControl: 'cubic-bezier(0.12, 0.8, 0.32, 1)',
};

const COLOR_PROPS = {
	...WORDPRESS_COLORS,
	...BACKGROUND_COLOR_PROPS,
	colorAdmin: '#007cba',
	colorDestructive: '#E26F56',
	colorBodyBackground: get('white'),
	colorDivider: 'rgba(0, 0, 0, 0.1)',
	colorPositive: get('greens'),
	colorScrollbarThumb: 'rgba(0, 0, 0, 0.2)',
	colorScrollbarThumbHover: 'rgba(0, 0, 0, 0.5)',
	colorScrollbarTrack: 'rgba(0, 0, 0, 0.04)',
	colorText: '#1e1e1e',
	colorTextInverted: get('white'),
	colorTextHeading: '#050505',
	colorTextMuted: '#8a8b8c',
	...generateColorAdminColors('#007cba'),
	...generateColorDestructiveColors('#E26F56'),
};

const FONT_PROPS = {
	fontFamily:
		'Inter,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",sans-serif',
	fontFamilyMono: 'SFMono-Regular,Consolas,Liberation Mono,Menlo,monospace',
	fontSize: '13px',
	fontSizeH1: `calc(2.44 * ${get('fontSize')})`,
	fontSizeH2: `calc(1.95 * ${get('fontSize')})`,
	fontSizeH3: `calc(1.56 * ${get('fontSize')})`,
	fontSizeH4: `calc(1.25 * ${get('fontSize')})`,
	fontSizeH5: `calc(1 * ${get('fontSize')})`,
	fontSizeH6: `calc(0.8 * ${get('fontSize')})`,
	fontSizeInputMobile: '16px',
	fontSizeMobile: '15px',
	fontSizeSmall: `calc(0.92 * ${get('fontSize')})`,
	fontSizeXSmall: `calc(0.75 * ${get('fontSize')})`,
};

const SURFACE_PROPS = {
	surfaceBackgroundColor: get('surfaceColor'),
	surfaceBackgroundSubtleColor: '#F3F3F3',
	surfaceBackgroundTintColor: '#F5F5F5',
	surfaceBorderColor: 'rgba(0, 0, 0, 0.1)',
	surfaceBorderBoldColor: 'rgba(0, 0, 0, 0.15)',
	surfaceBorderSubtleColor: 'rgba(0, 0, 0, 0.05)',
	surfaceColor: get('white'),
};

const ELEVATION_PROPS = {
	elevationIntensity: 1,
};

const GRID_PROPS = {
	gridBase: '4px',
};

const CONTROL_PROPS = {
	controlBackgroundColor: get('white'),
	controlBackgroundColorHover: 'rgba(0, 0, 0, 0.05)',
	controlBackgroundDimColor: 'rgba(0, 0, 0, 0.1)',
	controlBackgroundBrightColor: 'rgba(0, 0, 0, 0.03)',
	controlBorderColor: '#757575',
	controlBorderColorHover: get('controlBorderColor'),
	controlBorderColorSubtle: 'transparent',
	controlBorderRadius: '2px',
	controlBorderSubtleColor: 'rgba(0, 0, 0, 0.2)',
	controlBoxShadow: `transparent`,
	controlBoxShadowFocus: `0 0 0 2px ${get('colorAdminRgb20')}`,
	controlDestructiveBorderColor: get('colorDestructive'),
	controlDestructiveBorderColorFocus: get('controlDestructiveBorderColor'),
	controlDestructiveBoxShadowFocus: get('controlBoxShadowFocus'),
	controlHeight: '30px',
	controlHeightLarge: `calc(${get('controlHeight')} * 1.2)`,
	controlHeightSmall: `calc(${get('controlHeight')} * 0.8)`,
	controlHeightXLarge: `calc(${get('controlHeight')} * 1.4)`,
	controlHeightXSmall: `calc(${get('controlHeight')} * 0.67)`,
	controlHeightXXSmall: `calc(${get('controlHeight')} * 0.4)`,
	controlPaddingX: '8px',
	controlPaddingXLarge: `calc(${get('controlPaddingX')} * 2)`,
	controlPaddingXSmall: `calc(${get('controlPaddingX')} / 2)`,
	controlPrimaryTextColorActive: get('white'),
	controlPrimaryTextColor: get('white'),
	controlSurfaceBoxShadow:
		'0 1px 1px rgba(0, 0, 0, 0.2), 0 1px 2px rgba(0, 0, 0, 0.2)',
	controlSurfaceColor: get('white'),
	controlTextActiveColor: get('colorAdmin'),
};

const BUTTON_PROPS = {
	buttonTextColor: get('colorAdmin'),
	buttonTextColorActive: get('buttonTextColor'),

	buttonPrimaryColor: get('colorAdmin'),
	buttonPrimaryColorHover: get('buttonPrimaryColor'),
	buttonPrimaryColorActive: get('colorText'),
	buttonPrimaryColorFocus: get('buttonPrimaryColor'),
	buttonPrimaryBorderColorFocus: get('buttonPrimaryColor'),
	buttonPrimaryTextColor: get('controlPrimaryTextColor'),
	buttonPrimaryTextColorActive: get('controlPrimaryTextColor'),

	buttonSecondaryColor: 'transparent',
	buttonSecondaryColorHover: get('buttonSecondaryColor'),
	buttonSecondaryColorActive: get('buttonSecondaryColor'),
	buttonSecondaryColorFocus: get('buttonSecondaryColor'),
	buttonSecondaryBorderColor: get('buttonPrimaryColor'),
	buttonSecondaryTextColor: get('buttonPrimaryColor'),
	buttonSecondaryTextColorFocus: get('buttonPrimaryColor'),
	buttonSecondaryTextColorActive: get('buttonPrimaryColor'),
	buttonSecondaryBorderColorHover: get('buttonPrimaryColor'),
	buttonSecondaryBorderColorActive: get('buttonPrimaryColor'),
	buttonSecondaryBorderColorFocus: get('buttonPrimaryColor'),

	buttonControlActiveStateColor: get('buttonPrimaryColor'),
	buttonControlActiveStateColorHover: get('buttonControlActiveStateColor'),
	buttonControlActiveStateColorActive: get('buttonControlActiveStateColor'),
	buttonControlActiveStateColorFocus: get('buttonControlActiveStateColor'),
	buttonControlActiveStateTextColor: get('buttonPrimaryTextColor'),
};

const CARD_PROPS = {
	cardBorderRadius: '2px',
	cardPaddingX: space(3),
	cardPaddingY: space(3),
	cardPadding: `${get('cardPaddingX')} ${get('cardPaddingY')}`,
	cardHeaderFooterPaddingY: space(1),
	cardHeaderHeight: '44px',
};

const LINK_PROPS = {
	linkColor: get('colorAdmin'),
	linkColorHover: get('colorAdmin'),
	linkColorActive: get('colorAdmin'),
	linkColorFocus: get('colorAdmin'),
};

const MENU_PROPS = {
	menuItemBorderWidth: '1px',
	menuItemFocusBackgroundColor: 'transparent',
	menuItemFocusBorderColor: get('colorAdmin'),
	menuItemFocusTextColor: get('colorAdmin'),
	menuItemFocusBoxShadow: get('controlBorderSubtleColor'),
	menuItemActiveBackgroundColor: get('controlBackgroundColor'),
	menuItemActiveBorderColor: get('colorAdmin'),
	menuItemActiveTextColor: get('colorText'),
	menuItemActiveBoxShadow: get('controlBorderSubtleColor'),
};

const PANEL_PROPS = {
	panelHeaderPadding: space(3),
	panelBodyPadding: `${space(2)} ${space(3)} ${space(3)}`,
};

const SEGMENTED_CONTROL_PROPS = {
	segmentedControlFontSize: '12px',
	segmentedControlBackgroundColor: get('controlBackgroundColor'),
	segmentedControlBorderColor: get('controlBorderColor'),
	segmentedControlBackdropBackgroundColor: get('controlSurfaceColor'),
	segmentedControlBackdropBorderColor: get('controlBorderColor'),
	segmentedControlBackdropBoxShadow: 'transparent',
	segmentedControlButtonColorActive: get('controlBackgroundColor'),
};

const SLIDER_PROPS = {
	sliderThumbBorderColor: 'transparent',
	sliderThumbBoxShadow: 'none',
	sliderThumbBoxShadowSizeFocus: '3px',
	sliderThumbBoxShadowColorFocus: get('colorAdminRgb20'),
	sliderThumbBackgroundColor: get('colorAdmin'),
};

const SWITCH_PROPS = {
	switchBackdropBackgroundColor: 'transparent',
	switchBackdropBackgroundColorActive: get('colorAdmin'),
	switchBackdropBorderColor: get('colorText'),
	switchBackdropBorderColorActive: get('colorAdmin'),
	switchBackdropBorderColorFocus: get('white'),
	switchToggleBackgroundColor: get('colorText'),
	switchToggleBackgroundColorActive: get('colorTextInverted'),
	switchToggleBoxShadow: 'none',
	switchPaddingOffset: '6px',
};

const BASE_THEME = {
	// Colors
	...G2_COLORS,
	...COLOR_PROPS,
	// Base
	...CARD_PROPS,
	...CONTROL_PROPS,
	...ELEVATION_PROPS,
	...FONT_PROPS,
	...SURFACE_PROPS,
	// Animations
	...ANIMATION_PROPS,
	// The Rest
	...BUTTON_PROPS,
	...GRID_PROPS,
	...LINK_PROPS,
	...MENU_PROPS,
	...PANEL_PROPS,
	...SEGMENTED_CONTROL_PROPS,
	...SLIDER_PROPS,
	...SWITCH_PROPS,
};

export const config = BASE_THEME;
