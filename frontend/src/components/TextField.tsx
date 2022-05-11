import React from "react";

import TextField from "@mui/material/TextField";
import { FormikValues } from "formik";

interface ITextFieldProps {
  formik: FormikValues;
  name: string;
  [key: string]: any;
}

const AppTextField: React.FC<ITextFieldProps> = ({
  formik,
  name,
  ...props
}) => {
  return (
    <TextField
      name={name}
      error={!!formik.touched[name] && !!formik.errors[name]}
      value={formik.values[name]}
      onChange={formik.handleChange}
      helperText={formik.touched[name] && formik.errors[name]}
      sx={{ ...props.sx, borderRadius: "5px" }}
      {...props}
    />
  );
};

export default React.memo(AppTextField);
