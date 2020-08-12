import React from 'react';

import RouterContext from './RouterContext';
import {
	normalizeToLocation,
	resolveToLocation,
} from './utils/locationUtils.js';

// React 15 compat
const forwardRefShim = (C) => C;
let { forwardRef } = React;
if (typeof forwardRef === 'undefined') {
	forwardRef = forwardRefShim;
}

function isModifiedEvent(event) {
	return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

const LinkAnchor = forwardRef(
	(
		{
			innerRef, // TODO: deprecate
			navigate,
			onClick,
			...rest
		},
		forwardedRef,
	) => {
		const { target } = rest;

		let props = {
			...rest,
			onClick: (event) => {
				try {
					if (onClick) onClick(event);
				} catch (ex) {
					event.preventDefault();
					throw ex;
				}

				if (
					!event.defaultPrevented && // onClick prevented default
					event.button === 0 && // ignore everything but left clicks
					(!target || target === '_self') && // let browser handle "target=_blank" etc.
					!isModifiedEvent(event) // ignore clicks with modifier keys
				) {
					event.preventDefault();
					navigate();
				}
			},
		};

		// React 15 compat
		if (forwardRefShim !== forwardRef) {
			props.ref = forwardedRef || innerRef;
		} else {
			props.ref = innerRef;
		}

		/* eslint-disable-next-line jsx-a11y/anchor-has-content */
		return <a {...props} />;
	},
);

/**
 * The public API for rendering a history-aware <a>.
 */
const Link = forwardRef(
	(
		{
			component = LinkAnchor,
			replace,
			to,
			innerRef, // TODO: deprecate
			...rest
		},
		forwardedRef,
	) => {
		return (
			<RouterContext.Consumer>
				{(context) => {
					const { history } = context;

					const location = normalizeToLocation(
						resolveToLocation(to, context.location),
						context.location,
					);

					const href = location ? history.createHref(location) : '';
					const props = {
						...rest,
						href,
						navigate() {
							const location = resolveToLocation(
								to,
								context.location,
							);
							const method = replace
								? history.replace
								: history.push;

							method(location);
						},
					};

					// React 15 compat
					if (forwardRefShim !== forwardRef) {
						props.ref = forwardedRef || innerRef;
					} else {
						props.innerRef = innerRef;
					}

					return React.createElement(component, props);
				}}
			</RouterContext.Consumer>
		);
	},
);

export default Link;
