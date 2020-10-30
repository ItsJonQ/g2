import { contextConnect, useContextSystem } from '@wp-g2/context';
import React from 'react';

import { ControlLabel } from '../ControlLabel';
import { FormGroup } from '../FormGroup';
import RadioElement from './RadioElement';

function Radio(props, forwardedRef) {
	const {
		gap,
		label,
		templateColumns = 'auto 1fr',
		truncate = true,
		...otherProps
	} = useContextSystem(props, 'Radio');

	if (!label) return <RadioElement {...otherProps} ref={forwardedRef} />;

	return (
		<FormGroup gap={gap} horizontal templateColumns={templateColumns}>
			<RadioElement {...props} ref={forwardedRef} />
			<ControlLabel truncate={truncate}>{label}</ControlLabel>
		</FormGroup>
	);
}

export default contextConnect(Radio, 'Radio');
