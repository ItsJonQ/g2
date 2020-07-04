import { css, styled } from '@g2/css';

import { Flex } from '../Flex';
import { Scrollable } from '../Scrollable';
import { Surface } from '../Surface';

export const CardView = styled(Surface)`
	border-radius: 8px;
	outline: none;
`;

const headerFooterStyles = ({ theme }) => {
	const { utils } = theme;
	const { space } = utils;

	return css`
		min-height: 48px;
		padding: ${space(1)} ${space(3)};
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
	const { utils } = theme;
	const { space } = utils;

	return css`
		padding: ${space(3)};
	`;
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
