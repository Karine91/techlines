import React from "react";
import {
  AlertTitle,
  AlertDescription,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";

const AlertError = ({ error }: { error: string }) => {
  return (
    <Alert status="error">
      <AlertIcon />
      <AlertTitle>We are sorry!</AlertTitle>
      <AlertDescription>{error}</AlertDescription>
    </Alert>
  );
};

export default AlertError;
