import { baseTheme, is } from '../utils';

function isEmpty(o = {}) {
	return Object.keys(o).length === 0;
}

export function mergeThemeProps(props = {}, theme) {
	let mergedProps = props;
	if (is.undefined(props.theme)) {
		mergedProps = {};
		for (let key in props) {
			mergedProps[key] = props[key];
		}
		mergedProps.theme = isEmpty(theme) ? baseTheme : theme;
	}

	return mergedProps;
}

export function getDisplayName(tagName) {
	const displayName = is.string(tagName)
		? tagName
		: tagName.displayName || tagName.name || 'Component';

	return displayName;
}
