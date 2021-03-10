import { help as helpIcon } from '@wordpress/icons';
import { contextConnect, useContextSystem } from '@wp-g2/context';
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

	return (
		<Tooltip {...otherProps} content={children} ref={forwardedRef}>
			<View
				as={as || 'span'}
				css={css`
					cursor: pointer;
					${ui.padding.x(ui.space(1))}
					vertical-align: middle;
				`}
				onClick={handleOnClick}
			>
				<Icon
					css={css`
						display: inline-flex;
						opacity: 0.5;
					`}
					fill={ui.get('colorText')}
					icon={helpIcon}
					size={iconSize}
				/>
			</View>
		</Tooltip>
	);
}

export default contextConnect(HelpTip, 'HelpTip');
