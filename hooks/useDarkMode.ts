import { useEffect, useCallback } from 'react';
import useLocalStorage from './useLocalStorage';

function useDarkMode(
	defaultValue?: boolean
): [boolean, (newValue?: boolean) => void] {
	const [isDarkModeEnabled, setCurrentMode] = useLocalStorage(
		'useDarkMode',
		defaultValue ??
			window.matchMedia('(prefers-color-scheme: dark)').matches
	);

	const toggleDarkMode = useCallback(
		(newValue?: boolean) => {
			if (newValue !== undefined) {
				setCurrentMode(newValue);
			} else {
				setCurrentMode((current) => !current);
			}
		},
		[setCurrentMode]
	);

	// For use with tailwind, requires darkMode to be set to 'class' in the tailwind.config.js
	useEffect(() => {
		document.documentElement.classList.toggle('dark', isDarkModeEnabled);
	}, [isDarkModeEnabled]);

	return [!!isDarkModeEnabled, toggleDarkMode];
}

export default useDarkMode;
