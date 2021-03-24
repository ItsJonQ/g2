import { motion } from 'framer-motion';
import React from 'react';

import {
	Card,
	CardBody,
	CardHeader,
	FormGroup,
	Select,
	useNavigatorHistory,
	useNavigatorLocation,
} from '../../../index';

const routes = ['/', '/colors', '/colors/palette'].map((o) => ({
	value: o,
	label: o,
}));

export const Inspector = () => {
	const navigator = useNavigatorHistory();
	const location = useNavigatorLocation();
	const currentPath = location?.pathname;
	const handleOnRouteChange = (next) => navigator.push(next);

	return (
		<div style={{ position: 'fixed', top: 16, left: 16 }}>
			<motion.div drag dragMomentum={false}>
				<Card css={{ minWidth: 300 }}>
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
				</Card>
			</motion.div>
		</div>
	);
};
