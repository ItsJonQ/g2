import { Popover, Text, View } from '@wp-g2/components';
import { ui } from '@wp-g2/styles';
import { createStore, useSubState } from '@wp-g2/substate';
import { noop } from '@wp-g2/utils';
import React from 'react';

export default {
	title: 'DesignTools/Reakit/Test',
};

const Purple = () => {
	const store = useSubState((set) => ({
		x: 0,
		y: 0,
		setPosition: (next) => set({ x: next.x, y: next.y }),
	}));

	const { x, y } = store();

	React.useEffect(() => {
		const handleOnMouseMove = (event) => {
			const { pageX: x, pageY: y } = event;
			store.getState().setPosition({ x, y });
		};

		document.addEventListener('mousemove', handleOnMouseMove);

		return () => {
			document.removeEventListener('mousemove', handleOnMouseMove);
		};
	}, [store]);

	return (
		<View
			css={[
				`
				position: fixed;
				top: 0;
				left: 0;
				background: purple;
				color: white;
				width: 50px;
				height: 50px;
        margin: 25px 0 0 25px;
        cursor: none;
        pointer-events: none;
      `,
				ui.borderRadius.circle,
				ui.alignment.content.center,
			]}
			style={{
				transform: `translate(${x}px, ${y}px)`,
			}}
		>
			<Text color="currentColor">RK</Text>
		</View>
	);
};

export const _default = () => {
	return (
		<>
			<Purple />
			<Popover trigger={<button>Open</button>}>
				<Text>Oh no! No more follow!</Text>
			</Popover>
		</>
	);
};
