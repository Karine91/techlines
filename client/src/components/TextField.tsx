import React from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Field, useField } from "formik";
import { InputGroup, InputRightElement } from "@chakra-ui/react";

export interface ITextFieldProps {
  label?: string;
  type?: string;
  placeholder?: string;
  name: string;
  iconRight?: React.ReactNode;
  component?: React.ElementType;
}

const TextField = ({
  label,
  type = "text",
  name,
  placeholder,
  iconRight,
  component = Input,
}: ITextFieldProps) => {
  const [field, meta] = useField({ type, name, placeholder });
  return (
    <FormControl isInvalid={!!meta.error && meta.touched} mb="6">
      {label && <FormLabel noOfLines={1}>{label}</FormLabel>}
      <InputGroup>
        <Field
          as={component}
          {...field}
          type={type}
          name={name}
          placeholder={placeholder}
        />
        {iconRight && (
          <InputRightElement h="full">{iconRight}</InputRightElement>
        )}
      </InputGroup>

      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
};

export default TextField;
