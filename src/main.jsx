import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import ErrorFallback from "./ui/ErrorFallback.jsx";

import { ErrorBoundary } from "react-error-boundary";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* react-error-boundary is used to handle the erros that may occurs in the app in the production.
    To use this we get <ErrorBoundary> component fro mthe react-error-boundary library. */}
    {/* Error boundaries only catch errors  while react is rendering. So bugs that occur in some event handlers, in an effect, asynchronous code will not be caught.*/}
    {/* Fallback -> A fallback is a code that gets executed when other code fails for some resaon. */}
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => window.location.replace("/")}
    >
      <App />
    </ErrorBoundary>
  </StrictMode>
);
