import { contextConnect, useContextSystem } from '@wp-g2/context';
import React from 'react';

import { Button } from '../button';
import { useHistory } from './Router';

function NavigatorButton(props, forwardedRef) {
	const {
		as,
		children,
		exact,
		href,
		isBack,
		isPlain,
		params,
		showArrow,
		to,
		...otherProps
	} = useContextSystem(props, 'NavigatorButton');

	const history = useHistory();

	const handleOnClick = (event) => {
		event.preventDefault();

		if (isBack) {
			if (to) {
				history.push(to, { isBack: true });
			} else {
				history.goBack();
			}
		} else {
			history.push(to);
		}
	};

	if (!to) {
		return (
			<Button
				href={href || '#'}
				ref={forwardedRef}
				{...otherProps}
				onClick={handleOnClick}
			>
				{children}
			</Button>
		);
	}

	return (
		<Button
			{...otherProps}
			exact={exact}
			onClick={handleOnClick}
			ref={forwardedRef}
		>
			{children}
		</Button>
	);
}

export default contextConnect(NavigatorButton, 'NavigatorButton');
