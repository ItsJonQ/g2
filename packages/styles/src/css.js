import { responsive } from '@wp-g2/create-styles';
import { is } from '@wp-g2/utils';

import { space } from './mixins/space';
import { compiler } from './system';
const { css: compile } = compiler;

// Inspired by:
// https://github.com/system-ui/theme-ui/blob/master/packages/css/src/index.ts

export const scales = {
	// margin: 'space',
	// marginTop: 'space',
	// marginRight: 'space',
	// marginBottom: 'space',
	// marginLeft: 'space',
	// marginBlock: 'space',
	// marginBlockEnd: 'space',
	// marginBlockStart: 'space',
	// marginInline: 'space',
	// marginInlineEnd: 'space',
	// marginInlineStart: 'space',
	// padding: 'space',
	// paddingTop: 'space',
	// paddingRight: 'space',
	// paddingBottom: 'space',
	// paddingLeft: 'space',
	// paddingBlock: 'space',
	// paddingBlockEnd: 'space',
	// paddingBlockStart: 'space',
	// paddingInline: 'space',
	// paddingInlineEnd: 'space',
	// paddingInlineStart: 'space',
	gridGap: 'space',
	gridColumnGap: 'space',
	gridRowGap: 'space',
	gap: 'space',
	columnGap: 'space',
	rowGap: 'space',
};

const transformFns = {
	space,
};

/**
 * Retrieves a scaled values from the Style system based on a style key.
 *
 * @param {string} key The style key to scale.
 * @param {any} value The style value to scale.
 * @returns {any} The scaled value.
 */
export function getScaleValue(key, value) {
	const scale = scales[key];
	let next = value;

	if (scale) {
		const transformFn = transformFns[scale];
		if (transformFns) {
			next = transformFn(value);
		}
	}

	return next;
}

/**
 * Transform a style object with scaled values from the Style system.
 *
 * @param {object} styles The style object to transform.
 * @returns {object} The style object with scaled values.
 */
export function getScaleStyles(styles = {}) {
	const next = {};

	for (const k in styles) {
		next[k] = getScaleValue(k, styles[k]);
	}

	return next;
}

/**
 * Enhances the (create-system enhanced) CSS function to account for
 * scale functions within the Style system.
 *
 * @param {TemplateStringsArray | import('create-emotion').Interpolation<undefined>} template
 * @param {import('create-emotion').Interpolation<undefined>[]} args The styles to compile.
 * @returns {ReturnType<compile>} The compiled styles.
 */
export function css(template, ...args) {
	if (is.objectInterpolation(template)) {
		return compile(getScaleStyles(responsive(template, getScaleValue)));
	}

	if (Array.isArray(template)) {
		for (let i = 0, len = template.length; i < len; i++) {
			const n = template[i];
			if (is.objectInterpolation(n)) {
				template[i] = getScaleStyles(responsive(n, getScaleValue));
			}
		}
		return compile(template, ...args);
	}

	// @ts-ignore Emotion says `css` doesn't take `TemplateStringsArray` but it does!
	return compile(template, ...args);
}
