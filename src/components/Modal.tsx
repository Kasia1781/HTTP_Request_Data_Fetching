import { forwardRef, type ReactNode, useImperativeHandle, useRef } from 'react';
import { createPortal } from 'react-dom';

export type ModalHandle = {
	open: () => void;
	close: () => void;
};

type ModalProps = {
	children: ReactNode;
	onClose: () => void;
};

const Modal = forwardRef<ModalHandle, ModalProps>(function Modal(
	{ children, onClose },
	ref
) {
	const dialog = useRef<HTMLDialogElement>(null);

	useImperativeHandle(ref, () => {
		return {
			open: () => {
				if (dialog.current) {
					dialog.current.showModal();
				}
			},
			close: () => {
				if (dialog.current) {
					dialog.current.close();
				}
			},
		};
	});

	return createPortal(
		<dialog className='modal' ref={dialog} id='modal' onClose={onClose}>
			{children}
		</dialog>,
		document.getElementById('modal')!
	);
});

export default Modal;
