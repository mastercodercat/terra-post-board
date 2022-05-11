import * as React from "react";
import { FormikValues } from "formik";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

const Input = styled("input")({
  display: "none",
});

interface IUploadButtons {
  name: string;
  formik: FormikValues;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function UploadButtons({
  name,
  formik,
  onChange,
}: IUploadButtons) {
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <label htmlFor="contained-button-file">
        <Input
          accept="image/*"
          id="contained-button-file"
          name={name}
          onChange={onChange}
          type="file"
        />
        <Button variant="contained" component="span">
          Upload
        </Button>
        {!!formik.touched[name] && formik.errors[name] && (
          <Typography variant="body1" sx={{ color: "red" }}>
            {formik.errors[name]}
          </Typography>
        )}
      </label>
    </Stack>
  );
}
