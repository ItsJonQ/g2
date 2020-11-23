import { contextConnect, useContextSystem } from '@wp-g2/context';
import React from 'react';

import { FormGroupContent, FormGroupContext, useFormGroup } from '../FormGroup';
import { Grid } from '../Grid';
import { View } from '../View';

function BaseChoice(props, forwardedRef) {
	const {
		children,
		gap,
		help,
		label,
		labelHidden,
		spacing = 1,
		templateColumns = 'auto 1fr',
		truncate = true,
		...otherProps
	} = useContextSystem(props, 'BaseChoice');

	const {
		contentProps: { id },
	} = useFormGroup(otherProps);
	const contextProps = React.useMemo(() => ({ id, horizontal: true }), [id]);

	if (!label) return children;

	const contentProps = {
		id,
		help,
		label,
		labelHidden,
		spacing,
		truncate,
	};

	return (
		<Grid
			gap={gap}
			templateColumns={templateColumns}
			{...otherProps}
			ref={forwardedRef}
		>
			<FormGroupContext.Provider value={contextProps}>
				{children}
				<View>
					<FormGroupContent {...contentProps} />
				</View>
			</FormGroupContext.Provider>
		</Grid>
	);
}

export default contextConnect(BaseChoice, 'BaseChoice');
