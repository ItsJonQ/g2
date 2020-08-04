import { css, space, styled } from '@wp-g2/styles';

export const ListView = styled.ul`
	list-style: disc outside none;
	margin: 0;
	padding: 0;
	padding-left: ${space(4)};
`;

export const ListItemView = styled.li`
	margin: 0;
	margin-bottom: ${space(2)};

	&:last-child {
		margin-bottom: 0;
	}
`;

export const ordered = css`
	list-style: decimal outside none;
	padding-left: ${space(6)};
`;
