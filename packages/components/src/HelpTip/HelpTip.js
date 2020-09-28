import { contextConnect, useContextSystem } from '@wp-g2/context';
import { FiHelpCircle } from '@wp-g2/icons';
import { css, ui } from '@wp-g2/styles';
import React from 'react';

import { Icon } from '../Icon';
import { Tooltip } from '../Tooltip';
import { View } from '../View';

function HelpTip(props, forwardedRef) {
	const { as, children, iconSize = 14, ...otherProps } = useContextSystem(
		props,
		'HelpTip',
	);

	const handleOnClick = React.useCallback((event) => {
		event.preventDefault();
	}, []);

	const helpIcon = React.memo(() => <FiHelpCircle />, []);

	return (
		<Tooltip {...otherProps} content={children} ref={forwardedRef}>
			<View
				as={as || 'span'}
				css={css`
					cursor: pointer;
					padding-left: ${ui.space(1)};
					padding-right: ${ui.space(1)};
					vertical-align: middle;
				`}
				onClick={handleOnClick}
			>
				<Icon
					color={ui.get('colorText')}
					css={css`
						display: inline-flex;
						opacity: 0.5;

						path {
							fill: none;
						}
					`}
					icon={helpIcon}
					size={iconSize}
				/>
			</View>
		</Tooltip>
	);
}

export default contextConnect(HelpTip, 'HelpTip');
