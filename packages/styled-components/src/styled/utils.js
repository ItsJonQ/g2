import { css as themeCss, get } from '@theme-ui/css';
import { is, isEmpty } from '@wp-g2/utils';

import { baseTheme } from '../theme';
import { colorize, rgba } from '../themeHelpers';

export const RENDERED_BASE_STYLES = '__styled_rendered_base__';
export const THEME_ENHANCED_NAMESPACE = '__styled_theme_enhanced__';

export function mergeThemeProps(props = {}, theme) {
	let mergedProps = props;

	if (is.undefined(props.theme)) {
		mergedProps = {};
		for (let key in props) {
			mergedProps[key] = props[key];
		}
		mergedProps.theme = isEmpty(theme) ? baseTheme : theme;
	}

	mergedProps.theme = enhanceThemeWithMixins(mergedProps.theme);

	return mergedProps;
}

export function enhanceThemeWithMixins(themeContext = baseTheme) {
	if (!themeContext) {
		return themeContext;
	}
	if (themeContext[THEME_ENHANCED_NAMESPACE]) {
		return themeContext;
	}

	themeContext[THEME_ENHANCED_NAMESPACE] = true;

	themeContext.get = (props, fallback) => get(themeContext, props, fallback);
	themeContext.sx = (props) => themeCss(props)(themeContext);

	// Mixins
	if (!themeContext.utils) {
		themeContext.utils = {};
	}
	themeContext.utils.colorize = colorize;
	themeContext.utils.rgba = rgba;

	return themeContext;
}

export function getDisplayName(tagName) {
	const displayName = is.string(tagName)
		? tagName
		: tagName.displayName || tagName.name || 'Component';

	return displayName;
}
