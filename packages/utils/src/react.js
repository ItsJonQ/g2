import React from 'react';

import { is } from './is';

export { default as mergeRefs } from 'react-merge-refs';
export { default as hoistNonReactStatics } from 'hoist-non-react-statics';

export function mergeEvent(handler, htmlHandler) {
	return (event) => {
		if (is.function(htmlHandler)) {
			htmlHandler(event);
		}
		if (is.function(handler)) {
			handler(event);
		}
	};
}

export function useMergeEventCallback(handler, htmlHandler) {
	return React.useCallback(mergeEvent(handler, htmlHandler), [
		handler,
		htmlHandler,
	]);
}

export function getValidChildren(children) {
	if (is.string(children)) return [children];

	return React.Children.toArray(children).filter((child) =>
		React.isValidElement(child),
	);
}

export function assignRef(ref, value) {
	if (ref == null) return;

	if (is.function(ref)) {
		ref(value);
		return;
	}

	try {
		//@ts-ignore
		ref.current = value;
	} catch (error) {
		throw new Error(`Cannot assign value '${value}' to ref '${ref}'`);
	}
}

export function getDisplayName(tagName) {
	const displayName = is.string(tagName)
		? tagName
		: tagName.displayName || tagName.name || 'Component';

	return displayName;
}
