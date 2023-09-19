import { Component } from 'react';
import { Modalstyle, Overlay } from 'components/Modal/Modal.styled'
import { createPortal } from 'react-dom';
const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.onKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeyDown);
  }

  onBackdropClick = el => {
    if (el.target === el.currentTarget) {
      this.props.onModalClose();
    }
  };
  onKeyDown = el => {
    if (el.code === 'Escape') {
      this.props.onModalClose();
    }
  };
  render() {
    return createPortal(
      <Overlay onClick={this.onBackdropClick}>
        <Modalstyle>
          <img src={this.props.selectedImage} alt={this.props.tags} />
        </Modalstyle>
      </Overlay>,
      modalRoot
    );
  }
};