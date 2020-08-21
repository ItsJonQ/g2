import { connect } from '@wp-g2/context';
import React, { useEffect, useRef, useState } from 'react';

import { Debugger } from '../Debugger';
import { ComponentDebuggerView } from './ComponentDebugger.styles';

function ComponentDebugger({ children, disabled = false, ...props }) {
	const nodeRef = useRef();
	const [position, setPosition] = useState({ x: 0, y: 0 });
	const [label, setLabel] = useState();

	useEffect(() => {
		const node = nodeRef.current;
		if (!node || disabled) return;

		const clear = () => {
			setPosition({ x: 0, y: 0 });
			setLabel(null);
		};

		const handleOnMouseMove = (event) => {
			const { target } = event;
			const componentName = target.getAttribute('data-g2-component');

			setPosition({ x: event.clientX, y: event.clientY });

			if (componentName) {
				setLabel(`<${componentName} />`);
			}
		};

		node.addEventListener('mousemove', handleOnMouseMove);
		node.addEventListener('mouseenter', clear);
		node.addEventListener('mouseleave', clear);

		return () => {
			node.removeEventListener('mousemove', handleOnMouseMove);
			node.removeEventListener('mouseenter', clear);
			node.removeEventListener('mouseleave', clear);
		};
	}, [disabled]);

	const { x, y } = position;
	const showDebugger = disabled || !label || (!!x && !!y);

	return (
		<ComponentDebuggerView disabled={disabled} ref={nodeRef} {...props}>
			{showDebugger && (
				<Debugger
					__force
					style={{
						left: x,
						position: 'fixed',
						top: y,
						transform: `translate(-50%, calc(-100% + -10px)`,
					}}
				>
					{label}
				</Debugger>
			)}
			{children}
		</ComponentDebuggerView>
	);
}

export default connect(ComponentDebugger, 'ComponentDebugger');
