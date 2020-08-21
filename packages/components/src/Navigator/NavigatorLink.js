import { ComponentsProvider, connect } from '@wp-g2/context';
import { cx } from '@wp-g2/styles';
import React from 'react';

import * as styles from '../Link/Link.styles';
import { NavLink, useHistory } from './Router';

function NavigatorLink({
	as,
	children,
	className,
	exact,
	forwardedRef,
	href,
	isBack,
	isPlain,
	params,
	showArrow,
	to,
	...props
}) {
	const history = useHistory();

	const classes = cx([styles.BaseLink, !isPlain && styles.Link, className]);

	const handleOnClick = (event) => {
		if (isBack) {
			event.preventDefault();
			history.goBack();
		}
	};

	const content = (
		<ComponentsProvider
			value={{
				MenuItem: { isBack: isBack, showArrow: !!to || showArrow },
			}}
		>
			{children}
		</ComponentsProvider>
	);

	if (!to) {
		return (
			<a
				href={href || '#'}
				ref={forwardedRef}
				{...props}
				className={classes}
				onClick={handleOnClick}
			>
				{content}
			</a>
		);
	}

	return (
		<NavLink
			{...props}
			activeClassName="is-active"
			className={classes}
			exact={exact}
			onClick={handleOnClick}
			ref={forwardedRef}
			to={to}
		>
			{content}
		</NavLink>
	);
}

export default connect(NavigatorLink, 'NavigatorLink');
