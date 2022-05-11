import { useFormik } from "formik";
import * as yup from "yup";

const FILE_SIZE = 1024 * 1024 * 3; // ~ 3MB
const SUPPORTED_FORMATS = ["image/jpeg", "image/png"];

const validationSchema = yup.object({
  title: yup.string().required(),
  description: yup.string().required(),
  image: yup
    .mixed()
    .required("This field is required")
    .test(
      "fileSize",
      "File Size is too large",
      (value) => value && value.size <= FILE_SIZE
    )
    .test(
      "fileType",
      "Unsupported File Format",
      (value) => value && SUPPORTED_FORMATS.includes(value.type)
    ),
});

const initialValues = {
  title: "",
  description: "",
  image: undefined,
};

interface IPostFormProps {
  handleSubmit: ({ title, description, image }: typeof initialValues) => void;
}

const usePostForm = ({ handleSubmit }: IPostFormProps) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, actions) => {
      handleSubmit(values);
    },
  });

  return {
    formik,
  };
};

export default usePostForm;
