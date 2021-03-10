import { css, ui } from '@wp-g2/styles';

export const ElementOutline = css`
	display: none;
	outline: 1px solid orangered;
	pointer-events: none;
	position: fixed;
	z-index: 9999999;
`;

export const ParentElementOutline = css`
	${ElementOutline}
	outline: 1px solid #7b62ff;
	z-index: 999999;
`;

export const RulerX = css`
	border-top: 1px solid orangered;
	height: 0;
	opacity: 0.5;
	position: absolute;
	top: 50%;
`;

export const RulerY = css`
	${ui.border.start('1px solid orangered')}
	left: 50%;
	opacity: 0.5;
	position: absolute;
	width: 0;
`;

export const RulerL = css`
	${RulerX};
`;

export const RulerR = css`
	${RulerX};
`;

export const RulerT = css`
	${RulerY};
`;

export const RulerB = css`
	${RulerY};
`;

export const BaseLabel = css`
	background: orangered;
	border-radius: 2px;
	color: white;
	display: block;
	font-size: 7px;
	font-weight: bold;
	line-height: 1;
	margin: 0;
	padding: 1px 2px;
	position: absolute;
`;

export const Label = css`
	${BaseLabel};
	background: orangered;
`;

export const LabelT = css`
	${Label};
	left: 50%;
	top: 0;
	transform: translate(-50%, -120%);
`;

export const LabelB = css`
	${Label};
	bottom: 0;
	left: 50%;
	transform: translate(-50%, 120%);
`;

export const LabelL = css`
	${Label};
	left: 0;
	top: 50%;
	transform: translate(-120%, -50%);
`;

export const LabelR = css`
	${Label};
	${ui.end(0)}
	top: 50%;
	transform: translate(120%, -50%);
`;

export const ParentSizeLabel = css`
	${BaseLabel};
	background: #7b62ff;
	bottom: 0;
	${ui.end(0)}
	transform: translateY(120%);
	white-space: nowrap;
`;

export const SizeLabel = css`
	${BaseLabel};
	background: orangered;
	left: 0;
	top: 0;
	transform: translate(0, -120%);
	white-space: nowrap;
	z-index: 2;
`;

export const Resizer = css`
	cursor: pointer;
	outline: 1px solid #7b62ff;
	pointer-events: none;
	position: fixed;
	z-index: 9999999;
`;
