import { useState } from 'react';

type TReturn<T> = [
	Array<T>,
	number,
	(val: T) => void,
	() => void,
	() => void,
	() => void
];

/**
 * Custom hook that will provide an array of elements that can be added to,
 * as well as the option to undo adding elements, and redoing those undos.
 * @param defaultValue (optional) Array that is to be used as the initial state
 * @returns [elementsArray, undoableCount, addFunction, undofunction, redoFunction, resetFunction]
 */
export default function useArrayWithUndo<T>(
	defaultValue: Array<T> = []
): TReturn<T> {
	const [elements, setElements] = useState<Array<T>>(defaultValue);
	const [undoneElements, setUndoneElements] = useState<Array<T>>([]);

	/**
	 * Add a new value at the end of the array. This will reset the stored list of undoable elements.
	 * @param value
	 */
	function add(value: T) {
		setElements([...elements, value]);

		// When adding new data, reset the undo queue, if there is any
		if (undoneElements.length > 0) setUndoneElements([]);
	}

	/**
	 * Removes the last stored element from the array. The element will be added to the stored
	 * list of undoable elements.
	 */
	function undo() {
		if (elements.length > 0) {
			// As we ensure that data does have elements in it, pop will not return undefined
			// (unless undefined is actually purposefully stored within the array)
			const lastElement = elements.pop() as T;

			setElements([...elements]);
			setUndoneElements([...undoneElements, lastElement]);
		}
	}

	/**
	 * Restores the last item that was removed from the array with undo.
	 */
	function redo() {
		if (undoneElements.length > 0) {
			const lastElement = undoneElements.pop() as T;

			setElements([...elements, lastElement]);
			setUndoneElements([...undoneElements]);
		}
	}

	/**
	 * Clears both the array and the list of elements that have been removed through undo.
	 */
	function reset() {
		setElements([]);
		setUndoneElements([]);
	}

	const undoableCount = undoneElements.length;

	return [elements, undoableCount, add, undo, redo, reset];
}
