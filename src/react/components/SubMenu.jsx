import React from 'react';
import ReactDOM from 'react-dom';

class SubWindow extends React.Component {
  nativeWindowObject: null;

  componentWillMount() {
    this.nativeWindowObject = window.open('');
  }

  render() {
    return this.nativeWindowObject ? ReactDOM.createPortal(this.props.children, this.nativeWindowObject.document.body) : null;
  }
}

export default SubWindow;
