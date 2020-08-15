import { connect } from '@wp-g2/context';
import React from 'react';

import { ControlLabel } from '../ControlLabel';
import { FormGroup } from '../FormGroup';
import RadioElement from './RadioElement';

function Radio({ forwardedRef, label, ...props }) {
	if (!label) return <RadioElement {...props} ref={forwardedRef} />;

	return (
		<FormGroup isInline isMarginless templateColumns="auto 1fr">
			<RadioElement {...props} ref={forwardedRef} />
			<ControlLabel>{label}</ControlLabel>
		</FormGroup>
	);
}

export default connect(Radio);
