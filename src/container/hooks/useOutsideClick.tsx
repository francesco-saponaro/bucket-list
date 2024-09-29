import { useEffect } from 'react';

const useOutsideClick = (ref: React.RefObject<HTMLElement>,
	callback: () => void) => {
	const handleClick = (e: MouseEvent) => {
		if (ref.current && !ref.current.contains(e.target as Node)) {
			callback();
		}
	};

	useEffect(() => {
		document.addEventListener('click', handleClick);

		return () => {
			document.removeEventListener('click', handleClick);
		};
	}, [ref, callback]);
};

export default useOutsideClick;
