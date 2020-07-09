import { connect } from '@wp-g2/provider';
import React from 'react';

import { useControlGroupContext } from './ControlGroup.utils';
import { ControlGroupItemView } from './ControlGroupItem.styles';

function ControlGroupItem(props) {
	const { isFirst, isOnly } = useControlGroupContext();

	return (
		<ControlGroupItemView isFirst={isFirst} isOnly={isOnly} {...props} />
	);
}

export default connect(ControlGroupItem, 'ControlGroupItem');
