import React from 'react';

import { is } from './is';

export function mergeEvent(handler, otherHandler) {
	return (event) => {
		if (is.function(handler)) {
			handler(event);
		}
		if (is.function(otherHandler)) {
			otherHandler(event);
		}
	};
}

export function mergeEventHandlers(handlers = {}, extraHandlers = {}) {
	const mergedHandlers = { ...handlers };

	for (const [key, handler] of Object.entries(mergedHandlers)) {
		if (is.function(extraHandlers[key])) {
			mergedHandlers[key] = mergeEvent(handler, extraHandlers[key]);
		}
	}

	return mergedHandlers;
}

export function useMergeEventCallback(handler, htmlHandler) {
	return React.useCallback(mergeEvent(handler, htmlHandler), [
		handler,
		htmlHandler,
	]);
}
