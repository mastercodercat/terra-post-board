import CircleLoader from "react-spinners/CircleLoader";
import Box from "@mui/material/Box";
import { useSpinner } from "../providers/SpinnerProvider";

const Spinner = () => {
  const { loading } = useSpinner();

  if (!loading) {
    return <></>;
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        width: "100%",
        height: "100%",
        backgroundColor: "#ffffffd6",
      }}
    >
      <CircleLoader color="#00ACB1" />
    </Box>
  );
};

export default Spinner;
