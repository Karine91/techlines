import {
  Box,
  Button,
  Flex,
  FormControl,
  Heading,
  Radio,
  RadioGroup,
  Spacer,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { setShipping } from "../../redux/actions/cartActions";
import { setAddress, setPayment } from "../../redux/actions/orderActions";
import TextField from "../../components/TextField";
import { Link as ReactLink } from "react-router-dom";
import { useAppSelector } from "../../redux/store";

const shippingValidationSchema = Yup.object({
  address: Yup.string()
    .required("We need an address.")
    .min(2, "This address is too short."),

  postalCode: Yup.string()
    .required("We need a postal code.")
    .min(2, "This postal code is too short."),
  city: Yup.string()
    .required("We need a city.")
    .min(2, "This city is too short."),
  country: Yup.string()
    .required("We need a country.")
    .min(2, "This country is too short."),
});

type TShippingFormData = Yup.InferType<typeof shippingValidationSchema>;

const ShippingInformation = () => {
  const shipping = useAppSelector((state) => state.cart.shipping);
  const shippingAddress = useAppSelector(
    (state) => state.order.shippingAddress
  );

  const initialValues: TShippingFormData = {
    address: shippingAddress?.address || "",
    postalCode: shippingAddress?.postalCode || "",
    city: shippingAddress?.city || "",
    country: shippingAddress?.country || "",
  };

  return <div></div>;
};

export default ShippingInformation;
