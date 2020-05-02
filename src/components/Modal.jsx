import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

const Modal = props => {
  return ReactDOM.createPortal(
    <div className="modal">
      <div className="modal__background" />
      <div className="modal__body">
        <h2 className="modal__body-title">{props.title}</h2>
        <p className="modal__body-message">{props.message}</p>
        <div className="modal__buttons">
           {props.cancelButton &&
           <button
              className="btn form-button"
              type="button"
              onClick={props.onModalCancel}
            >
              Cancel
            </button>
           }
          <button
            className="btn form-button"
            type="button"
            onClick={props.onModalOk}
          >
            OK
          </button>
        </div>
      </div>
    </div>,
  document.getElementById('modal'));
}

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  onModalOk: PropTypes.isRequired,
  cancelButton: PropTypes.bool,
  onModalCancel: PropTypes.func
}

export default Modal;