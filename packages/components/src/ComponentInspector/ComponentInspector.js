import { connect } from '@wp-g2/context';
import { ns } from '@wp-g2/styles';
import { is } from '@wp-g2/utils';
import React, { useEffect, useRef, useState } from 'react';

import { Debugger } from '../Debugger';
import { ComponentInspectorView } from './ComponentInspector.styles';

const [NAMESPACE] = Object.keys(ns());

function ComponentInspector({ children, disabled = false, visible, ...props }) {
	const nodeRef = useRef();
	const [position, setPosition] = useState({ x: 0, y: 0 });
	const [label, setLabel] = useState();

	const isHidden = is.boolean(visible) && !visible;

	useEffect(() => {
		const node = nodeRef.current;
		if (!node || disabled || isHidden) return;

		const clear = () => {
			setPosition({ x: 0, y: 0 });
			setLabel(null);
		};

		const handleOnMouseMove = (event) => {
			const { target } = event;
			const componentName = target.getAttribute(NAMESPACE);

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
	}, [disabled, isHidden]);

	const { x, y } = position;
	const showDebugger = disabled || !label || (!!x && !!y);

	return (
		<ComponentInspectorView
			disabled={disabled || isHidden}
			ref={nodeRef}
			{...props}
		>
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
		</ComponentInspectorView>
	);
}

export default connect(ComponentInspector, 'ComponentInspector');
