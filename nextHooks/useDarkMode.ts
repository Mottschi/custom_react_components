import { useEffect, useCallback } from 'react';
import useLocalStorage from './useLocalStorage';

export default function useDarkMode(
	defaultValue?: boolean
): [boolean, (newValue?: boolean) => void] {
	const [
		isDarkModeEnabled,
		setCurrentMode,
		removeStorageSetting,
		darkModeIsLoading,
	] = useLocalStorage('useDarkMode', defaultValue);

	useEffect(() => {
		if (darkModeIsLoading) return;
		if (isDarkModeEnabled === undefined) {
			setCurrentMode(
				window.matchMedia('(prefers-color-scheme: dark)').matches
			);
		}
	}, [isDarkModeEnabled, setCurrentMode, darkModeIsLoading]);

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

	// For use with tailwind, required darkMode to be set to 'class' in the tailwind.config.js
	useEffect(() => {
		document.documentElement.classList.toggle('dark', isDarkModeEnabled);
	}, [isDarkModeEnabled]);

	return [!!isDarkModeEnabled, toggleDarkMode];
}
