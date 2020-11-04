import { Composite, CompositeGroup, useCompositeState } from '@wp-g2/a11y';
import { contextConnect, useContextSystem } from '@wp-g2/context';
import { useRTL } from '@wp-g2/styles';
import { noop } from 'lodash';
import React, { useState } from 'react';

import * as styles from './AlignmentMatrixControl.styles';
import Cell from './Cell';
import { GRID } from './constants';
import { getItemId } from './utils';

function AlignmentMatrixControl(props, forwardedRef) {
	const {
		defaultValue,
		onChange = noop,
		value,
		...otherProps
	} = useContextSystem(props, 'AlignmentMatrixControl');

	const [immutableDefaultValue] = useState(value ?? defaultValue);

	const isRTL = useRTL();
	const baseId = 'alignment-matrix-control';
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
		<Composite as={styles.Root} ref={forwardedRef} {...otherProps}>
			{GRID.map((cells, index) => (
				<CompositeGroup as={styles.Row} key={index} role="row">
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
