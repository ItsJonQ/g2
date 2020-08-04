import { PopoverDisclosure } from '@wp-g2/a11y';
import { connect } from '@wp-g2/context';
import React from 'react';

import { usePopoverContext } from './Popover.Context';

function PopoverTrigger({ forwardedRef, ...props }) {
	const { popover } = usePopoverContext();
	return <PopoverDisclosure {...props} {...popover} ref={forwardedRef} />;
}

export default connect(PopoverTrigger);
