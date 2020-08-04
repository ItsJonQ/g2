import { connect } from '@wp-g2/context';
import { FiHelpCircle } from '@wp-g2/icons';
import { get, space } from '@wp-g2/styles';
import React from 'react';

import { Icon } from '../Icon';
import { Tooltip, TooltipContent, TooltipTrigger } from '../Tooltip';

function HelpTip({ children, iconSize = 14, ...props }) {
	return (
		<Tooltip {...props}>
			<TooltipTrigger
				css={`
					cursor: pointer;
					vertical-align: middle;
					padding-left: ${space(1)};
					padding-right: ${space(1)};
				`}
				onClick={(event) => event.preventDefault()}
			>
				<Icon
					color={get('colorText')}
					css={`
						display: inline-flex;
						opacity: 0.5;

						path {
							fill: none;
						}
					`}
					icon={<FiHelpCircle />}
					size={iconSize}
				/>
			</TooltipTrigger>
			{children && <TooltipContent>{children}</TooltipContent>}
		</Tooltip>
	);
}

export default connect(HelpTip);
