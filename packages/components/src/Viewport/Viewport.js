import { useMediaQuery } from '@wp-g2/utils';
import React from 'react';

import { BREAKPOINTS, getBreakpointValue } from './Viewport.utils';

export function Viewport({ breakpoint = 'md', children, media }) {
	const visible = useMediaQuery(media || getBreakpointValue(breakpoint));
	return visible ? children : null;
}

export function ViewportMobile(props) {
	return <Viewport {...props} media={{ maxWidth: BREAKPOINTS.xs }} />;
}

export function ViewportPhablet(props) {
	return <Viewport {...props} breakpoint="sm" />;
}

export function ViewportPhabletOnly(props) {
	const media = { maxWidth: BREAKPOINTS.md, minWidth: BREAKPOINTS.sm };
	return <Viewport {...props} media={media} />;
}

export function ViewportTablet(props) {
	return <Viewport {...props} breakpoint="md" />;
}

export function ViewportTabletOnly(props) {
	const media = { maxWidth: BREAKPOINTS.lg, minWidth: BREAKPOINTS.md };
	return <Viewport {...props} media={media} />;
}

export function ViewportDesktop(props) {
	return <Viewport {...props} breakpoint="lg" />;
}
