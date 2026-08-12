import React from 'react';

export class ShaderErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    if (import.meta.env.DEV) {
      console.warn('Shader UI failed gracefully:', error, errorInfo);
    }
    if (typeof this.props.onError === 'function') {
      this.props.onError();
    }
  }

  render() {
    if (this.state.hasError) {
      // Fallback renders nothing, leaving native fallback image underneath intact
      return null;
    }

    return this.props.children;
  }
}
