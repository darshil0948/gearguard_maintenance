import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, info: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    this.setState({ error, info });
    // also log to the console (useful for dev server)
    console.error("Captured error in ErrorBoundary:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 24 }}>
          <h2 style={{ color: "#b91c1c" }}>Something went wrong</h2>
          <div style={{ whiteSpace: "pre-wrap", background: "#fff6f6", padding: 12, borderRadius: 6, border: "1px solid #fca5a5" }}>
            <strong>Error:</strong>
            <div>{String(this.state.error)}</div>
            {this.state.info?.componentStack && (
              <>
                <hr />
                <strong>Stack:</strong>
                <div style={{ fontFamily: "monospace", fontSize: 13 }}>{this.state.info.componentStack}</div>
              </>
            )}
          </div>

          <div style={{ marginTop: 12 }}>
            <button onClick={() => window.location.reload()} style={{ padding: "8px 12px", borderRadius: 6 }}>Reload</button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
