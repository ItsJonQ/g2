import { contextConnect, useContextSystem } from '@wp-g2/context';
import { css, cx, ui } from '@wp-g2/styles';
import { is } from '@wp-g2/utils';
import React, { useMemo } from 'react';
import { Separator } from 'reakit';

import { useDropdownContext } from '../Dropdown';
import * as styles from './Divider.styles';

function Divider(props, forwardedRef) {
	const { className, m, mb, mt, ...otherProps } = useContextSystem(
		props,
		'Divider',
	);

	const { menu: dropdownMenu } = useDropdownContext();
	const isWithinDropdown = !!dropdownMenu;

	const classes = useMemo(() => {
		const sx = {};
		sx.mt = css`
			margin-top: ${ui.space(mt)};
		`;
		sx.mb = css`
			margin-bottom: ${ui.space(mb)};
		`;
		sx.m = css`
			margin-bottom: ${ui.space(m)};
			margin-top: ${ui.space(m)};
		`;

		sx.dropdown = css`
			margin-left: ${ui.space(-1)};
			margin-right: ${ui.space(-1)};
		`;

		return cx(
			styles.Divider,
			!is.defined(m) && is.defined(mb) && sx.mb,
			!is.defined(m) && is.defined(mt) && sx.mt,
			is.defined(m) && sx.m,
			isWithinDropdown && sx.dropdown,
			className,
		);
	}, [className, isWithinDropdown, m, mb, mt]);

	return <Separator {...otherProps} className={classes} ref={forwardedRef} />;
}

export default contextConnect(Divider, 'Divider');
