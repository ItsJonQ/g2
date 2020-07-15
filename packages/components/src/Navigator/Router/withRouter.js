import { hoistNonReactStatics } from '@wp-g2/utils';
import React from 'react';
import invariant from 'tiny-invariant';

import RouterContext from './RouterContext';

/**
 * A public higher-order component to access the imperative API
 */
function withRouter(Component) {
	const displayName = `withRouter(${
		Component.displayName || Component.name
	})`;
	const C = (props) => {
		const { wrappedComponentRef, ...remainingProps } = props;

		return (
			<RouterContext.Consumer>
				{(context) => {
					invariant(
						context,
						`You should not use <${displayName} /> outside a <Router>`,
					);
					return (
						<Component
							{...remainingProps}
							{...context}
							ref={wrappedComponentRef}
						/>
					);
				}}
			</RouterContext.Consumer>
		);
	};

	C.displayName = displayName;
	C.WrappedComponent = Component;

	return hoistNonReactStatics(C, Component);
}

export default withRouter;
