import React from 'react';

import {
	Button,
	Checkbox,
	Container,
	FormGroup,
	ListGroup,
	Panel,
	PanelBody,
	PanelHeader,
	Surface,
	Text,
} from '../../index';

export default {
	title: 'Examples/WIP/FormElementInPanel',
};

const Example = () => {
	return (
		<Container
			css={`
				margin-top: 10vh;
				margin-bottom: 20vh;
			`}
			width={280}
		>
			<Surface border>
				<Panel visible>
					<PanelHeader>Status & visibility</PanelHeader>
					<PanelBody>
						<ListGroup>
							<FormGroup horizontal label="Visibility">
								<Button>Public</Button>
							</FormGroup>
							<FormGroup horizontal label="Publish">
								<Button>Immediately</Button>
							</FormGroup>
							<FormGroup>
								<Checkbox label="Stick to the top of the blog" />
							</FormGroup>
							<FormGroup>
								<Checkbox label="Pending review" />
							</FormGroup>
							<Button isDestructive>Move to trash</Button>
						</ListGroup>
					</PanelBody>
				</Panel>
			</Surface>
		</Container>
	);
};

export const _default = () => {
	return <Example />;
};
