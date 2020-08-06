import { connect } from '@wp-g2/context';
import { cx } from '@wp-g2/styles';
import React from 'react';
import { NavLink } from 'react-router-dom';

import * as styles from '../Link/Link.styles';
import { useHistory } from './Navigator.utils';
import useNavigator from './useNavigator';
import useQuery from './useQuery';

function NavigatorLink({
	as,
	children,
	className,
	exact = true,
	forwardedRef,
	href,
	isBack,
	isPlain,
	params,
	to,
	...props
}) {
	const query = useQuery();
	const navigator = useNavigator();
	const history = useHistory();

	const classes = cx([styles.BaseLink, !isPlain && styles.Link, className]);
	const currentPath = query.get();

	let nextLocation;
	query.set(to);

	if (params) {
		nextLocation = {
			...params,
			search: query.toString(),
		};
	} else {
		nextLocation = {
			...navigator.location,
			search: query.toString(),
		};
	}

	const isActive = currentPath === to;

	const handleOnClick = (event) => {
		if (isActive) {
			event.preventDefault();
		}
		if (isBack) {
			event.preventDefault();
			history.goBack();
		}
	};

	if (!to) {
		return (
			<a
				href={href || '#'}
				ref={forwardedRef}
				{...props}
				className={classes}
				onClick={handleOnClick}
			>
				{children}
			</a>
		);
	}

	return (
		<NavLink
			to={nextLocation}
			{...props}
			activeClassName="is-active"
			className={classes}
			exact={exact}
			isActive={(match) => {
				if (!match) {
					return false;
				}
				return isActive;
			}}
			onClick={handleOnClick}
			ref={forwardedRef}
		>
			{children}
		</NavLink>
	);
}

export default connect(NavigatorLink);
