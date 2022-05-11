import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";

import TextField from "./TextField";
import UploadButton from "./UploadButton";
import usePostForm from "../hooks/useForm";
import { useIPFS } from "../hooks/useIPFS";
import { useSpinner } from "../providers/SpinnerProvider";

interface ICreatePostDialog {
  handleChange: (values: IPost) => void;
}

export default function CreatePostDialog({ handleChange }: ICreatePostDialog) {
  const { uploadFile } = useIPFS();
  const { setLoading } = useSpinner();

  const handleSubmit = async (values: any) => {
    setLoading(true);
    setOpen(false);
    const image = await uploadFile(values.image);
    handleChange({
      ...values,
      image,
      likes: [],
    });
  };

  const [open, setOpen] = React.useState(false);
  const { formik } = usePostForm({ handleSubmit });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;

    if (fileList?.length) {
      formik.setFieldValue("image", fileList[0]);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        Create a post
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={formik.handleSubmit}>
          <DialogTitle>Create a post</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To create a post, please input the title, description and upload
              image.
            </DialogContentText>
            <Grid container spacing={4} sx={{ my: 1 }}>
              <Grid xs={4} sm={4} md={4} lg={4} item>
                <img
                  src={
                    formik.values["image"]
                      ? URL.createObjectURL(formik.values["image"])
                      : ""
                  }
                  style={{ width: "100%" }}
                  alt="image"
                />
                <UploadButton
                  name="image"
                  formik={formik}
                  onChange={handleImageChange}
                />
              </Grid>
              <Grid xs={8} sm={8} md={8} lg={8} item>
                <TextField
                  formik={formik}
                  name="title"
                  autoFocus
                  label="Title"
                  fullWidth
                  variant="standard"
                />
                <TextField
                  formik={formik}
                  name="description"
                  label="Description"
                  fullWidth
                  multiline
                  variant="standard"
                  sx={{ mt: 3 }}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} variant="outlined">
              Cancel
            </Button>
            <Button type="submit" variant="contained">
              Create
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
