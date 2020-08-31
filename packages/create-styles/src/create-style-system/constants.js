/**
 * Uses the the prefix for the CSS variables compiled by the system.
 */
export const NAMESPACE = '--wp-g2';

export const DARK_MODE_ATTR = '[data-system-ui-mode="dark"]';
export const HIGH_CONTRAST_MODE_MODE_ATTR =
	'[data-system-ui-contrast-mode="high"]';

export const COLOR_BLIND_MODE_ATTR = '[data-system-ui-color-blind-mode="true"]';
export const REDUCED_MOTION_MODE_ATTR =
	'[data-system-ui-reduced-motion-mode="true"]';

export const DARK_HIGH_CONTRAST_MODE_MODE_ATTR = `${DARK_MODE_ATTR}${HIGH_CONTRAST_MODE_MODE_ATTR}`;
