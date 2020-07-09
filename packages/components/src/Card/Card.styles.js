import { css, styled } from '@wp-g2/styled';

import { Flex } from '../Flex';
import { Scrollable } from '../Scrollable';
import { Surface } from '../Surface';

export const CardView = styled(Surface)`
	border-radius: 8px;
	outline: none;
`;

const headerFooterStyles = ({ theme }) => {
	return css`
		min-height: 48px;
		${theme.sx({
			px: 3,
			py: 1,
		})}
	`;
};

const borderRadiusStyles = () => css`
	&:first-of-type {
		border-top-left-radius: 8px;
		border-top-right-radius: 8px;
	}

	&:last-of-type {
		border-bottom-left-radius: 8px;
		border-bottom-right-radius: 8px;
	}
`;

const bodyStyles = ({ theme }) => {
	return theme.sx({
		p: 3,
	});
};

export const CardBodyView = styled(Scrollable)`
	${bodyStyles};
	${borderRadiusStyles};
`;

export const CardHeaderView = styled(Flex)`
	border-bottom: 1px solid #eee;
	${headerFooterStyles};
	${borderRadiusStyles};
`;

export const CardFooterView = styled(Flex)`
	border-top: 1px solid #eee;
	${headerFooterStyles};
	${borderRadiusStyles};
`;
