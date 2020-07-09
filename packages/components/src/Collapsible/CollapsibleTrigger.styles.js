import { styled } from '@wp-g2/styled';
import { Disclosure } from 'reakit/Disclosure';

const CollapsibleTriggerBaseView = styled.div`
	transform: translateZ(0);

	&:active {
		user-select: none;
	}
`;

export const CollapsibleTriggerView = CollapsibleTriggerBaseView.withComponent(
	Disclosure,
);
