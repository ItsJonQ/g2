/**
 * Fork of:
 * https://github.com/styled-components/stylis-plugin-rtl
 */

import cssjanus from 'cssjanus';

let isRtl = false;
if (typeof window !== 'undefined') {
	isRtl = window?.document?.documentElement?.dir === 'rtl';
}

// https://github.com/thysultan/stylis.js#plugins
const STYLIS_CONTEXTS = {
	AT_RULE: 3,
	NEWLINE: 0,
	POST_PROCESS: -2,
	PREPARATION: -1,
	PROPERTY: 1,
	SELECTOR_BLOCK: 2,
};

// We need to apply cssjanus as early as possible to capture the noflip directives if used
// (they are not present at the PROPERTY, SELECTOR_BLOCK, or POST_PROCESS steps)
export const STYLIS_PROPERTY_CONTEXT = STYLIS_CONTEXTS.PREPARATION;

/**
 * Custom stylis plugin that flips applicable styles from LTR to RTL based
 * on the <html dir="" /> property. On render, if dir="rtl", the styles will render
 * as RTL flipped.
 *
 * It's currently not possible to dynamically flip between LTR and RTL styles.
 * The LTR/RTL detection happens only once on render.
 *
 * This is something that can be improved in future.
 */
function stylisRTLPlugin(context, content) {
	if (context === STYLIS_PROPERTY_CONTEXT) {
		return isRtl ? cssjanus.transform(content) : undefined;
	}
}

export default stylisRTLPlugin;
