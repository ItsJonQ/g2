import { createPopper } from '@popperjs/core';
import { useIsomorphicLayoutEffect, useSealedState } from '@wp-g2/utils';
import React from 'react';

export function usePositioner(props) {
	const {
		gutter = 4,
		placement = 'bottom-start',
		unstable_fixed: fixed = false,
		unstable_offset: sealedOffset,
	} = useSealedState(props);

	const popper = React.useRef(null);
	const referenceRef = React.useRef(null);
	const popoverRef = React.useRef(null);
	const popperCreated = React.useRef(false);
	const [offset] = React.useState(sealedOffset || [0, gutter]);

	useIsomorphicLayoutEffect(() => {
		if (referenceRef.current && popoverRef.current) {
			popper.current = createPopper(
				referenceRef.current,
				popoverRef.current,
				{
					// https://popper.js.org/docs/v2/constructors/#options
					placement,
					strategy: fixed ? 'fixed' : 'absolute',
					modifiers: [
						{
							// https://popper.js.org/docs/v2/modifiers/offset/
							name: 'offset',
							options: {
								offset,
							},
						},
					],
				},
			);
			popperCreated.current = true;
		}
		return () => {
			if (popper.current) {
				popper.current.destroy();
				popper.current = null;
			}
		};
	}, [placement, fixed, offset]);

	return {
		popoverRef,
		referenceRef,
		popper,
	};
}
