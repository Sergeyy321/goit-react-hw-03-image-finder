import { Component } from 'react';

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }
  
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }
  
  handleKeyDown = el => {
    if (el.code === 'Escape') {
      this.props.onClose();
    }
  };
  
  handleBackdropClick = el => {
    if (el.target === el.currentTarget) {
      this.props.onClose();
    }
  };
  render() {
    return (
      <div>
        
    </div>
    
    )
    
  }
};