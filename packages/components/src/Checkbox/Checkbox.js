import { connect } from '@wp-g2/context';
import React from 'react';

import { ControlLabel } from '../ControlLabel';
import { FormGroup } from '../FormGroup';
import CheckboxElement from './CheckboxElement';

function Checkbox({ forwardedRef, label, ...props }) {
	if (!label) return <CheckboxElement {...props} ref={forwardedRef} />;

	return (
		<FormGroup isInline isMarginless templateColumns="auto 1fr">
			<CheckboxElement {...props} ref={forwardedRef} />
			<ControlLabel>{label}</ControlLabel>
		</FormGroup>
	);
}

export default connect(Checkbox);
