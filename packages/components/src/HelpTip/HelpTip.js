import { connect } from '@wp-g2/context';
import { FiHelpCircle } from '@wp-g2/icons';
import { get, space } from '@wp-g2/styles';
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
			</View>
		</Tooltip>
	);
}

export default connect(HelpTip, 'HelpTip');
