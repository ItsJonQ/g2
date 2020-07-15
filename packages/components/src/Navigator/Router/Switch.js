import React from 'react';
import invariant from 'tiny-invariant';

import matchPath from './matchPath';
import RouterContext from './RouterContext';

/**
 * The public API for rendering the first <Route> that matches.
 */
class Switch extends React.Component {
	render() {
		return (
			<RouterContext.Consumer>
				{(context) => {
					invariant(
						context,
						'You should not use <Switch> outside a <Router>',
					);

					const location = this.props.location || context.location;

					let element, match;

					// We use React.Children.forEach instead of React.Children.toArray().find()
					// here because toArray adds keys to all child elements and we do not want
					// to trigger an unmount/remount for two <Route>s that render the same
					// component at different URLs.
					React.Children.forEach(this.props.children, (child) => {
						if (match == null && React.isValidElement(child)) {
							element = child;

							const path = child.props.path || child.props.from;

							match = path
								? matchPath(location.pathname, {
										...child.props,
										path,
								  })
								: context.match;
						}
					});

					return match
						? React.cloneElement(element, {
								computedMatch: match,
								location,
						  })
						: null;
				}}
			</RouterContext.Consumer>
		);
	}
}

export default Switch;
