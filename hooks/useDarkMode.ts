import { useEffect, useCallback } from 'react';
import React from 'react';
import useLocalStorage from './useLocalStorage';

function useDarkMode(defaultValue?: boolean): [boolean, () => void] {
	const [isDarkModeEnabled, setCurrentMode] = useLocalStorage(
		'useDarkMode',
		defaultValue ??
			window.matchMedia('(prefers-color-scheme: dark)').matches
	);

	const toggleDarkMode = useCallback(() => {
		setCurrentMode((current) => !current);
	}, [setCurrentMode]);

	// For use with tailwind, required darkMode to be set to 'class' in the tailwind.config.js
	useEffect(() => {
		document.documentElement.classList.toggle('dark', isDarkModeEnabled);
	}, [isDarkModeEnabled]);

	return [!!isDarkModeEnabled, toggleDarkMode];
}

export default useDarkMode;
