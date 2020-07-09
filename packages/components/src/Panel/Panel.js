import { connect } from '@wp-g2/provider';
import React from 'react';

import { PanelView } from './Panel.styles';
import { PanelContext } from './Panel.utils';

function Panel({ animated = true, huuyi, isSeamless = false, ...props }) {
	return (
		<PanelContext.Provider value={{ isSeamless }}>
			<PanelView {...props} animated={animated} />
		</PanelContext.Provider>
	);
}

export default connect(Panel);
