import { ThemeProvider } from '@wp-g2/styles';
import React from 'react';
import { Portal as BasePortal } from 'reakit';

function Portal({ children }) {
	return (
		<BasePortal>
			<ThemeProvider>{children}</ThemeProvider>
		</BasePortal>
	);
}

export default Portal;
