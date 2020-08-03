import React, { useLayoutEffect, useRef, useState } from 'react';

import {
	CardBody,
	CardHeader,
	Popover,
	PopoverContent,
	PopoverTrigger,
	Text,
	View,
} from '../../index';

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
		<Popover placement="right-start" unstable_offset={[0, 12]}>
			<PopoverTrigger
				as={View}
				css={{ outline: 'none' }}
				ref={triggerRef}
			>
				{trigger}
			</PopoverTrigger>
			<PopoverContent maxWidth={280} style={{ right: offset }}>
				<CardHeader>
					<Text weight={600}>{title}</Text>
				</CardHeader>
				<CardBody>{children}</CardBody>
			</PopoverContent>
		</Popover>
	);
};
