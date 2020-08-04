import { connect } from '@wp-g2/provider';
import { get, space } from '@wp-g2/styles';
import React from 'react';
import { FiHelpCircle } from 'react-icons/fi';

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
