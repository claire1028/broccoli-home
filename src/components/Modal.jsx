import React from 'react';
import {useEffect, useRef} from 'react';
import PropTypes from 'prop-types';

import './modal.styl';

const escHandlerGen = onEsc => {
	return e => {
		if (e.which === 27) {
			onEsc(e);
		}
	};
};

function noop() {}

export default function Modal({isOpen, onClose, modal, children}) {
	if (typeof modal !== 'boolean') {
		modal = true;
	}
	onClose = onClose || noop;
	const overlayRef = useRef(null);

	function onOverlayClick(e) {
		if (e.target === overlayRef.current) {
			onClose();
		}
	}

	useEffect(() => {
		document.body.style.overflow = isOpen ? 'hidden' : '';
	}, [isOpen]);

	const onPressEsc = escHandlerGen(onClose);

	useEffect(() => {
		const needBindingKey = isOpen && onClose !== noop;

		if (needBindingKey) {
			document.body.addEventListener('keyup', onPressEsc, false);
		}

		return () => {
			if (needBindingKey) {
				document.body.removeEventListener('keyup', onPressEsc, false);
			}
		};
	}, [isOpen]);

	return (
		<div className="rc-dialog" style={{display: isOpen ? '' : 'none'}}>
			<div
				ref={overlayRef}
				onClick={!modal ? onOverlayClick : null}
				className="overlay"
				style={{display: isOpen ? '' : 'none'}}
			>
				{React.Children.only(children)}
			</div>
		</div>
	);
}


Modal.propTypes = {
	isOpen: PropTypes.bool,
	modal: PropTypes.bool,
	onClose: PropTypes.func,
	children: PropTypes.element
};