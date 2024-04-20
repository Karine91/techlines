import React from "react";
import {
  AlertTitle,
  AlertDescription,
  Alert,
  AlertIcon,
  AlertProps,
} from "@chakra-ui/react";

const AlertError = ({ error, ...props }: { error: string } & AlertProps) => {
  return (
    <Alert status="error" {...props}>
      <AlertIcon />
      <AlertTitle>We are sorry!</AlertTitle>
      <AlertDescription>{error}</AlertDescription>
    </Alert>
  );
};

export default AlertError;
