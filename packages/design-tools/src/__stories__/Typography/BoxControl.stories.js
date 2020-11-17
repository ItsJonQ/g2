import {
	arrowDown,
	arrowLeft,
	arrowRight,
	arrowUp,
	fullscreen,
} from '@wordpress/icons';
import {
	Button,
	Container,
	FormGroup,
	Grid,
	HStack,
	Icon,
	Surface,
	UnitInput,
} from '@wp-g2/components';
import { ui } from '@wp-g2/styles';
import React from 'react';

export default {
	title: 'DesignTools/TypographyTools/BoxControl',
};

const PaddingInput = ({ icon, ...props }) => {
	return (
		<UnitInput
			min={0}
			{...props}
			prefix={icon && <Icon icon={icon} size={12} variant="muted" />}
		/>
	);
};

const Example = () => {
	const [showAll, setShowAll] = React.useState(true);

	return (
		<Container css={[ui.position.relative]} width={320}>
			<Surface border css={ui.padding(5)}>
				<FormGroup label="Padding">
					<HStack alignment="top" spacing={3}>
						<Grid gap={1}>
							{!showAll && <PaddingInput value="24px" />}
							{showAll && (
								<>
									<PaddingInput icon={arrowUp} value="24px" />
									<PaddingInput
										icon={arrowDown}
										value="24px"
									/>
									<PaddingInput
										icon={arrowLeft}
										value="24px"
									/>
									<PaddingInput
										icon={arrowRight}
										value="24px"
									/>
								</>
							)}
						</Grid>
						<Button
							icon={fullscreen}
							isActive={showAll}
							isControl
							isSubtle
							onClick={() => setShowAll((prev) => !prev)}
						/>
					</HStack>
				</FormGroup>
			</Surface>
		</Container>
	);
};

export const _default = () => {
	return <Example />;
};
