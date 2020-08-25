import { connect } from '@wp-g2/context';
import React from 'react';

import { ControlLabel } from '../ControlLabel';
import { FormGroup } from '../FormGroup';
import CheckboxElement from './CheckboxElement';

function Checkbox({
	forwardedRef,
	gap,
	label,
	templateColumns = 'auto 1fr',
	...props
}) {
	if (!label) return <CheckboxElement {...props} ref={forwardedRef} />;

	return (
		<FormGroup
			gap={gap}
			isInline
			isMarginless
			templateColumns={templateColumns}
		>
			<CheckboxElement {...props} ref={forwardedRef} />
			<ControlLabel>{label}</ControlLabel>
		</FormGroup>
	);
}

export default connect(Checkbox, 'Checkbox');
