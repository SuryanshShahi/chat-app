import { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(_: Error): State {
    // Update state to show fallback UI
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can log the error to an error reporting service
    console.error('Uncaught error:', error, errorInfo)
  }

  render() {
    // todo: create fall back ui or delete this file
    // if (this.state.hasError) {
    //   // Render any custom fallback UI
    //   return <h1>Something went wrong.</h1>
    // }

    return this.props.children
  }
}

export default ErrorBoundary
