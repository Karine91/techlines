import React, { useState } from "react";
import TextField, { ITextFieldProps } from "../TextField";
import { Button } from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

const PasswordField = ({
  name,
  placeholder,
  label,
}: Omit<ITextFieldProps, "iconRight">) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <TextField
      label={label}
      type={showPassword ? "text" : "password"}
      name={name}
      placeholder={placeholder}
      iconRight={
        <Button
          variant="ghost"
          onClick={() => setShowPassword((showPassword) => !showPassword)}
        >
          {showPassword ? <ViewIcon /> : <ViewOffIcon />}
        </Button>
      }
    />
  );
};

export default PasswordField;
