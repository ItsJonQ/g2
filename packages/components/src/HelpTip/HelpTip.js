import { connect } from '@wp-g2/context';
import { FiHelpCircle } from '@wp-g2/icons';
import { ui } from '@wp-g2/styles';
import React from 'react';

import { Icon } from '../Icon';
import { Tooltip } from '../Tooltip';
import { View } from '../View';

function HelpTip({ as, children, iconSize = 14, ...props }) {
	return (
		<Tooltip {...props} content={children}>
			<View
				as={as || 'span'}
				css={`
					cursor: pointer;
					vertical-align: middle;
					padding-left: ${ui.space(1)};
					padding-right: ${ui.space(1)};
				`}
				onClick={(event) => event.preventDefault()}
			>
				<Icon
					color={ui.get('colorText')}
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
			</View>
		</Tooltip>
	);
}

export default connect(HelpTip, 'HelpTip');
