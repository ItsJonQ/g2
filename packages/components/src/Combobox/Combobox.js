import { contextConnect, useContextSystem } from '@wp-g2/context';
import { ui } from '@wp-g2/styles';
import { useResizeAware } from '@wp-g2/utils';
import React, { useRef } from 'react';
import {
	unstable_Combobox as ReakitCombobox,
	unstable_ComboboxOption as ReakitComboboxOption,
	unstable_ComboboxPopover as ReakitComboboxPopover,
	unstable_useComboboxState as useComboboxState,
} from 'reakit';

import { DropdownMenu, DropdownMenuItem } from '../Dropdown';
import { TextInput } from '../TextInput';
import { View } from '../View';

function Combobox(props, forwardedRef) {
	const { modal = true, ...otherProps } = useContextSystem(props, 'Combobox');
	const combobox = useComboboxState({ modal, ...otherProps });
	const inputWrapperRef = useRef();
	const [resizeListener, sizes] = useResizeAware();

	return (
		<View css={[ui.position.relative]} ref={inputWrapperRef}>
			{resizeListener}
			<ReakitCombobox
				{...combobox}
				aria-label="Fruit"
				as={TextInput}
				ref={forwardedRef}
				unstable_referenceRef={inputWrapperRef.current}
			/>
			<ReakitComboboxPopover
				{...combobox}
				aria-label="Fruits"
				as={DropdownMenu}
				data-enter={combobox.visible ? 1 : 0}
				gutter={0}
				minWidth={sizes.width}
				placement="bottom-start"
			>
				<ReakitComboboxOption
					{...combobox}
					as={DropdownMenuItem}
					value="Ana"
				/>
				<ReakitComboboxOption
					{...combobox}
					as={DropdownMenuItem}
					value="Elsa"
				/>
				<ReakitComboboxOption
					{...combobox}
					as={DropdownMenuItem}
					value="Olaf"
				/>
				<ReakitComboboxOption
					{...combobox}
					as={DropdownMenuItem}
					value="Kristoff"
				/>
			</ReakitComboboxPopover>
		</View>
	);
}

export default contextConnect(Combobox, 'Combobox');
