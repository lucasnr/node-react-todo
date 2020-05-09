import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';

import { InputContainer, TextareaContainer } from './styles';

export default function Input({ name, textarea = false, ...rest }) {
	const inputRef = useRef(null);
	const { fieldName, defaultValue, registerField } = useField(name);
	useEffect(() => {
		registerField({
			name: fieldName,
			ref: inputRef.current,
			path: 'value',
		});
	}, [fieldName, registerField]);
	return textarea ? (
		<TextareaContainer ref={inputRef} defaultValue={defaultValue} {...rest} />
	) : (
		<InputContainer ref={inputRef} defaultValue={defaultValue} {...rest} />
	);
}
