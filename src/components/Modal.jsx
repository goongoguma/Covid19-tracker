import React from 'react';
import ReactDOM from 'react-dom'

function Modal({ open, text, onClose}) {
  if (!open) return null;

  return ReactDOM.createPortal(
    <>
      <div className='modal-wrapper'>
        <div className="modal-style">
          <p>{text}</p>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </>,
    document.getElementById("portal")
  )
}

export default Modal
