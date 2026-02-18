import { cn } from "@/lib/utils";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";
import { Component, ReactNode } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          className="flex items-center justify-center min-h-screen p-4 bg-background"
          role="alert"
          aria-live="assertive"
        >
          <Card className="w-full max-w-lg border-red-500/20 bg-red-500/5">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10">
                <AlertTriangle
                  className="h-6 w-6 text-red-500"
                  aria-hidden="true"
                />
              </div>
              <CardTitle className="text-xl text-red-500">
                Oops! Something went wrong
              </CardTitle>
              <CardDescription className="text-red-400/80">
                An unexpected error occurred. We're sorry for the inconvenience.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {this.state.error && (
                <div
                  className="p-4 rounded-lg bg-black/20 overflow-auto max-h-48 text-xs font-mono text-red-300/70"
                  role="region"
                  aria-label="Error details"
                >
                  <p className="font-semibold mb-2">Error:</p>
                  <pre className="whitespace-pre-wrap break-words">
                    {this.state.error.message}
                  </pre>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                onClick={() => window.location.reload()}
                className="gap-2 bg-red-500 hover:bg-red-600 text-white"
                aria-label="Reload the page"
              >
                <RotateCcw className="h-4 w-4" />
                Reload Page
              </Button>
              <Button
                variant="outline"
                onClick={() => window.location.href = '/'}
                className="gap-2 border-red-500/20 text-red-400 hover:bg-red-500/10"
                aria-label="Go to homepage"
              >
                <Home className="h-4 w-4" />
                Go Home
              </Button>
            </CardFooter>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
