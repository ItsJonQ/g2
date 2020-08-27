import createEmotion from 'create-emotion';

import { plugins } from './plugins';

const options = {
	stylisPlugins: plugins,
};

export const {
	cache,
	css,
	cx,
	flush,
	getRegisteredStyles,
	hydrate,
	injectGlobal,
	keyframes,
	merge,
	sheet,
} = createEmotion(options);
