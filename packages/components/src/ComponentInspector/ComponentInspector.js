import { contextConnect, ns, useContextSystem } from '@wp-g2/context';
import { is, mergeRefs } from '@wp-g2/utils';
import React, { useEffect, useRef, useState } from 'react';

import { Debugger } from '../Debugger';
import { ComponentInspectorView } from './ComponentInspector.styles';

const [NAMESPACE] = Object.keys(ns());

function ComponentInspector(props, forwardedRef) {
	const {
		children,
		disabled = false,
		tooltipElement,
		tooltipOnly = false,
		visible,
		...otherProps
	} = useContextSystem(props, 'ComponentInspector');

	const nodeRef = useRef();
	const [position, setPosition] = useState({ x: 0, y: 0 });
	const [label, setLabel] = useState();

	const isHidden = is.boolean(visible) && !visible;

	useEffect(() => {
		if (isHidden) {
			setPosition({ x: 0, y: 0 });
			setLabel(null);
		}
	}, [isHidden]);

	useEffect(() => {
		const node = tooltipElement || nodeRef.current;
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
				if (
					!['Debugger', 'ComponentInspector'].includes(componentName)
				) {
					setLabel(`<${componentName} />`);
				} else {
					setLabel(null);
				}
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
	}, [disabled, isHidden, tooltipElement]);

	const { x, y } = position;
	const showDebugger = label && !!x && !!y && !disabled;

	return (
		<ComponentInspectorView
			disabled={tooltipOnly || disabled || isHidden}
			ref={mergeRefs([forwardedRef, nodeRef])}
			{...otherProps}
		>
			{showDebugger && (
				<Debugger
					__force
					style={{
						left: x,
						position: 'fixed',
						top: y,
						transform: `translate(-50%, calc(-100% + -10px)`,
						zIndex: 99999999,
					}}
				>
					{label}
				</Debugger>
			)}
			{children}
		</ComponentInspectorView>
	);
}

export default contextConnect(ComponentInspector, 'ComponentInspector');
