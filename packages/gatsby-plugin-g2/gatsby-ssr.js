import { CacheProvider } from '@emotion/core';
import { cache } from '@wp-g2/styles';
import createEmotionServer from 'create-emotion-server';
import React from 'react';
import { renderToString } from 'react-dom/server';

export const replaceRenderer = ({ bodyComponent, replaceBodyHTMLString }) => {
	const element = (
		<CacheProvider value={cache}>{bodyComponent}</CacheProvider>
	);
	const { renderStylesToString } = createEmotionServer(cache);
	const html = renderStylesToString(renderToString(element));

	replaceBodyHTMLString(html);
};
