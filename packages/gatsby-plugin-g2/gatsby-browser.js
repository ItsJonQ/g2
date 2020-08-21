import { CacheProvider } from '@emotion/core';
import { cache } from '@wp-g2/styles';
import React from 'react';

export const wrapRootElement = ({ element }) => (
	<CacheProvider value={cache}>{element}</CacheProvider>
);
