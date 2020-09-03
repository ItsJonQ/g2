import { StyleSystemContext, useStyleSystemContext } from '@wp-g2/styles';
import React, { useEffect, useRef, useState } from 'react';
import Frame from 'react-frame-component';

import { Button } from '../../index';

export default {
	title: 'Examples/WIP/FrameRendering',
};

/**
 * Provides the closest document given where the React component rendered.
 */
function OwnerDocumentProvider({ children }) {
	const [ownerDocument, setOwnerDocument] = useState(null);
	const ref = useRef(null);

	useEffect(() => {
		if (ref.current) {
			setOwnerDocument(ref.current.ownerDocument);
		}
	}, [ref, setOwnerDocument]);

	return (
		<React.Fragment>
			{!ref.current ? <div ref={ref} /> : children({ ownerDocument })}
		</React.Fragment>
	);
}

function StyleSystemFrameProvider({ children }) {
	const styleSystem = useStyleSystemContext();
	return (
		<OwnerDocumentProvider>
			{({ ownerDocument }) => {
				if (styleSystem?.compiler?.sheet?.container) {
					// styleSystem.compiler.sheet.container = ownerDocument;
				}

				return (
					<StyleSystemContext.Provider value={{}}>
						{children}
					</StyleSystemContext.Provider>
				);
			}}
		</OwnerDocumentProvider>
	);
}

const Example = () => {
	return (
		<>
			<Button variant="primary">Button</Button>
			<br />
			<Frame>
				<StyleSystemFrameProvider>
					<Button size="small" variant="primary">
						Button
					</Button>
				</StyleSystemFrameProvider>
			</Frame>
		</>
	);
};

export const _default = () => {
	return <Example />;
};
