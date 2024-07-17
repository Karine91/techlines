import { ChakraProvider } from "@chakra-ui/react";

import { GoogleOAuthProvider } from "@react-oauth/google";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallbackScreen from "../layouts/ErrorFallbackScreen";

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID!}>
      <ChakraProvider>
        <ErrorBoundary
          fallback={<ErrorFallbackScreen />}
          onError={console.error}
        >
          {children}
        </ErrorBoundary>
      </ChakraProvider>
    </GoogleOAuthProvider>
  );
};

export default AppProvider;
