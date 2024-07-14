import { useState } from "react";
import {
  Tooltip,
  Button,
  Textarea,
  Stack,
  Wrap,
  FormErrorMessage,
  FormControl,
  Flex,
} from "@chakra-ui/react";
import { Formik, Form, Field, FieldProps } from "formik";
import TextField from "../TextField";
import * as Yup from "yup";
import { IProduct } from "../../types/Product";
import { createProductReview } from "../../redux/actions/productActions";
import { useAsync } from "../../hooks/useAsync";
import { useAppDispatch } from "../../redux/store";
import AlertError from "../AlertError";
import RatingStars from "./RatingStars";

interface IFormState {
  rating: number;
  title: string;
  comment: string;
}

interface IProps {
  product: IProduct;
}

const validationSchema = Yup.object().shape({
  comment: Yup.string()
    .max(200, "Too long")
    .required("Comment field is required."),
  rating: Yup.number().min(1, "Please rate the product."),
});

const initValues: IFormState = {
  rating: 0,
  title: "",
  comment: "",
};

const WriteReview = ({ product }: IProps) => {
  const [isReviewOpen, setReviewOpen] = useState(false);
  const { run, isLoading, error } = useAsync();
  const dispatch = useAppDispatch();

  const handleSubmit = (values: IFormState) => {
    // throwing error
    run(
      dispatch(
        createProductReview({ ...values, productId: product._id })
      ).unwrap()
    );
  };

  console.log(error);

  return (
    <div>
      {error && <AlertError error={error} />}
      {!isReviewOpen ? (
        <Button
          my="20px"
          w="140px"
          colorScheme="cyan"
          onClick={() => setReviewOpen((open) => !open)}
        >
          Write a review
        </Button>
      ) : (
        <Formik
          initialValues={initValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <Form>
            <Stack mb="20px">
              <Flex>
                <Field name="rating">
                  {({ field, form, meta }: FieldProps<number>) => (
                    <FormControl
                      as={Flex}
                      align={"center"}
                      isInvalid={!!meta.error}
                    >
                      <RatingStars
                        edit
                        rating={field.value}
                        onClick={(value: number) =>
                          form.setFieldValue("rating", value)
                        }
                        size={6}
                      />

                      {meta.error && (
                        <FormErrorMessage mt={0.5} ml={3}>
                          {meta.error}
                        </FormErrorMessage>
                      )}
                    </FormControl>
                  )}
                </Field>
              </Flex>
              <TextField name="title" placeholder="Review title (optional)" />
              <TextField
                component={Textarea}
                name="comment"
                placeholder={`The ${product.brand} ${product.name} is...`}
              />
              <Button
                loadingText="Saving"
                w="140px"
                colorScheme="cyan"
                type="submit"
                disabled={isLoading}
              >
                Publish review
              </Button>
            </Stack>
          </Form>
        </Formik>
      )}
    </div>
  );
};

export default WriteReview;
