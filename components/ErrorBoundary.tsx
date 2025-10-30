import React, { Component, ErrorInfo, ReactNode } from 'react';
import Card from './ui/Card';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex justify-center items-center min-h-screen p-4">
            <Card className="p-8 text-center max-w-lg">
                <h1 className="text-2xl font-bold text-red-500 mb-4">Oops! Something went wrong.</h1>
                <p className="text-brand-text-secondary mb-4">
                    An unexpected error occurred. Please try refreshing the page.
                </p>
                {this.state.error && (
                    <pre className="text-xs text-left bg-brand-bg/50 p-2 rounded overflow-auto my-4 text-red-400">
                        {this.state.error.toString()}
                    </pre>
                )}
                <button 
                    onClick={() => window.location.reload()}
                    className="font-bold py-2 px-6 rounded-lg bg-brand-primary hover:bg-sky-400 text-brand-bg"
                >
                    Refresh Page
                </button>
            </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
