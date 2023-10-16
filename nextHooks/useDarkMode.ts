import { useEffect, useCallback } from 'react';
import useLocalStorage from './useLocalStorage';

export default function useDarkMode(
	defaultValue?: boolean
): [boolean, () => void] {
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

	const toggleDarkMode = useCallback(() => {
		setCurrentMode((current) => !current);
	}, [setCurrentMode]);

	// For use with tailwind, required darkMode to be set to 'class' in the tailwind.config.js
	useEffect(() => {
		document.documentElement.classList.toggle('dark', isDarkModeEnabled);
	}, [isDarkModeEnabled]);

	return [!!isDarkModeEnabled, toggleDarkMode];
}
