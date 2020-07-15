import React from 'react';
import invariant from 'tiny-invariant';

import matchPath from './matchPath';
import RouterContext from './RouterContext';

function isEmptyChildren(children) {
	return React.Children.count(children) === 0;
}

/**
 * The public API for matching a single path and rendering.
 */
class Route extends React.Component {
	render() {
		return (
			<RouterContext.Consumer>
				{(context) => {
					invariant(
						context,
						'You should not use <Route> outside a <Router>',
					);

					const location = this.props.location || context.location;
					const match = this.props.computedMatch
						? this.props.computedMatch // <Switch> already computed the match for us
						: this.props.path
						? matchPath(location.pathname, this.props)
						: context.match;

					const props = { ...context, location, match };

					let { children, component, render } = this.props;

					// Preact uses an empty array as children by
					// default, so use null if that's the case.
					if (Array.isArray(children) && isEmptyChildren(children)) {
						children = null;
					}

					return (
						<RouterContext.Provider value={props}>
							{props.match
								? children
									? typeof children === 'function'
										? children(props)
										: children
									: component
									? React.createElement(component, props)
									: render
									? render(props)
									: null
								: typeof children === 'function'
								? children(props)
								: null}
						</RouterContext.Provider>
					);
				}}
			</RouterContext.Consumer>
		);
	}
}

export default Route;
