import { ContextSystemProvider } from '@wp-g2/context';
import React from 'react';

const contextValue = { Text: { variant: 'muted' } };

function FormGroupHelp({ children }) {
	if (!children) return null;

	return (
		<ContextSystemProvider value={contextValue}>
			{children}
		</ContextSystemProvider>
	);
}

export default React.memo(FormGroupHelp);
