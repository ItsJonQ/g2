import { ComponentsProvider } from '@wp-g2/provider';
import { get } from '@wp-g2/styles';
import React from 'react';

import { BaseView } from '../../index';

export const Sidebar = ({ children }) => {
	return (
		<ComponentsProvider
			value={{
				Grid: { gap: 8 },
				Icon: { size: 16 },
			}}
		>
			<BaseView
				css={`
					width: 280px;
					position: absolute;
					min-height: 100%;
					top: 0;
					right: 0;
					border-left: 1px solid ${get('surfaceBorderColor')};
					padding: 16px 0;
				`}
			>
				{children}
			</BaseView>
		</ComponentsProvider>
	);
};
