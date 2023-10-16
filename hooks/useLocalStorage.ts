import { useState, useEffect, useCallback } from 'react';

type TTuple<T> = [
	T | undefined,
	React.Dispatch<React.SetStateAction<T | undefined>>,
	() => void
];

function useLocalStorage<T>(key: string, defaultValue: T): TTuple<T> {
	const [value, setValue] = useState<T | undefined>(() => {
		const jsonValue = localStorage.getItem(key);

		if (jsonValue != null) {
			// NOTE: for now, the hook just assumes that the parsed value is in fact of type T
			// TODO: add type validation using zod
			const parsedValue = JSON.parse(jsonValue) as T;

			return parsedValue;
		}

		return defaultValue;
	});

	useEffect(() => {
		if (value === undefined) {
			localStorage.removeItem(key);
		} else {
			localStorage.setItem(key, JSON.stringify(value));
		}
	}, [key, value]);

	const remove = useCallback(() => {
		setValue(undefined);
	}, []);

	return [value, setValue, remove];
}

export default useLocalStorage;
