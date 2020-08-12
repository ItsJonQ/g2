import { createMemoryHistory as createHistory } from 'history';
import React from 'react';

import Router from './Router';

/**
 * The public API for a <Router> that stores location in memory.
 */
class MemoryRouter extends React.Component {
	history = createHistory(this.props);

	render() {
		return <Router children={this.props.children} history={this.history} />;
	}
}

export default MemoryRouter;
