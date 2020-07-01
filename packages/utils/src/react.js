import React from 'react';
import { is } from './is';

export function getValidChildren(children) {
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

export function mergeRefs(...refs) {
	return (value) => {
		refs.forEach((ref) => assignRef(ref, value));
	};
}
