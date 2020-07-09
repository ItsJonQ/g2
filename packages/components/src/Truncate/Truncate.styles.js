import { css, styled } from '@wp-g2/styled';

import { TRUNCATE_TYPE } from './Truncate.utils';

const truncateStyles = ({ ellipsizeMode, numberOfLines }) => {
	if (ellipsizeMode !== TRUNCATE_TYPE.auto) return '';
	if (numberOfLines) {
		return css`
			-webkit-box-orient: vertical;
			-webkit-line-clamp: ${numberOfLines};
			display: -webkit-box;
			overflow: hidden;
		`;
	}

	return css`
		display: block;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	`;
};

export const TruncateView = styled.span`
	${truncateStyles};
`;
