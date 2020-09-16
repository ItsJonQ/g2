import { get } from '@wp-g2/create-styles';

import { DARK_MODE_COLORS, DARK_MODE_RGBA_COLORS } from './tokens';

const DARK_MODE_PROPS = {
	...DARK_MODE_COLORS,
	...DARK_MODE_RGBA_COLORS,
	colorDivider: 'rgba(255, 255, 255, 0.1)',
	colorScrollbarThumb: 'rgba(255, 255, 255, 0.2)',
	colorScrollbarThumbHover: 'rgba(255, 255, 255, 0.5)',
	colorScrollbarTrack: 'rgba(0, 0, 0, 0.04)',
	colorText: '#E4E6EB',
	colorTextInverted: '#050505',
	controlBackgroundColor: 'rgba(255, 255, 255, 0.1)',
	controlBackgroundBrightColor: 'rgba(255, 255, 255, 0.08)',
	controlBackgroundDimColor: 'rgba(255, 255, 255, 0.2)',
	controlBorderSubtleColor: 'rgba(255, 255, 255, 0.5)',
	controlPrimaryTextActiveColor: get('black'),
	controlPrimaryTextColor: get('white'),
	controlSurfaceColor: 'rgba(255, 255, 255, 0.3)',
	controlTextActiveColor: get('white'),
	surfaceBackgroundColor: get('colorBodyBackgroundDark'),
	surfaceBackgroundSubtleColor: '#151515',
	surfaceBackgroundTintColor: '#252525',
	surfaceBorderColor: 'rgba(255, 255, 255, 0.1)',
	surfaceColor: '#292929',
};

export const DARK_THEME = {
	...DARK_MODE_PROPS,
};

export const darkModeConfig = DARK_THEME;
