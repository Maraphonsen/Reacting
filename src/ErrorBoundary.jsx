import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    // Отправка ошибки на сервер
    fetch('/log-error', {
      method: 'POST',
      body: JSON.stringify({ error: error.toString(), errorInfo }),
    });
  }

  render() {
    if (this.state.hasError) {
      return <h1>Что-то пошло не так. Пожалуйста, перезагрузите страницу.</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;