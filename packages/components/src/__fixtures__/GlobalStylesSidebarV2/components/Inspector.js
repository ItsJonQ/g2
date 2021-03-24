import { motion } from 'framer-motion';
import React from 'react';

import {
	Card,
	CardBody,
	CardHeader,
	FormGroup,
	Panel,
	PanelBody,
	PanelHeader,
	Select,
	useNavigatorHistory,
	useNavigatorLocation,
	View,
} from '../../../index';
import { useAppState } from '../state';

const routes = ['/', '/colors', '/colors/palette', '/typography'].map((o) => ({
	value: o,
	label: o,
}));

export const Inspector = () => {
	const navigator = useNavigatorHistory();
	const location = useNavigatorLocation();
	const currentPath = location?.pathname;
	const handleOnRouteChange = (next) => navigator.push(next);
	const appState = useAppState();
	console.log(appState);

	return (
		<div style={{ position: 'fixed', top: 16, left: 16 }}>
			<motion.div drag dragMomentum={false}>
				<Card css={{ minWidth: 400 }}>
					<CardHeader>Inspector</CardHeader>
					<CardBody>
						<FormGroup horizontal label="Go to">
							<Select
								onChange={handleOnRouteChange}
								options={routes}
								value={currentPath}
							/>
						</FormGroup>
					</CardBody>
					<Panel>
						<PanelHeader>State</PanelHeader>
						<PanelBody>
							<View
								as="pre"
								css={{
									fontFamily: 'monospace',
									maxWidth: '100%',
									maxHeight: 300,
									overflowY: 'auto',
									fontSize: 10,
								}}
							>
								{JSON.stringify(appState, null, 2)}
							</View>
						</PanelBody>
					</Panel>
				</Card>
			</motion.div>
		</div>
	);
};
