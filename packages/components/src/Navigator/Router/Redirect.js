import { createLocation, locationsAreEqual } from 'history';
import React from 'react';
import invariant from 'tiny-invariant';

import generatePath from './generatePath';
import Lifecycle from './Lifecycle';
import RouterContext from './RouterContext';

/**
 * The public API for navigating programmatically with a component.
 */
function Redirect({ computedMatch, push = false, to }) {
	return (
		<RouterContext.Consumer>
			{(context) => {
				invariant(
					context,
					'You should not use <Redirect> outside a <Router>',
				);

				const { history, staticContext } = context;

				const method = push ? history.push : history.replace;
				const location = createLocation(
					computedMatch
						? typeof to === 'string'
							? generatePath(to, computedMatch.params)
							: {
									...to,
									pathname: generatePath(
										to.pathname,
										computedMatch.params,
									),
							  }
						: to,
				);

				// When rendering in a static context,
				// set the new location immediately.
				if (staticContext) {
					method(location);
					return null;
				}

				return (
					<Lifecycle
						onMount={() => {
							method(location);
						}}
						onUpdate={(self, prevProps) => {
							const prevLocation = createLocation(prevProps.to);
							if (
								!locationsAreEqual(prevLocation, {
									...location,
									key: prevLocation.key,
								})
							) {
								method(location);
							}
						}}
						to={to}
					/>
				);
			}}
		</RouterContext.Consumer>
	);
}

export default Redirect;
