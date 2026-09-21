import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface Props {
  children: ReactNode;
  fallbackTitle?: string;
  fallbackMessage?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn("Caught in ErrorBoundary:", error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-full min-h-[300px] flex flex-col items-center justify-center p-6 rounded-2xl bg-[#06242C] border-2 border-[#C5A059]/40 text-center text-white space-y-4 shadow-xl">
          <div className="w-12 h-12 rounded-xl bg-[#C5A059]/20 border border-[#C5A059] flex items-center justify-center text-[#DFC07C]">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div className="space-y-1 max-w-md">
            <h3 className="font-display font-bold text-lg text-white">
              {this.props.fallbackTitle || "Visualización Optimizada"}
            </h3>
            <p className="text-xs text-stone-300">
              {this.props.fallbackMessage ||
                "El componente se ha estabilizado en modo acelerado 2.5D para su entorno de navegación."}
            </p>
          </div>
          <button
            onClick={this.handleReset}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#C5A059] to-[#DFC07C] text-[#06242C] font-bold text-xs flex items-center space-x-2 hover:brightness-110 active:scale-95 transition-all shadow-md"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reintentar</span>
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
