import React, { useLayoutEffect, useRef, useState } from 'react';

import { CardBody, CardHeader, Popover, Text, View } from '../../index';

export const ContextPopover = ({ children, title, trigger }) => {
	const [offset, setOffset] = useState(0);
	const triggerRef = useRef();

	useLayoutEffect(() => {
		requestAnimationFrame(() => {
			const node = triggerRef.current;
			if (node) {
				setOffset(node.offsetLeft);
			}
		});
	}, []);

	return (
		<Popover
			maxWidth={280}
			placement="right-start"
			style={{ right: offset }}
			trigger={
				<View css={{ outline: 'none' }} ref={triggerRef}>
					{trigger}
				</View>
			}
			unstable_offset={[0, 12]}
		>
			<CardHeader>
				<Text weight={600}>{title}</Text>
			</CardHeader>
			<CardBody>{children}</CardBody>
		</Popover>
	);
};
