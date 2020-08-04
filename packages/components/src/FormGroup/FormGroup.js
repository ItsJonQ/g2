import { connect } from '@wp-g2/provider';
import { useUniqueId } from '@wp-g2/utils';
import React from 'react';

import { ControlLabel } from '../ControlLabel';
import { Grid } from '../Grid';
import { FormGroupContext } from './FormGroup.Context';
import * as styles from './FormGroup.styles';

const { FormGroupView } = styles;

function FormGroup({
	children,
	horizontal = true,
	id: idProp,
	isMarginless,
	label,
	...props
}) {
	const id = useUniqueId(FormGroup, 'form-group', idProp);
	const contextProps = { id };

	const cx = [isMarginless && styles.marginless];

	const labelMarkup = label ? <ControlLabel>{label}</ControlLabel> : null;

	const contentMarkup = (
		<>
			{labelMarkup}
			{children}
		</>
	);

	return (
		<FormGroupContext.Provider value={contextProps}>
			<FormGroupView {...props} cx={cx}>
				{horizontal ? (
					<Grid templateColumns="minmax(0, 1fr) 2fr" {...props}>
						{contentMarkup}
					</Grid>
				) : (
					contentMarkup
				)}
			</FormGroupView>
		</FormGroupContext.Provider>
	);
}

export default connect(FormGroup);
