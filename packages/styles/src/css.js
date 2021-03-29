import { INTERPOLATION_CLASS_NAME, responsive } from '@wp-g2/create-styles';
import { is } from '@wp-g2/utils';

import { space } from './mixins/space';
import { compiler } from './system';
const { css: compile } = compiler;

// Inspired by:
// https://github.com/system-ui/theme-ui/blob/master/packages/css/src/index.ts

export const scales = {
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
 * @param {import('@emotion/serialize').ObjectInterpolation<any>} styles The style object to transform.
 * @returns {import('@emotion/serialize').ObjectInterpolation<any>} The style object with scaled values.
 */
export function getScaleStyles(styles = {}) {
	/** @type {Record<string, string>} */
	const next = {};

	for (const k in styles) {
		next[k] = getScaleValue(k, styles[k]);
	}

	return next;
}

/**
 *
 * @param {any} value
 * @return {value is import('@wp-g2/create-styles').PolymorphicComponent<any, any>}
 */
function isPolymorphicComponent(value) {
	return value && typeof value[INTERPOLATION_CLASS_NAME] !== 'undefined';
}

/**
 * Enhances the (create-system enhanced) CSS function to account for
 * scale functions within the Style system.
 *
 * @param {TemplateStringsArray | import('create-emotion').Interpolation<undefined>} template
 * @param {(import('create-emotion').Interpolation<undefined> | import('@wp-g2/create-styles').PolymorphicComponent<any, any>)[]} args The styles to compile.
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

		const nextArgs = args.map((arg) => {
			if (!arg) {
				return arg;
			}

			if (isPolymorphicComponent(arg)) {
				return `.${arg[INTERPOLATION_CLASS_NAME]}`;
			}

			return arg;
		});

		return compile(template, ...nextArgs);
	}

	// @ts-ignore Emotion says `css` doesn't take `TemplateStringsArray` but it does!
	return compile(template, ...args);
}
