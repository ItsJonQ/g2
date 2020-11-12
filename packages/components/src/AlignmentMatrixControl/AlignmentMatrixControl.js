import { Composite, CompositeGroup, useCompositeState } from '@wp-g2/a11y';
import { contextConnect, useContextSystem } from '@wp-g2/context';
import { useRTL } from '@wp-g2/styles';
import { noop } from 'lodash';
import React, { useState } from 'react';

import {
	AlignmentMatrixControlView,
	RowView,
} from './AlignmentMatrixControl.styles';
import Cell from './AlignmentMatrixControlCell';
import { GRID } from './constants';
import { getItemId } from './utils';

function AlignmentMatrixControl(props, forwardedRef) {
	const {
		baseId = 'alignment-matrix-control',
		defaultValue,
		onChange = noop,
		label = 'Alignment Matrix Control',
		value,
		...otherProps
	} = useContextSystem(props, 'AlignmentMatrixControl');

	const [immutableDefaultValue] = useState(value ?? defaultValue);

	const isRTL = useRTL();
	const initialCurrentId = getItemId(baseId, immutableDefaultValue);

	const composite = useCompositeState({
		baseId,
		currentId: initialCurrentId,
		rtl: isRTL,
	});

	const handleOnChange = (nextValue) => {
		onChange(nextValue);
		composite.setCurrentId(getItemId(baseId, nextValue));
	};

	return (
		<Composite
			aria-label={label}
			as={AlignmentMatrixControlView}
			ref={forwardedRef}
			{...otherProps}
			{...composite}
			role="grid"
		>
			{GRID.map((cells, index) => (
				<CompositeGroup
					as={RowView}
					key={index}
					role="row"
					{...composite}
				>
					{cells.map((cell) => {
						const cellId = getItemId(baseId, cell);
						const isActive = composite.currentId === cellId;

						return (
							<Cell
								{...composite}
								id={cellId}
								isActive={isActive}
								key={cell}
								onFocus={() => handleOnChange(cell)}
								value={cell}
							/>
						);
					})}
				</CompositeGroup>
			))}
		</Composite>
	);
}

export default contextConnect(AlignmentMatrixControl, 'AlignmentMatrixControl');
