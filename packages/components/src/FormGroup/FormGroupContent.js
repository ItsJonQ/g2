import { ui } from '@wp-g2/styles';
import React from 'react';

import { VStack } from '../VStack';
import { FormGroupContext } from './FormGroup.Context';
import FormGroupHelp from './FormGroupHelp';
import FormGroupLabel from './FormGroupLabel';

function FormGroupContent({
	alignLabel,
	children,
	help,
	horizontal,
	id,
	isLabelBlock = true,
	label,
	labelHidden,
	spacing = 2,
	truncate,
}) {
	const contextProps = React.useMemo(() => ({ id, horizontal }), [
		id,
		horizontal,
	]);

	const content = help ? (
		<VStack
			expanded={false}
			{...ui.$('FormGroupContentContainer')}
			spacing={spacing}
		>
			{children}
			<FormGroupHelp>{help}</FormGroupHelp>
		</VStack>
	) : (
		children
	);

	return (
		<FormGroupContext.Provider value={contextProps}>
			<FormGroupLabel
				align={alignLabel}
				id={id}
				isLabelBlock={isLabelBlock}
				labelHidden={labelHidden}
				truncate={truncate}
			>
				{label}
			</FormGroupLabel>
			{content}
		</FormGroupContext.Provider>
	);
}

export default React.memo(FormGroupContent);
