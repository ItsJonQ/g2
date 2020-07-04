import { connect } from '@g2/provider';
import React from 'react';
import { PopoverDisclosure } from 'reakit/Popover';

import { usePopoverContext } from './Popover.utils';

function PopoverTrigger({ forwardedRef, ...props }) {
	const { popover } = usePopoverContext();
	return <PopoverDisclosure {...props} {...popover} ref={forwardedRef} />;
}

export default connect(PopoverTrigger);
