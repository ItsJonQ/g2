import { connect } from '@wp-g2/context';
import React from 'react';

import { ControlLabel } from '../ControlLabel';
import { FormGroup } from '../FormGroup';
import RadioElement from './RadioElement';

function Radio({
	forwardedRef,
	gap,
	label,
	templateColumns = 'auto 1fr',
	...props
}) {
	if (!label) return <RadioElement {...props} ref={forwardedRef} />;

	return (
		<FormGroup
			gap={gap}
			isInline
			isMarginless
			templateColumns={templateColumns}
		>
			<RadioElement {...props} ref={forwardedRef} />
			<ControlLabel>{label}</ControlLabel>
		</FormGroup>
	);
}

export default connect(Radio, 'Radio');
