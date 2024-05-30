import { useState } from "react";
import { Tooltip, Button, Textarea, Stack, Wrap } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import TextField from "../TextField";
import * as Yup from "yup";
import { IProduct } from "../../types/Product";

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
  rating: Yup.number().required("Please rate the product."),
});

const WriteReview = ({ product }: IProps) => {
  const [isReviewOpen, setReviewOpen] = useState(false);

  const handleSubmit = (values: IFormState) => {};

  return (
    <div>
      <Button
        my="20px"
        w="140px"
        colorScheme="cyan"
        onClick={() => setReviewOpen((open) => !open)}
      >
        Write a review
      </Button>
      {isReviewOpen && (
        <Formik
          initialValues={{
            rating: 0,
            title: "",
            comment: "",
          }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <Form>
            <Stack mb="20px">
              <Wrap></Wrap>
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
