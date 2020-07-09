import { connect } from '@wp-g2/provider';
import React from 'react';

import { ContentView, ScrollableView } from './Scrollable.styles';

function Scrollable({ children, ...props }) {
	return (
		<ScrollableView {...props}>
			<ContentView>{children}</ContentView>
		</ScrollableView>
	);
}

export default connect(Scrollable);
